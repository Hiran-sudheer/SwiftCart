import { configureStore } from "@reduxjs/toolkit";
import companySlice from "../features/companySlice";
import productSlice from "../features/productSlice";
import categorySlice from "../features/categorySlice";
import bannerSlice from "../features/bannerSlice";
import locationSlice from "../features/locationSlice";
import authSlice from "../features/authSlice";
import cartSlice from "../features/cartSlice";
import searchSlice from "../features/searchSlice";
import addressSlice from "../features/addressSlice";

export const store = configureStore({
    reducer : {
        company: companySlice,
        products: productSlice,
        categories: categorySlice,
        banners: bannerSlice,
        location: locationSlice,
        auth: authSlice,
        cart: cartSlice,
        search: searchSlice,
        address: addressSlice
    }
});