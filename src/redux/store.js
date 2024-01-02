import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/product';
import userSlice from './slice/user';
import accountSlice from './slice/account';
import categorySlice from './slice/category';
import auditSlice from './slice/audit';


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
    category: categorySlice.reducer,
    audit: auditSlice.reducer,
  },
});

export default store;