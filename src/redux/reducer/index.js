import { combineReducers } from "redux";
import handleCounter from "./CounterReducer";
import SubCatSlice from "../Slice/SubCatSlice";
import MyAutoSlice from "../Slice/MyAutoSlice";
import categorySlice from "../Slice/categorySlice";
import productSlice from "../Slice/productSlice";
import cartSlice from "../Slice/cartSlice";
import couponSlice from "../Slice/couponSlice";

export const rootReducer = combineReducers ({
    count : handleCounter,
    // MyAuto : MyAutoSlice,
    Category : categorySlice,
    subCat : SubCatSlice,
    carts: cartSlice,
    product : productSlice,
    Coupon : couponSlice
    
})