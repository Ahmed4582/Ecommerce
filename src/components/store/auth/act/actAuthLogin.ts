import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@components/util/AxiosErrorHandler";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken:string;
  user:{
    id: number;
    firstName:string;
    lastName:string;
    email:string;
  }
}

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post<TResponse>("/login", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;