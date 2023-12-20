import { createAsyncThunk } from '@reduxjs/toolkit';
import user from '../api/user';
const {
    getUser
} = user

export const getUserThunk = createAsyncThunk(
    'user/getUser',
    async (data) => {
        const res = await getUser(data);
        return res;
    }
);

