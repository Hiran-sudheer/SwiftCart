import React, { useState } from "react";
import "./AddressDelivery.css";
import CartBill from "../CartBill/CartBill";
import DeliveryInfo from "../DeliveryInfo/DeliveryInfo";
import { Link } from "react-router-dom";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiSun } from "react-icons/fi";
import { IoCloudyNightOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const AddressDelivery = () => {
  const companyName = useSelector((state) => state.company.companyName);
  const selectedAddressId = useSelector((state) => state?.address?.selectedAddressId);

  const [showCartBill, setShowCartBill] = useState(false);
  const [pickupClicked, setPickupClicked] = useState(false);
  const [deliverClicked, setDeliverClicked] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeContainer, setShowTimeContainer] = useState(false);

  const handlePickupClick = () => {
    setShowCartBill(true);
    setPickupClicked(true);
    setDeliverClicked(false);
    setShowTimeContainer(true); 
  };

  const handleDeliveryClick = () => {
    setShowCartBill(false);
    setPickupClicked(false);
    setDeliverClicked(true);
    setShowTimeContainer(false); 
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  
  

  return (
    <div className="AddressDeliveryContainer">
      <h3>Choose the Type of delivery</h3>
      <div className="typeOfOrder">
        <button
          className={pickupClicked ? "pickupBtn active" : "pickupBtn"}
          onClick={handlePickupClick}
        >
          Pick Up
        </button>
        <button
          className={deliverClicked ? "deliverBtn active" : "deliverBtn"}
          onClick={handleDeliveryClick}
        >
          Deliver
        </button>
      </div>

      {showTimeContainer && pickupClicked && ( 
        <div className="timeContainer">
          <h5> PICKUP TIME </h5>
          <div>
            <div
              className={selectedTime === "morning" ? "timeSelector active" : "timeSelector"}
              onClick={() => handleTimeSelection("morning")}
            >
              <TiWeatherPartlySunny />
              Morning - 9:00am to 12:00pm
            </div>

            <div
              className={selectedTime === "afternoon" ? "timeSelector active" : "timeSelector"}
              onClick={() => handleTimeSelection("afternoon")}
            >
              <FiSun />
              Afternoon - 12:00pm to 2:00pm
            </div>

            <div
              className={selectedTime === "evening" ? "timeSelector active" : "timeSelector"}
              onClick={() => handleTimeSelection("evening")}
            >
              <IoCloudyNightOutline />
              Evening - 2:00pm to 8:00pm
            </div>
          </div>
        </div>
      )}

      <div>
        {showCartBill ? <CartBill /> : <DeliveryInfo />}
      </div>
      
      <Link to={`/${companyName}/payment/`}>
        <div className="continurToPayButton">
          <button disabled={!selectedAddressId}>Continue to Pay</button>
        </div>
      </Link>

      <div className="proceedToPayment"></div>
    </div>
  );
};

export default AddressDelivery;
