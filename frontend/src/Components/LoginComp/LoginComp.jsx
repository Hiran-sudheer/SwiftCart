import React, { useEffect, useState } from "react";
import "./LoginComp.css";
import loginImg from "../Assets/Images/loginImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import LoginOtpComp from "../LoginOtpComp/LoginOtpComp";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import StatusCode from "../../utils/StatusCode";
import { fetchShop } from "../../features/companySlice";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

const LoginComp = (props) => {
  const companyName = useSelector((state) => state.company.companyName);
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showOtpComponent, setShowOtpComponent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.company);
  const loginError = useSelector((state) => state.auth.error);
  const [errorr, setError] = useState(false);
  // console.log(loginError)
  useEffect(() => {
    if (companyName) {
      dispatch(fetchShop(companyName));
    }
  }, [companyName, dispatch])

  const closeSuccessMessage = () => {
    
    setError(false);
  };


  const handleValidation = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!username) {
      formIsValid = false;
      newErrors['username'] = 'Username is required';
    }

    if (!password) {
      formIsValid = false;
      newErrors['password'] = 'Password is required';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      
      const shopId = data && data.length > 0 ? data[0].id : null;
  // console.log(data)
      if (shopId !== null) {
        const jsonData = JSON.stringify({
          "shop_id": shopId,
          "username": username,
          "password": password,
        });
  
        await dispatch(login(JSON.parse(jsonData)))
          .then((user) => {
            // localStorage.setItem("user", JSON.stringify(user));
            const userExpirationDays = 30;
            const userExpiration = new Date(new Date().getTime() + userExpirationDays * 24 * 60 * 60 * 1000);
            Cookies.set("user", JSON.stringify(user), { expires: userExpiration });
          })
          .catch((error) => {
            console.log(error);
          });

        if (authStatus === StatusCode.ERROR) {
          setError(true);
        }
        if (authStatus === StatusCode.SUCCESS) {
          navigate(`/${companyName}/`);
        }
      } else {
        console.error("Shop ID is null");
      }
    } else {
      console.log("Form has errors");
    }
  };

  const handleOtpButtonClick = () => {
    setShowOtpComponent(true);
  };

  const handleEmailButtonClick = () => {
    setShowOtpComponent(false);
  };

  return (
    <div className="loginContainer">
      <div className="container">
        <div className="imageContainer">
          <img src={loginImg} alt="" />
        </div>
        <div className="inputsContianer">
          <div>
            <h2>Welcome Back User</h2>
          </div>
          {errorr && (
            <div className="successMessageContainer">
              <div className="successMessage">
                <p>{loginError && loginError.error}</p>
                <button
                  className="closeButton"
                  onClick={closeSuccessMessage}
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          )}
          <form className="inputsCredentaialsContainer" onSubmit={handleSubmit}>
            {showOtpComponent ? (
              <LoginOtpComp />
            ) : (
              <>
                <div className="usernameAndPasswordContaienr">
                  <label htmlFor="username">UserName or Email </label>
                  <input
                    type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <span style={{ color: "red", marginTop: " 4px", fontSize: "small" }} className="error">{errors.username}</span>
                  )}
                </div>
                <div className="passwordContainer">
                  <label htmlFor="password">Password </label>
                  <input
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <span style={{ color: "red", marginTop: " 4px", fontSize: "small" }} className="error">{errors.password}</span>
                  )}
                </div>
              </>
            )}
            <div className="buttonsContainer">
              <div className="credButtonsContainer">
                <button className="loginBtn" type="submit" onClick={handleEmailButtonClick}> Login with Email </button>
                <button style={{ backgroundColor: "orange", marginTop: "4px" }} className="loginBtn" onClick={handleOtpButtonClick}> Login with OTP</button>
                <button className="forgotBtn"> Forgot Password ? Click Here </button>
              </div>
              <h5>Dont have an Account ?</h5>
              <Link to={`/${companyName}/signup/`}>
                <button className="signup"> Sign Up Now </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
