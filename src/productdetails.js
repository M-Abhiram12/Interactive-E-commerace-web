import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginForm, loginname, jwtToken } from "./api/productslice";

export default function ProductsDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loginFormState } = useSelector((state) => state.product)
    const products = useSelector((state) => state.product.products);
    const product = products.find((p) => p.id === Number(id));


    const handleLogin = () => {
        const fakeTOken = "12wedrfvw4R93T7rxeu5cgfvy8oc7";
        localStorage.setItem("token", fakeTOken)
        dispatch(jwtToken(fakeTOken))
        dispatch(loginForm(false))
    }

    if (!product) return <p>Product not found!</p>;
    console.log(product)
    return (
        <div className="product_detail">

            {
                loginFormState &&
                <div className="form_main_div">
                    <span className="form_remove" onClick={() => dispatch(loginForm(false))}>x</span>
                    <h3 className="form_name">Log-in</h3>
                    <input placeholder="Email or phone num" className="form_input_btn"
                        onClick={(e) => dispatch(loginname(e.target.value))} ></input>
                    <input placeholder="password" className="form_input_btn"></input>
                    <button onClick={handleLogin} className="login-btn">log-in</button>
                </div>
            }

            <div className="productDetail_div">
                <h2>{product.title}</h2>
                <img className="productDetail_images" src={product.images[2]} alt={product.title} />
                <p>Price: ₹{product.price}</p>
                <p className="product-details-para">Description: {product.description}</p>
                <button onClick={() => dispatch(loginForm(true))} className="buynow-prodetail_btn" >Buy now</button>
            </div>

            <h1 className="similar_prodcuts"> More products</h1>


            <div className="similar_scroller">
                {products.map((item) => (
                    <div className="similar_card" key={item.id}>
                        <img src={item.images[1]} className="productDetalis_sim_img" alt={item.id} />
                        <img src={item.images[2]} className="productDetalis_sim_img" alt={item.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
