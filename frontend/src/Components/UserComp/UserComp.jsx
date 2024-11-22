import React, { useState } from "react";
import './UserComp.css';
import { MdOutlineLogout } from "react-icons/md";
// import { Tooltip } from 'react-tooltip'

import { MdKeyboardArrowRight } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";
import { LiaUser } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCashOutline } from "react-icons/io5";

import UserOrders from "../UserOrders/UserOrders";
import UserPayments from "../UserPayments/UserPayments";
import UserDetails from "../UserDetails/UserDetails";
import PurchaseHistory from "../PurchaseHistory/PurchaseHistory";

const UserComp = (props) => {
    const [activeTab, setActiveTab] = useState('details'); // State to manage active tab
  
    const handleTabChange = (tabName) => {
      setActiveTab(tabName);
    };
  
    return (
      <div className="userContainer">
        <div className="userTabButtons">
          <button className={`tabButton ${activeTab === 'details' ? 'selected' : ''}`} onClick={() => handleTabChange('details')}>
            <LiaUser className="userIcon" />
            <div className="detailsContainer">
              <p className="details"> Personal Details </p>
              <p className="description"> First Name, Last name, Mobile number,Addresses </p>
            </div>
            <MdKeyboardArrowRight className="arrowIcon" />
          </button>
  
          <button className={`tabButton ${activeTab === 'orders' ? 'selected' : ''}`} onClick={() => handleTabChange('orders')}>
            <TbTruckDelivery className="userIcon" />
            <div className="detailsContainer">
              <p className="details"> Orders</p>
              <p className="description"> Last n number of Orders </p>
            </div>
            <MdKeyboardArrowRight className="arrowIcon" />
          </button>
  
          <button className={`tabButton ${activeTab === 'payments' ? 'selected' : ''}`} onClick={() => handleTabChange('payments')}>
            <BsCreditCard className="userIcon" />
            <div className="detailsContainer">
              <p className="details">Saved Payment Methods</p>
              <p className="description"> Add, Edit and Delete Payment Details </p>
            </div>
            <MdKeyboardArrowRight className="arrowIcon" />
          </button>
          <button className={`tabButton ${activeTab === 'cashHistory' ? 'selected' : ''}`} onClick={() => handleTabChange('cashHistory')}>
            <IoCashOutline className="userIcon" />
            <div className="detailsContainer">
              <p className="details">Cash History</p>
              <p className="description"> Purchase, Refund , Return , Cash Balance </p>
            </div>
            <MdKeyboardArrowRight className="arrowIcon" />
          </button>
        </div>
  
        <div className="detailsContainerMain">
          {activeTab === 'details' && <UserDetails />}
          {activeTab === 'orders' && <UserOrders />}
          {activeTab === 'payments' && <UserPayments />}
          {activeTab === 'cashHistory' && <PurchaseHistory/>}
        </div>
      </div>
    )
  };
  
  export default UserComp;
