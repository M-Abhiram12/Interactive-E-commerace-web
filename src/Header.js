import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter, loginForm, headerInfoIcon } from "./api/productslice";



export default function Header() {
    const count = useSelector((state) => state.cart.count);
    const { headerInfo } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-light header">


                {headerInfo &&
                    <div>
                        <div className="header_info_div">
                            <span className="header_info_remove"
                                onClick={() => dispatch(headerInfoIcon(false))}>x
                            </span>
                            <ul>
                                <li>
                                    <Link to="/cart" className="nav-link shpping_icon_mobile"
                                        id="filename">Cart items <FaShoppingCart size={18} />
                                    </Link>
                                </li>
                                <li>
                                    <span className="login_icon_mobile" onClick={() => dispatch(loginForm(true))}> login <FaUser
                                        className="login_logo" size={20} /></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                }

                <div className="container-fluid">
                    <div className="header_mobile_div">
                        <img className="header_logo" src="../images/logo-dolfin.svg" alt="logo" />
                        <input className="search_input_formobile d-lg-none d-md-none" placeholder="search.." type="text"
                            onChange={(e) => dispatch(setSearchFilter(e.target.value))}>
                        </input>
                        <li className="nav-item me-4 d-lg-none d-md-none d-sm-show">
                            <Link to="/cart" className="nav-link d-flex"
                                id="filename"><FaShoppingCart size={28} className="text-light" /><span className="cart_notification">{count}</span>
                            </Link>
                        </li>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <FaBars onClick={() => dispatch(headerInfoIcon(true))} size={18} />
                        </button>
                    </div>

                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav w-100 text-dark">
                            <li className="nav-item">
                                <Link to="/product" className="nav-link anc_color " id="filename">Products</Link>
                            </li>
                            <div className="header_search">
                                <li className="me-3">
                                    <div>
                                        <input className="search_input" placeholder="search.." type="text"
                                            onChange={(e) => dispatch(setSearchFilter(e.target.value))}>
                                        </input>
                                        <FaSearch className="search_icon" size={24} />
                                    </div>
                                </li>
                                <li className="nav-item me-4">
                                    <Link to="/cart" className="nav-link d-flex"
                                        id="filename"><FaShoppingCart size={28} className="text-light" /><span className="cart_notification">{count}</span>
                                    </Link>
                                </li>
                                <div className="logo_login_div">
                                    <FaUser onClick={() => dispatch(loginForm(true))} className="login_logo" size={30} />
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>

            </nav>


            <Outlet />
        </>
    );
}