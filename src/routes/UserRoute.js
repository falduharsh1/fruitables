import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
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
// import MyAuto from '../container/MyAuto/MyAuto';
import Auth from '../container/Auth/Auth';
import SubCategory from '../container/SubCategory/SubCategory';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/Slice/authSlice';


export default function UserRoute() {

  
    const [loading,setLoading] = useState(true)
  
    const auth = useSelector(state => state.auth)
  
    const dispatch = useDispatch()
  
    const navigate = useNavigate()
  
    useEffect(() => {
      const check_auth = async () => {
        try {
          await dispatch(checkAuth())
        } catch (error) {
          navigate("/")
        }finally{
          setLoading(false)
        }
      }
      check_auth()
    },[dispatch,navigate])
    
    if(loading){
      return(
        <p>Loading...</p> 
      )
    }

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Shop" element={<Shop/>} />
      <Route path="/Shop/:id" element={<Shop/>} />
      {/* <Route path="/Shop/:id" element={<ShopDetail/>} /> */}
      <Route path="/ShopDetail" element={<ShopDetail/>} />
      <Route path="/ShopDetail/:id" element={<ShopDetail/>} />
      <Route path="/Testimonial" element={<Testimonial/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Chackout" element={<Chackout/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Error404" element={<Error404/>} />
      <Route path="/SubCategory/:id" element={<SubCategory/>} />
      {/* <Route path="/MyAuto" element={<MyAuto/>} /> */}
      <Route path="/auth" element={<Auth/>} />
      
    </Routes>
    <Footer/>     
    </>
  )
}
