
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@components/store/index";
import axios from "axios";
import { TProduct } from "@components/types/product.types";
import { AxiosErrorHandler } from "@components/util";

type TResponse = TProduct[];

const  actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems" , 
async (_, thunkAPI) => {
    const {rejectWithValue, getState,fulfillWithValue, signal} = thunkAPI;
    const {cart} = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if(!itemsId.length){
        return fulfillWithValue([]);
    }
   

    try {
        const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&"); 
        const response = await axios.get<TResponse>(
            `/products?${concatenatedItemsId}`,{signal}
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
      }
}
);

export default actGetProductsByItems;