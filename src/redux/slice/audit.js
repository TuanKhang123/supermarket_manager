import { createSlice } from "@reduxjs/toolkit";
import { getAllAuditThunk, getAuditByIdThunk } from "../aciton/audit";

const auditSlice = createSlice({
    name: "auditSlice",
    initialState: {
        auditList: [],
        auditById: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllAuditThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        state.auditList = payload?.data
                    }
                }
            )
            .addCase(
                getAuditByIdThunk.fulfilled,
                (state, { payload }) => {
                    if (payload) {
                        state.auditById = payload?.data
                    }
                }
            )
    },
});

export default auditSlice;
