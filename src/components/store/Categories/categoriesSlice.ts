import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import {TCategory} from '@components/types/category.types';
import { TLoading } from "@components/types/shared.types";
import { isString } from "@components/types";


interface ICategoriesState {
    records:TCategory[];
    loading:TLoading;
    error: string | null;
}

const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null,
};

const categoriesSlice = createSlice({
    name:"categories",
    initialState,
    reducers: {
        categoriesRecordsCleanUp: (state) => {
            state.records
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetCategories.pending, (state) => {
                state.loading = "pending";
                state.error = null;
        });
        builder.addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload )) {
                state.error = action.payload;
            }
        });
    }
});

export default categoriesSlice.reducer;
export const {categoriesRecordsCleanUp} = categoriesSlice.actions;
export {actGetCategories};