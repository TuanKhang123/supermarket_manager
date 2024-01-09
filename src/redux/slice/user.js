import { createSlice } from "@reduxjs/toolkit";
import { getAllProductThunk } from "../aciton/product";
import { getUserThunk, loginThunk, } from "../aciton/user";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userCurrent: {},
        accessToken: '',
        isLoading: true,
    },
    reducers: {
        logout: (state) => {
            state.accessToken = "";
            localStorage.removeItem("accessToken");
            state.userCurrent = {};

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                loginThunk.fulfilled,
                (state, { payload }) => {
                    if (payload.data) {
                        state.userCurrent = payload?.data;
                        state.accessToken = payload?.accessToken;
                    }
                }
            ).addCase(
                getUserThunk.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;

                    if (payload) {
                        state.userCurrent = payload.data;
                        state.accessToken = payload.token;
                    }
                }
            )
    },
});

export default userSlice;
export const { logout } = userSlice.actions;
