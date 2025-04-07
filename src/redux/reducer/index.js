import { combineReducers } from "redux";
import handleCounter from "./CounterReducer";
import SubCatSlice from "../Slice/SubCatSlice";
import MyAutoSlice from "../Slice/MyAutoSlice";
import categorySlice from "../Slice/categorySlice";
import productSlice from "../Slice//ProductSlice";
import cartSlice from "../Slice/cartSlice";
import couponSlice from "../Slice/couponSlice";
import authSlice from "../Slice/authSlice";
import errorSlice from "../Slice/errorSlice";

export const rootReducer = combineReducers ({
    count : handleCounter,
    // MyAuto : MyAutoSlice,
    Category : categorySlice,
    subCat : SubCatSlice,
    carts: cartSlice,
    product : productSlice,
    Coupon : couponSlice,
    auth : authSlice,
    alert : errorSlice
    
})