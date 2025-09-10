import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./slices/cartslice";
import { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts, loginForm, loginname,
  selectFilteredProducts, clickState, price100filter, price500filter, jwtToken, password
}
  from "./api/productslice";


export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, loginFormState, formNameEMail,
    setShow, formPass } = useSelector((state) => state.product);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(loginForm(false))
    if (formNameEMail === "abhiram" || formPass === "mani1234") {
      const fakeTOken = "12wedrfvw4R93T7rxeu5cgfvy8oc7";
      localStorage.setItem("token", fakeTOken)
      dispatch(jwtToken(fakeTOken))
      navigate('/order-confirmed')
    } else {
      toast.error("Invalid credentials")
    }
  }

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div>
      <div className="filter_class">
        <h2 className="px-4 py-3">Men's Store</h2>
        <button className="filter_btn" onClick={() => dispatch(clickState(true))}><FaFilter className="text-light" size={24} />
        </button>
      </div>

      {loading && <div className=".Loader-div" > <h2 className="CLiploader"> <ClipLoader /></h2></div>
      }

      {setShow &&
        <div className="filter_name">
          <button className="filter_remove_btn" onClick={(e) => dispatch(clickState(false))}>
            <h4 className="filter_remove">x</h4>
          </button>
          <p className="filter_price_ptag">Filter by price</p>
          <ul className="filter_ul">
            <button className="filter_btn_price" onClick={(e) => dispatch(price100filter(true))}><li >₹0-₹50</li></button>
            <button className="filter_btn_price" onClick={(e) => dispatch(price500filter(true))} ><li>₹0-₹100</li></button>
          </ul>
        </div>
      }

      {
        loginFormState &&
        <div className="form_main_div">
          <span className="form_remove" onClick={() => dispatch(loginForm(false))}>x</span>
          <h3 className="form_name">Log-in</h3>
          <input placeholder="username" className="form_input_btn"
            onChange={(e) => dispatch(loginname(e.target.value))} ></input>
          <p>username: <b>abhiram</b></p>
          <input placeholder="password" className="form_input_btn"
            onChange={(e) => dispatch(password(e.target.value))}></input>
          <p> password: <b>mani1234</b></p>
          <button onClick={handleLogin} className="login-btn">log-in</button>
          <mark className="mt-5 mx-3">please kindly enter username & password to LOGIN</mark>
        </div>
      }

      <div className="product_parent">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product_list">
            <Link to={`/product/${product.id}`}>
              <img
                className="product_images"
                src={product.images[2]}
                alt={product.name} />
            </Link>
            <p>{product.title} - ₹{product.price} </p>
            <div className="product_btn_div">
              <button
                className="add_cart_btn"
                onClick={() => {
                  dispatch(addToCart(product));
                  toast.success("item is successfully added to cart");
                }} >+ cart </button>
              <button
                className="buynow_btn"
                onClick={() => dispatch(loginForm(true)
                )}>Buy</button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
