import React, { useState, useEffect } from 'react';
import './HomeAddandSub.css';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../features/cartSlice';

const HomeAddandSub = ({  productId, onCountZero, onCountChange }) => {
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const username = user?.payload?.user.username || user?.user?.username;

  useEffect(() => {
    if (cartCount === 0) {
      onCountZero();
    } else {
      onCountChange(cartCount);
    }
  }, [cartCount, onCountChange, onCountZero]);

  const handleCartClickMinus = () => {
    setCartCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    // console.log(cartCount)
    if (cartCount >= 1) {
      const jsonData = JSON.stringify({
        "username": username,
        "product_id": productId,
        "quantity": 1,
      });
      dispatch(removeFromCart(JSON.parse(jsonData))); 
    }
  };


  const handleCartClickPlus = () => {
    setCartCount((prevCount) => prevCount + 1);
    const jsonData = JSON.stringify({
      "username": username,
      "product_id": productId,
      "quantity": 1,
    });
    dispatch(addToCart(JSON.parse(jsonData)));
  };

  return (
    <div className='homeAddandSubContainer'>
      <button onClick={handleCartClickMinus}>
        <AiOutlineMinus />
      </button>
      <button className='homeAddsubItems'>{cartCount}</button>
      <button onClick={handleCartClickPlus}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default HomeAddandSub;
