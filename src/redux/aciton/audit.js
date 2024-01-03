import { createAsyncThunk } from '@reduxjs/toolkit';
import audit from '../api/audit';
const {
    getAllAudit,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit
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
    async (data) => {
        const res = await getAuditById(data);
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

export const updateAuditThunk = createAsyncThunk(
    'audit/updateAudit',
    async (data) => {
        const res = await updateAudit(data);
        return res;
    }
);

export const deleteAuditThunk = createAsyncThunk(
    'audit/deleteAudit',
    async (data) => {
        const res = await deleteAudit(data);
        return res;
    }
);




