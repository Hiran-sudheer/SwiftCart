import React from "react"
import './LoggedIn.css'
import { PiUserThin } from "react-icons/pi";


const LoggedIn = (props) => {
  return (
    <div>
      <button>
      <PiUserThin />
        <p>Hi User</p>
      </button>
    </div>
  )
};

export default LoggedIn;
