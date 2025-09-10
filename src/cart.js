import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const confirmOrder = ()=> {
    navigate('/order-confirmed')
  }

  return (
    <div>

      {items.length === 0 &&
        <div className="mt_cart_head">
          <img className="mt_cart_image" src="../images/empty.png" alt="empty" />
          <p className="mt_cart_text">your cart is empty</p>
        </div>}
        <h2 className="cart_headline">Your cart Items </h2>

      <div className="cart">
        {items.map((item, index) => (
          <div key={index} className="cart_parent">
            <img className="cart_images" src={item.images[1]} alt="images" />
            <p className="p-4">
              {item.name} product cost- ₹{item.price}
            </p>

          </div>
        ))}
      </div>
      {items.length === 0 ? "" :
        <div className="d-flex">
          <h3 className="place_order_price">Total: ₹{totalPrice}</h3>
          <button className="place_ord_btn" onClick={confirmOrder}>Place Order</button>
        </div>
      }
    </div>
  );
}
