import { Link, Outlet } from "react-router-dom";
import App from "./App";
import { FaShoppingCart, FaSearch, FaFilter, FaRemoveFormat, FaBeer, FaUser, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearchFilter, setPriceFilter, clickState, loginForm, headerInfoIcon } from "./api/productslice";
import { useEffect, useState } from "react";
import { Search } from "./slices/cartslice";


export default function Header() {
    const count = useSelector((state) => state.cart.count);
    const { headerInfo } = useSelector((state) => state.product);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    return (
        <>


            <nav className="navbar navbar-expand-lg  bg-light header">

                {headerInfo &&
                    <div>

                        <div className="header_info_div">
                            <span className="header_info_remove"
                                onClick={() => dispatch(headerInfoIcon(false))}>x</span>
                            <h3 className="header_info_name">Contact us</h3>
                            <p className="header_info_para">Email: </p>
                        </div>
                    </div>
                }

                <div className="container-fluid">
                    <div className="header_mobile_div">
                        <a className="navbar-brand text-info" href="#">
                            <img className="header_logo" src="../images/logo-dolfin.svg" alt="logo" />
                        </a>
                        <input className="search_input_formobile d-lg-none d-md-none" placeholder="search.." type="text"
                            onChange={(e) => dispatch(setSearchFilter(e.target.value))}>
                        </input>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <FaBars onClick={() => dispatch(headerInfoIcon(true))} size={18} />
                        </button>
                    </div>



                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav w-100 text-dark">



                            <li className="nav-item">
                                <Link to="/product" className="nav-link anc_color" id="filename">Products</Link>
                            </li>

                            <div className="header_search">
                                <div className="logo_login_div">
                                    <p className="text-light me-2">login here</p>
                                    <FaUser onClick={() => dispatch(loginForm(true))} className="login_logo" size={30} />
                                </div>
                                <li className="me-3">
                                    <div>
                                        <input className="search_input" placeholder="search.." type="text"
                                            onChange={(e) => dispatch(setSearchFilter(e.target.value))}>
                                        </input>
                                        <FaSearch className="search_icon" size={24} />
                                    </div>
                                </li>
                                <li className="nav-item me-4">
                                    <Link to="/cart" className="nav-link d-flex" id="filename"><FaShoppingCart size={28} /><span className="cart_notification">{count}</span></Link>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>

            </nav>


            <Outlet />
        </>
    );
}