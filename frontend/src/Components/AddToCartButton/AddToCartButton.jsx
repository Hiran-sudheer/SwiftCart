import React from 'react';
// import { IoCartOutline } from 'react-icons/io5';
import { LuShoppingBag } from "react-icons/lu";


const AddToCartButton = ({ buttonText, cartIcon, onClick }) => {
  return (
    <button className='addToCartBtn' onClick={onClick}>
      {buttonText} {cartIcon && <LuShoppingBag className='cartIcon' />}
    </button>
  );
};

export default AddToCartButton;
