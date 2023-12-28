import { createAsyncThunk } from '@reduxjs/toolkit';
import user from '../api/user';
const {
    getUser,
    login,
} = user

const loginThunk = createAsyncThunk(
    'user/getUser',
    async (data) => {
        const res = await login(data);
        return res;
    }
);

const getUserThunk = createAsyncThunk(
    "user/getCurrent",
    async (data) => {
        const token = localStorage.getItem("accessToken");
        const res = await getUser();
        return {data: res.data, token};
    }
);

export { loginThunk, getUserThunk };
