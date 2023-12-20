import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/product';
import userSlice from './slice/user';


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
  },
});

export default store;