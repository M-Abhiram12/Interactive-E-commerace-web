import { createSlice } from "@reduxjs/toolkit";

const cartSLice = createSlice({
  name: "cart",
  initialState: {
    items: [], // cart items
    count:0,
    totalPrice:0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload); // add product to cart
      state.count += 1;
      state.totalPrice += action.payload.price;
    },
   
  },
});

export const { addToCart , cartIncre,Search} = cartSLice.actions;
export default cartSLice.reducer;
