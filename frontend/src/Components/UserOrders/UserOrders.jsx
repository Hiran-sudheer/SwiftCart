import React from "react"
import './UserOrders.css'
import laptopOne from '../Assets/Images/lenovo-legion-5-pro-012.webp'


const UserOrders = () => {
  return (
    <div>
      <div className="ordersContairsMain">
        <h3> Orders List </h3>

        <div className="productOrdersContainer">
            <div className="productOrderDetails">

                <div className="imageContainer">
                  <img src={laptopOne} alt="" />

                  
                </div>

                <div className="productDetails">
                    <p className="productName">Lenovo Legion 3000x</p>
                    {/* <p className="productDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias minus facilis id nesciunt, voluptatum laboriosam odio debitis sapiente voluptatem ipsum? Molestias, qui! Ullam error, doloremque nam molestias minus vero eaque.</p> */}
                    <p className="productPrice">Rs.32,000</p>
                    <p className="productUnit">2 Nos</p>
                </div>
                

                

            </div>
            
            <div className="statusContainer">
              <div style={{backgroundColor:"green"}} className="sphere"></div>
              <div className="dateAndStatus">
                <p> Delivered on 23/11/2023 </p>
            </div>
        </div>

        </div>

        <div className="productOrdersContainer">
            <div className="productOrderDetails">

                <div className="imageContainer">
                  <img src={laptopOne} alt="" />

                  
                </div>

                <div className="productDetails">
                    <p className="productName">Lenovo Legion 3000x</p>
                    {/* <p className="productDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias minus facilis id nesciunt, voluptatum laboriosam odio debitis sapiente voluptatem ipsum? Molestias, qui! Ullam error, doloremque nam molestias minus vero eaque.</p> */}
                    <p className="productPrice">Rs.32,000</p>
                    <p className="productUnit">2 Nos</p>
                </div>
                

                

            </div>
            
            <div className="statusContainer">
              <div style={{background:"orange"}} className="sphere"></div>
              <div style={{color:"orange"}} className="dateAndStatus">
                <p> Refunded on 23/11/2023 </p>
            </div>
        </div>

        </div>
        <div className="productOrdersContainer">
            <div className="productOrderDetails">

                <div className="imageContainer">
                  <img src={laptopOne} alt="" />

                  
                </div>

                <div className="productDetails">
                    <p className="productName">Lenovo Legion 3000x</p>
                    {/* <p className="productDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias minus facilis id nesciunt, voluptatum laboriosam odio debitis sapiente voluptatem ipsum? Molestias, qui! Ullam error, doloremque nam molestias minus vero eaque.</p> */}
                    <p className="productPrice">Rs.32,000</p>
                    <p className="productUnit">2 Nos</p>
                </div>
                

                

            </div>
            
            <div  className="statusContainer">
              <div style={{backgroundColor:"red"}} className="sphere"></div>
              <div style={{color:"red"}} className="dateAndStatus">
                <p> Cancelled on 23/11/2023 </p>
            </div>
        </div>

        </div>
      </div>
    </div>
  )
};

export default UserOrders;
