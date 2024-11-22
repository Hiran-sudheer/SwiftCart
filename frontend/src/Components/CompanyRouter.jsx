import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCompanyName } from "../features/companySlice";
import { Routes, Route } from "react-router-dom";
import Offers from "../Pages/Offers";
import Cart from "../Pages/Cart";
import Address from "../Pages/Address";
import Payment from "../Pages/Payment";
import Success from "../Pages/Success";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import User from "../Pages/User";
import Index from "../Pages";
import Product from "../Pages/Product";


const CompanyRouter = () => {
  const dispatch = useDispatch();
  const { companyName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCompanyName(companyName || "default-company"));
  }, [dispatch, companyName]);

  useEffect(() => {
    if (!companyName) {
      navigate("/default-page");
    }
  }, [companyName, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/address" element={<Address />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default CompanyRouter;
