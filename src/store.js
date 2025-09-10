import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReducer from "./api/postslice";
import cartReducer from "./slices/cartslice";
import productsReducer from "./api/productslice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts : postsReducer,
    cart : cartReducer,
    product : productsReducer,
  }
});
