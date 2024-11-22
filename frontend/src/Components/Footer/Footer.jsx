import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Footer.css'
import data from '../Assets/data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../features/cartSlice';

let Footer =()=>{
    const dispatch = useDispatch();
    const companyName = useSelector((state) => state.company.companyName);
    const total_price = useSelector((state) => state.cart.total_price);
    const cartItems = useSelector((state) => state.cart.cartItems);
    if (total_price != 0) {
        dispatch(fetchCart());
    }
    // const [totalPrice, setTotalPrice] = useState(0);

    return(
        <footer className='footerMainContainer'>
            <div className="footerContainer">
                <div className='totalsContainer'>
                    <p>Your Total</p>
                    <h2>Rs. {total_price?total_price:cartItems.total_price}</h2>
                </div>

                <div>
                    <Link to={`${companyName}/cart/`}>
                        <button className='footerCheckoutBtn'> Checkout </button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer