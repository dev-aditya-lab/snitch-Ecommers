import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/state/auth.slice.js";
import productSlice from "../features/products/state/product.slice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
});