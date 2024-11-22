import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineIdcard } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { LuLandmark } from "react-icons/lu";
import { CiMapPin } from "react-icons/ci";
import {
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { TbTruckDelivery, TbRoad } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import StatusCode from "../../utils/StatusCode";
import Cookies from "js-cookie";
import DeliveryInfo from "../DeliveryInfo/DeliveryInfo";
import Modal from "../Modal/Modal";
import axiosInstance from "../../features/axios";
import { fetchAddresses } from "../../features/addressSlice";

const UserDetails = (props) => {
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  const handleAddAddressClick = () => {
    setShowDeliveryInfo(true);
  };

  const handleCloseDeliveryInfo = () => {
    setShowDeliveryInfo(false);
  };
  const companyName = useSelector((state) => state.company.companyName);
  const logoutStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const addresses = useSelector((state) => state?.address?.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const user = JSON.parse(Cookies.get("user"));
  const handleLogout = async () => {
    // console.log('logout')
    try {
      await dispatch(logout());
    //   if (logoutStatus === StatusCode.SUCCESS){
        navigate(`/${companyName}/`);
    //   }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      // Make a DELETE request to the API endpoint
      await axiosInstance.delete(`/Address/${id}/`);

      console.log("Address deleted successfully");
      dispatch(fetchAddresses());
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div>
      <div className="detailsContentContainer">
        <div className="detailsHeader">
          <h3>Personal Details</h3>
          
            <button className="logoutBtn" onClick={handleLogout}>
              {" "}
              <MdOutlineLogout /> Log Out{" "}
            </button>
          
        </div>

        <div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">Name</label>
              <p className="titleText">{user?.payload?.user?.username}</p>
              {/* <input style={{padding:"10px"}} type="text" name="" id="" />  */}
            </div>
            <div>
              <button className="editBtn">
                <LiaEditSolid />
              </button>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">Mobile Number</label>
              <p className="titleText">+91 {user?.payload?.user?.phone} </p>
              {/* <input style={{padding:"10px"}} type="text" name="" id="" />  */}
            </div>
            <div>
              <button className="editBtn">
                <LiaEditSolid />
              </button>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">Email</label>
              <p className="titleText">{user?.payload?.user?.email} </p>
              {/* <input style={{padding:"10px"}} type="text" name="" id="" />  */}
            </div>
            <div>
              <button className="editBtn">
                <LiaEditSolid />
              </button>
            </div>
          </div>
          <div>
            <button className="addAddressBtn" onClick={handleAddAddressClick}>
              <FiPlus />
              Add Another Address
            </button>
          </div>
        </div>
        {showDeliveryInfo && (
        <Modal onClose={handleCloseDeliveryInfo}>
          <DeliveryInfo flag={1}/>
        </Modal>
      )}
        <div className="">
          <label htmlFor=""> Manage Addresses </label>

          {addresses
            .map((item, index) => (
              <div className="userAddressContainer">
                <div className="userAddressMain" key={item.id}>
                  <p className="userName">
                    <AiOutlineIdcard />
                    <p>{item.name}</p>
                  </p>
                  <p className="userAddress">
                    <IoHomeOutline />
                    <p>
                      {item.street}
                    </p>
                  </p>
                  <p className="userPhone">
                    <MdOutlineLocalPhone />
                    <p>{item.phone}</p>
                  </p>
                  <p className="userLandmark">
                    <LuLandmark />
                    <p>{item.city}</p>
                  </p>
                  <p className="userStreet">
                    <TbRoad />
                    <p>{item.state}</p>
                  </p>

                  <p className="userStreet">
                    <CiMapPin />
                    <p>{item.zip_code}</p>
                  </p>
                </div>
                <div className="userInteractiveBtns">
                  <button className="editBtn">
                    <LiaEditSolid className="editLogo" /> Edit Address
                  </button>
                  <button className="deleteBtn" onClick={() => handleDeleteAddress(item.id)}>
                    <MdDeleteOutline className="deleteLogo" />
                    Delete Address
                  </button>
                </div>
              </div>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default UserDetails;
