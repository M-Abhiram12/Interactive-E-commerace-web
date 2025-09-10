import './App.css';
import Counter from './counter';
import PostsList from './posts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Cart from './cart';
import Products from './productlist';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ProductsDetails from './productdetails';
import ConfirmOrders from './confirmOrders';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>

            <Route index element={<Products />} />
            <Route path='product' element={<Products />} />
            <Route path='/product/:id' element={<ProductsDetails />} />
            <Route path='cart' element={<Cart />} />
            <Route path='/order-confirmed' element={<ConfirmOrders/>}/>

          </Route>
        </Routes>
      </BrowserRouter >

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
