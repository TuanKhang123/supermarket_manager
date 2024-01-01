import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoryThunk } from "../aciton/category";

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        categoryList: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllCategoryThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        state.categoryList = payload?.data;
                    }
                }
            )
    },
});

export default categorySlice;
