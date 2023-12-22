import { createSlice } from "@reduxjs/toolkit";
import { getAllProductThunk } from "../aciton/product";
import { getUserThunk } from "../aciton/user";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userCurrent: {},
        accessToken: ''
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getUserThunk.fulfilled,
                (state, { payload }) => {
                    if (payload.data) {
                        state.userCurrent = payload?.data;
                        state.accessToken = payload?.accessToken;
                    }
                }
            )
    },
});

export default userSlice;
