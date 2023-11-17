import { createAsyncThunk } from '@reduxjs/toolkit';
import product from '../api/product';
const {
    getAllProduct,
} = product;

export const getAllProductThunk = createAsyncThunk(
    'product/getAllProduct',
    async () => {
        const res = await getAllProduct();
        return res;
    }
);

