import { createAsyncThunk } from '@reduxjs/toolkit';
import account from '../api/account';
const {
    getAllAccount,
    createAccount,
    getAccountById,
    updateAccount
} = account;



export const getAllAccountThunk = createAsyncThunk(
    'account/getAllAccount',
    async (data) => {
        const res = await getAllAccount(data);
        return res;
    }
);

export const createAccountThunk = createAsyncThunk(
    'account/createAccount',
    async (data) => {
        const res = await createAccount(data);
        return res;
    }
);

export const getAccountByIdThunk = createAsyncThunk(
    'account/getAccountById',
    async (data) => {
        const res = await getAccountById(data);
        return res;
    }
);

export const updateAccountThunk = createAsyncThunk(
    'account/updateAccount',
    async (data) => {
        const res = await updateAccount(data);
        return res;
    }
);


