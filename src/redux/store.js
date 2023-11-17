import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/product';


const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

export default store;