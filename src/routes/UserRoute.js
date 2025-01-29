import React from 'react'
import { Route, Routes } from "react-router-dom";
import Cart from "../container/Cart/Cart";
import Chackout from "../container/Chackout/Chackout";
import Contact from "../container/Contact/Contact";
import Error404 from "../container/Error404/Error404";
import Header from "../component/Header/Header";
import Shop from "../container/Shop/Shop";
import ShopDetail from "../container/ShopDetail/ShopDetail";
import Testimonial from "../container/Testimonial/Testimonial";
import Main from "../container/Main/Main";
import Footer from '../component/Footer/Footer';
import MyAuto from '../container/MyAuto/MyAuto';

export default function UserRoute() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Shop" element={<Shop/>} />
      <Route path="/Shop/:id" element={<ShopDetail/>} />
      <Route path="/ShopDetail" element={<ShopDetail/>} />
      <Route path="/Testimonial" element={<Testimonial/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Chackout" element={<Chackout/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Error404" element={<Error404/>} />
      <Route path="/MyAuto" element={<MyAuto/>} />
    </Routes>
   
    <Footer/>     
    </>
  )
}
