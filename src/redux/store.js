import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/product';
import userSlice from './slice/user';
import accountSlice from './slice/account';


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
  },
});

export default store;