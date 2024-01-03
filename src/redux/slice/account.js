import { createSlice } from "@reduxjs/toolkit";
import { getAccountByIdThunk, getAllAccountThunk } from "../aciton/account";

const accountSlice = createSlice({
    name: "accountSlice",
    initialState: {
        accountList: [],
        accountById: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllAccountThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        state.accountList = payload?.data
                    }
                }
            )
            .addCase(
                getAccountByIdThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        state.accountById = payload?.data
                    }
                }
            )
    },
});

export default accountSlice;
