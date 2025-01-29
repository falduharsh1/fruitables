import { combineReducers } from "redux";
import handleCounter from "./CounterReducer";
import SubCategorySlice from "../Slice/SubCatSlice";
import MyAutoSlice from "../Slice/MyAutoSlice";

export const rootReducer = combineReducers ({
    count : handleCounter,
    subCat : SubCategorySlice,
    MyAuto : MyAutoSlice
})