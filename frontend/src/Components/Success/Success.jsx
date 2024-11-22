import React from "react"
import './Success.css'
import SuccessImg from '../Assets/Images/payment-done.png'
import { Link } from "react-router-dom";


const SuccessComp = (props) => {
  return (
    <div className="successContainer">
      <div>
        <img src={SuccessImg} alt="" />
      </div>
      <Link to={`/`}>
        <div>
                <button> Go to Shop </button>
        </div>
      </Link>
     
    </div>
  )
};

export default SuccessComp;
