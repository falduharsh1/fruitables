import { combineReducers } from "redux";
import handleCounter from "./CounterReducer";
import SubCatSlice from "../Slice/SubCatSlice";
import MyAutoSlice from "../Slice/MyAutoSlice";
import categorySlice from "../Slice/categorySlice";
import ProductSlice from "../Slice/ProductSlice";


export const rootReducer = combineReducers ({
    count : handleCounter,
    MyAuto : MyAutoSlice,
    Category : categorySlice,
    subCat : SubCatSlice,
    product : ProductSlice
    // subcategory : ProductSlice
})