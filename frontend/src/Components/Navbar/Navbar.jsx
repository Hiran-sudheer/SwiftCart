import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MdOutlineMyLocation, MdSearch } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { IoCartOutline } from 'react-icons/io5';
// import LoggedIn from "../loggedInIcon/LoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../features/locationSlice";
import { CgProfile } from "react-icons/cg";
import { fetchShop } from "../../features/companySlice";
import StatusCode from "../../utils/StatusCode";
import { setSearchQuery } from "../../features/searchSlice";

let Navbar = () => {
  const companyName = useSelector((state) => state.company.companyName);
  // const { data, status } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);
  const shopId = useSelector((state) => state.company.data && state.company.data.length > 0 ? state.company.data[0].id : null);
  // console.log(user)
  const isLoggedInAndShopMatches = user !== null && (user?.payload?.user.shop || user?.user?.shop) === shopId;
// const isLoggedInAndShopMatches = false;
  // const shopId = data && data.length > 0 ? data[0].id : null;
  // const isLoggedIN = user?.payload?.user.shop === shopId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (companyName) {
          await dispatch(fetchShop(companyName));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { latitude, longitude };

        dispatch(setUserLocation(userLocation));

        localStorage.setItem("userLocation", JSON.stringify(userLocation));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, [companyName, dispatch]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    dispatch(setSearchQuery(searchQuery));
  };

  return (
    <section className="navBarSection">
      <nav className="navBarContainer">
        <div>
          <Link to={`/${companyName}/`}>
            <p> LOGO </p>
          </Link>
        </div>

        <div className="searchInput">
          <MdOutlineMyLocation className="locationIcon" />
          <input
          type="text"
          placeholder="Search Here"
          onChange={handleSearch}
        />
          <MdSearch className="searchIcon" />
        </div>

        <div className="loginAndSignup">
          <Link to={`/${companyName}/cart/`}>
            <button className="bagButton">
              <LuShoppingBag className="bagIcon" />
            </button>
          </Link>

          {isLoggedInAndShopMatches ? (
            <>
              <Link to={`/${companyName}/user/`}>
                {/* Display user profile icon */}
                <button className="profileButton">
                  {/* Add your profile icon here */}
                  <p>
                    <CgProfile className="profile" />
                  </p>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                style={{ textDecoration: "none" }}
                to={`/${companyName}/login/`}
              >
                {/* Display login button */}
                <button className="logButton">
                  <p>LOGIN</p>
                  <BiLogInCircle className="logIcon" />
                </button>
              </Link>
            </>
          )}

          {/* <LoggedIn/> */}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
