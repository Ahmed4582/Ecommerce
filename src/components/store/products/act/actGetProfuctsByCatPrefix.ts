import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@components/types/product.types";
import { AxiosErrorHandler } from "@components/util";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error))
    }
  }
);

export default actGetProductsByCatPrefix;