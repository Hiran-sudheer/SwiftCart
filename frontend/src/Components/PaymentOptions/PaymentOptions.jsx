import React, { useState } from "react";
import './PaymentOptions.css';
import CartBill from "../CartBill/CartBill";
import { Link } from "react-router-dom";
import { MdQrCodeScanner } from "react-icons/md";
import { IoMdCard } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";

const PaymentOptions = () => {
  const companyName = useSelector((state) => state.company.companyName);
  const [activeTab, setActiveTab] = useState("upi");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="paymentOtionsContainer">
      <h2>PAYMENT OPTIONS</h2>
      <div className="paymentOptionsContainerTabMain">
        <div className="cartPaymentTabButtons">
          <button
            style={{ cursor: "pointer", backgroundColor: activeTab === "upi" ? "lightgreen" : "" }}
            className={activeTab === "upi" ? "paymentOptionsButtons active" : "paymentOptionsButtons"}
            onClick={() => handleTabClick("upi")}
          >
            <MdQrCodeScanner style={{ marginRight: "12px" }} />
            UPI Payments
          </button>

          <button
            style={{ cursor: "pointer", marginTop: "10px", backgroundColor: activeTab === "card" ? "lightgreen" : "" }}
            className={activeTab === "card" ? "paymentOptionsButtons active" : "paymentOptionsButtons"}
            onClick={() => handleTabClick("card")}
          >
            <IoMdCard style={{ marginRight: "12px" }} />
            Debit or Credit
          </button>

          <button
            style={{ cursor: "pointer", marginTop: "10px", backgroundColor: activeTab === "cod" ? "lightgreen" : "" }}
            className={activeTab === "cod" ? "paymentOptionsButtons active" : "paymentOptionsButtons"}
            onClick={() => handleTabClick("cod")}
          >
            <TbTruckDelivery style={{ marginRight: "12px" }} />
            Cash on Delivery
          </button>
        </div>
        <div className="paymentMethodContainerMain">
          <div className={activeTab === "upi" ? "tabContent active" : "tabContent"}>
            Upi Payment
          </div>
          <div className={activeTab === "card" ? "tabContent active" : "tabContent"}>
            Debit or Credit
          </div>
          <div className={activeTab === "cod" ? "tabContent active" : "tabContent"}>
            Cash on Delivery
          </div>
        </div>
      </div>

      <CartBill />

      <Link to={`/${companyName}/success/`}>
        <button className="payNowBtn"> Pay Now </button>
      </Link>
    </div>
  );
};

export default PaymentOptions;
