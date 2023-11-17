import { createSlice } from "@reduxjs/toolkit";
import { getAllProductThunk } from "../aciton/product";

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        productList: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllProductThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        state.productList = payload;
                    }
                }
            )
    },
});

export default productSlice;
