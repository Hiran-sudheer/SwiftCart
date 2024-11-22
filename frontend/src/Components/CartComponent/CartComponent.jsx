import "./CartComponent.css";
import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import CartBill from "../CartBill/CartBill";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart, fetchCart, removeFromCart } from "../../features/cartSlice";
import { useEffect, useState } from "react";



let CartComponent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart.cartProducts);
  const companyName = useSelector((state) => state.company.companyName);
  const user = useSelector((state) => state.auth.user);
  const username = user?.payload?.user.username || user?.user?.username;

  const [itemQuantities, setItemQuantities] = useState({});


  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartItems && cartItems.cart_items) {
      const initialQuantities = cartItems.cart_items.reduce((quantities, item) => {
        quantities[item.product.id] = item.quantity;
        return quantities;
      }, {});
      setItemQuantities(initialQuantities);
    }
  }, [cartItems]);

  const handleCartClickMinus = ( username, quantity, productId) => {
    const currentQuantity = itemQuantities[productId] || 0;
    if (currentQuantity > 0) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: currentQuantity - 1,
      }));
      const jsonData = JSON.stringify({
        
        product_id: productId,
        quantity: 1,
      });
      dispatch(removeFromCart(JSON.parse(jsonData)));
    }
  };

  const handleCartClickPlus = ( username, productId) => {
    setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + 1,
      }));
      const jsonData = JSON.stringify({
        
        product_id: productId,
        quantity: 1,
      });
      dispatch(addToCart(JSON.parse(jsonData)));
  };

  const handleDelete = async (cartId) => {
    await dispatch(deleteCart(cartId));

    dispatch(fetchCart());
  }

  return (
    <div className="cartComponentContainer">
      <div className="cartContainer">
        <h2> YOUR CART </h2>
        {cartItems && cartItems.cart_items ? (
          cartItems.cart_items.map((item, index) => (
            <div className="cartProduct" key={index}>
              
              <div>
                <img src={item.product.Image} alt="" />
              </div>
              <div className="cartInternalProductDetails">
                <div>
                  <b>
                    <p className="productName">{item.product.Productname}</p>
                  </b>
                  <p className="productDesc">{item.product.Description}</p>
                  <p className="productPrice">
                    <b>{item.product.OfferPrice}</b>
                  </p>
                  <div className="cartIncAndDecContainer">
                    <button
                      className="cartDecrementBtn"
                      onClick={() =>
                        handleCartClickMinus( username, item.quantity, item.product.id)
                      }
                    >
                      <FiMinus className="cartDecrementIcon" />
                    </button>
                    <button> {itemQuantities[item.product.id] || 0} </button>
                    <button
                      className="cartIncrementBtn"
                      onClick={() => handleCartClickPlus( username,  item.product.id)}
                    >
                      <FiPlus className="cartIncrementIcon" />
                    </button>
                  </div>
                </div>
                <button className="delBtn" onClick={()=>handleDelete(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <CartBill />

      <div className="paymentContainer">
        <Link to={`/${companyName}/address/`}>
          <button>Proceed to Confirm</button>
        </Link>
      </div>
    </div>
  );
};

export default CartComponent;
