import React, { useEffect, useState } from "react";
import "./SignUpComp.css";
import signUpImg from "../Assets/Images/signUp.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/authSlice";
import { IoMdClose } from "react-icons/io";
// import StatusCode from "../../utils/StatusCode";
import { fetchShop } from "../../features/companySlice";

const SignUpComp = (props) => {
  const companyName = useSelector((state) => state.company.companyName);
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorr, setError] = useState(false);

  const dispatch = useDispatch();

  // const signupStatus = useSelector((state) => state.auth.status);
  const signupError = useSelector((state) => state.auth.error);

  const { data } = useSelector((state) => state.company);
console.log(data)
  useEffect(() => {
    if (companyName) {
      dispatch(fetchShop(companyName));
    }
  }, [companyName, dispatch])

  const handleValidation = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!firstName) {
      formIsValid = false;
      newErrors["firstName"] = "First Name is required";
    } else if (/\s/.test(firstName)) {
      // Check if the first name contains spaces
      formIsValid = false;
      newErrors["firstName"] = "First Name cannot contain spaces";
    }

    if (!phoneNumber) {
      formIsValid = false;
      newErrors["lastName"] = "Phone Number is required";
    }

    if (!email) {
      formIsValid = false;
      newErrors["email"] = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formIsValid = false;
        newErrors["email"] = "Invalid email address";
      }
    }

    if (!password) {
      formIsValid = false;
      newErrors["password"] = "Password is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const jsonData = JSON.stringify({
          "shop": data[0].id,
          "username": firstName,
          "email": email,
          "phone_number": phoneNumber,
          "password": password,
        });
        // console.log(jsonData);
        await dispatch(
          signUp(JSON.parse(jsonData))
        ).then((response) => {
          // console.log(response)
          if ('error' in response) {
            setError(true);
            console.log("Sign-up was not successful. Error:", response.error);
          } else {
            // Handle other conditions as needed based on the actual response structure
            setSignupSuccess(true);
            console.log("Sign-up was successful");
          }

        });
        // console.log("User signed up successfully!");
        
      } catch (error) {
        console.error("Sign-up failed:", error);
      }
    } else {
      console.log("Form has errors");
    }
  };
  const closeSuccessMessage = () => {
    setSignupSuccess(false);
    setError(false);
  };

  return (
    <div className="signpContainer">
      <div className="container">
        <div>
          <div className="imageContainer">
            <img src={signUpImg} alt="" />
          </div>
        </div>
        <div className="inputsContainer">
          <h3>Hi There User, Nice to Meet You</h3>
          {signupSuccess && (
            <div className="successMessageContainer">
              <div className="successMessage">
                <p>Sign up successful! You can now login.</p>
                <button
                  className="closeButton"
                  onClick={closeSuccessMessage}
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          )}
          {errorr && (
            <div className="successMessageContainer">
              <div className="successMessage">
                <p>{signupError.username && signupError?.username[0].length > 0 ?signupError?.username[0]:signupError?.email[0]}</p>
                <button
                  className="closeButton"
                  onClick={closeSuccessMessage}
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="inputsContainer">
              <div className="usernameAndEmailContainer">
                <label htmlFor="firstName"> User Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <span
                    style={{
                      color: "red",
                      marginTop: " 4px",
                      fontSize: "small",
                    }}
                    className="error"
                  >
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="usernameAndEmailContainer">
                <label htmlFor="phoneNumber"> Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <span
                    style={{
                      color: "red",
                      marginTop: " 4px",
                      fontSize: "small",
                    }}
                    className="error"
                  >
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="usernameAndEmailContainer">
                <label htmlFor="email"> Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span
                    style={{
                      color: "red",
                      marginTop: " 4px",
                      fontSize: "small",
                    }}
                    className="error"
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="usernameAndEmailContainer">
                <label htmlFor="password"> Password </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span
                    style={{
                      color: "red",
                      marginTop: " 4px",
                      fontSize: "small",
                    }}
                    className="error"
                  >
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <div>
              <button className="signUpBtn" type="submit">
                Sign Up
              </button>

              <h5>Already have an Account ?</h5>
              <Link to={`/${companyName}/login/`}>
                <button className="loginBtn"> Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;
