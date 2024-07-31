import actLikeToggle from "./act/actLikeToggle";
import { createSlice } from "@reduxjs/toolkit";
import  actGetWishlist from "./act/actGetWishlist"
import { TLoading } from "@components/types/shared.types";
import { TProduct } from "@components/types/product.types";
import { isString } from "@components/types";
import { authLogout } from "../auth/authSlice";



interface IWishlistState {
    itemsId: number[];
    productsFullInfo: TProduct[];
    error: null | string;
    loading: TLoading;
  
}


const initialState: IWishlistState = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};

const wishlistSlice = createSlice ({
    name:"wishlist",
    initialState,
    reducers:{
      cleanWishlistProductsCleanUp: (state) => {
        state.productsFullInfo = [];
      },
    },

    extraReducers: (builder) => {
        builder.addCase(actLikeToggle.pending, (state) => {
          state.error = null;
        });
        builder.addCase(actLikeToggle.fulfilled, (state, action) => {
          if (action.payload.type === "add") {
            state.itemsId.push(action.payload.id);
          } else {
            state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
            state.productsFullInfo = state.productsFullInfo.filter(
              (el) => el.id !== action.payload.id
            );
          }
        });
        builder.addCase(actLikeToggle.rejected, (state, action) => {
          if (isString(action.payload )) {
            state.error = action.payload;
          }
        });
            // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "ProductsFullInfo"){
        state.productsFullInfo = action.payload.data as TProduct[];
      } else if (action.payload.dataType === "ProductIds"){
        state.itemsId = action.payload.data as number[]
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload )) {
        state.error = action.payload;
      }
    });

    // when logout rest
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
    })
    }

});


export {actLikeToggle, actGetWishlist};
export const { cleanWishlistProductsCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;