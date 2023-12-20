import { createSlice } from "@reduxjs/toolkit";
import { getAllProductThunk } from "../aciton/product";
import { getUserThunk } from "../aciton/user";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getUserThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        // console.log(payload);
                        // state.productList = payload;
                    }
                }
            )
    },
});

export default userSlice;
