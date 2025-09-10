import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(" https://api.escuelajs.co/api/v1/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    searchText: "",
    price: null,
    setShow: false,
    priceHundFilter:false,
    priceFiveFilter :false,
    loginFormState : false,
    formNameEMail : "",
    formPass : 0,
    token:"",
    headerInfo : false,
  },
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchText = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    clearFilters: (state) => {
      state.searchText = "";
      state.price = null;
    },
    clickState: (state, action) => {
      state.setShow = action.payload
    },
    price100filter:(state,action)=>{
      state.priceHundFilter = action.payload;
    },
     price500filter:(state,action)=>{
      state.priceFiveFilter = action.payload;
    },
    loginForm :(state,action)=>{
      state.loginFormState = action.payload
    },
    loginname : (state,action)=> {
      state.formNameEMail = action.payload
    },
    jwtToken : (state,action) => {
      state.token = action.payload   
     },
     password : (state,action) => {
      state.formPass = action.payload
     },
     headerInfoIcon: (state,action) => {
      state.headerInfo = action.payload
     }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectFilteredProducts = (state) => {
  const { products, searchText,priceHundFilter,priceFiveFilter } = state.product;

  return products.filter((item) => {
    const matchesSearch = searchText
      ? item.title.toLowerCase().includes(searchText.toLowerCase())
      : true;

      const matchessearchFilter  = priceHundFilter ? item.price < 50 : true; 
      const match500filter = priceFiveFilter ? item.price < 100: true;

     return matchesSearch &&  matchessearchFilter && match500filter;
    
  });
};


export const { setSearchFilter, setPriceFilter, clearFilters,loginForm,loginname,
   clickState,price100filter,price500filter,jwtToken,password,headerInfoIcon} =
  productsSlice.actions;

export default productsSlice.reducer;
