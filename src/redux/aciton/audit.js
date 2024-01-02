import { createAsyncThunk } from '@reduxjs/toolkit';
import audit from '../api/audit';
const {
    getAllAudit,
    getAuditById,
    createAudit
} = audit;

export const getAllAuditThunk = createAsyncThunk(
    'audit/getAllAudit',
    async (data) => {
        const res = await getAllAudit(data);
        return res;
    }
);

export const getAuditByIdThunk = createAsyncThunk(
    'audit/getAuditById',
    async () => {
        const res = await getAuditById();
        return res;
    }
);

export const createAuditThunk = createAsyncThunk(
    'audit/createAudit',
    async (data) => {
        const res = await createAudit(data);
        return res;
    }
);




