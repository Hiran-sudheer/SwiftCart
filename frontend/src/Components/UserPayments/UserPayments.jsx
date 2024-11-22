import React from "react"
import './UserPayments.css'
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaGooglePay } from "react-icons/fa6";
import { AiOutlineBank } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";



const UserPayments = () => {
  return (
    <div>
      <div>
      <form className="paymentMethod">
        <h3>Saved Payment Method</h3>
        <p> in this section you are choosing the Saved payment Method</p>
        <div className="radio">
        <span> <BiSolidEdit/> Edit</span>
          <label>
            
           
            <div className="heading">
            UPI - Saved
              <div>
                <h3>6541201545@upi</h3>
              </div>
            </div>
             

          </label>
          <MdOutlineQrCodeScanner />
        </div>
        <div className="radio">
        <span> <BiSolidEdit/> Edit</span>
        <label>
            <div className="heading">
            Gpay - Saved
              <div>
                <h3>+91 6541201545</h3>
              </div>
            </div>
             

          </label>
          <FaGooglePay />

        </div>
        <div className="radio">
        <span> <BiSolidEdit/> Edit</span>
        <label>
            <div className="heading">
            Net Bank - Saved
              <div>
                <h3>Axis Platinum xx0599</h3>
              </div>
            </div>
             

          </label>
          <AiOutlineBank />

        </div>


      </form>
      </div>
    </div>
  )
};

export default UserPayments;
