import React from "react";
import { Route, Routes } from "react-router-dom";
import Category from "../Admin/container/Category/Category";
import SubCategory from "../Admin/container/SubCategory/SubCategory";
import Counter from "../Admin/container/Counter/Counter";
import Layout from "../Admin/component/Layout/Layout";
import Product from "../Admin/container/Product/Product";
import Coupon from "../Admin/container/Coupon/Coupon";

export default function AdminRoute(props) {
  return (
    <Layout>
      <Routes>
        <Route path="/Category" element={<Category />} />
        <Route path="/SubCategory" element={<SubCategory />} />
        <Route path="/Product" element={<Product/>} />
        <Route path="/Coupon" element={<Coupon/>} />
        <Route path="/Counter" element={<Counter/>} />
      </Routes>
    </Layout>
  );
}
