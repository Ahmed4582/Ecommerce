import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@components/store";
import axios from "axios";
import { TProduct } from "@components/types/product.types";
import { AxiosErrorHandler } from "@components/util";


type TDataType = "ProductsFullInfo" | "ProductIds"
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue,  signal, getState } = thunkAPI;
    const {auth} = getState() as RootState

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}` ,
        {signal}
      );

        console.log(userWishlist.data);
        
      if (!userWishlist.data.length) {
        console.log({data: [], dataType: "empty"});
        
         return {data: [], dataType: "empty"};
      }

      if(dataType === "ProductIds"){
          const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
          console.log({data: concatenatedItemsId, dataType: "ProductIds"});
          
          return {data: concatenatedItemsId, dataType: "ProductIds"};
      } else {
        const concatenatedItemsId = userWishlist.data
        .map((el) => `id=${el.productId}`)
        .join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      
      console.log({data: response.data, dataType: "ProductsFullInfo"});
      
       return {data: response.data, dataType: "ProductsFullInfo"};
      }


    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error))
    }
  }
);

export default actGetWishlist;