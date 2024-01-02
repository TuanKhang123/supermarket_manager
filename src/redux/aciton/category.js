import { createAsyncThunk } from '@reduxjs/toolkit';
import Category from '../api/category';
const {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = Category;

export const getAllCategoryThunk = createAsyncThunk(
    'category/getAllCategory',
    async (data) => {
        const res = await getAllCategory(data);
        return res;
    }
);

export const createCategoryThunk = createAsyncThunk(
    'category/createCategory',
    async (data) => {
        const res = await createCategory(data);
        return res;
    }
);

export const updateCategoryThunk = createAsyncThunk(
    'category/updateCategory',
    async (data) => {
        const res = await updateCategory(data);
        return res;
    }
);

export const deleteCategoryThunk = createAsyncThunk(
    'category/deleteCategory',
    async (data) => {
        const res = await deleteCategory(data);
        return res;
    }
);

