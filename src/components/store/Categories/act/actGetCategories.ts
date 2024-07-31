import { createAsyncThunk } from "@reduxjs/toolkit";
import {TCategory} from '@components/types/category.types';
import axios from "axios";
import { AxiosErrorHandler } from "@components/util";


type TResponse = TCategory[];

const actGetCategories = createAsyncThunk (
    "categories/actGetCategories",
    async(_, thunkAPI) => {
        const {rejectWithValue, signal} = thunkAPI;
        try{
            const response = await axios.get<TResponse>("/categories", {signal})

            return response.data;
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))
          }
    }
);
export default actGetCategories;