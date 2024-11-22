import { useSelector } from 'react-redux';
import './CartBill.css'

let CartBill=()=>{
    
    const cart = useSelector((state) => state.cart.cartItems);
    
    return(
        <div className='billingContainerMain'>
                <h4>Your Total</h4>

                <div className='billingContainerPrice'>
                    <p>{cart.total}x Products</p>
                    <p>Rs. {cart.total_price}</p>
                </div>
                <div className='billingContainerTax'>
                    <p>TAX</p>
                    <p>Rs. 0</p>
                </div>
                <div className='billingContainerDelivery'>
                    <p>Delivery Charge</p>
                    <p>Rs. 0</p>
                </div>
                <hr/>
                <div className='billingContainerDelivery'>
                    <h3>NET TOTAL</h3>
                    <h3>Rs. {cart.total_price}</h3>
                  
                </div>

            </div>
    )
}

export default CartBill