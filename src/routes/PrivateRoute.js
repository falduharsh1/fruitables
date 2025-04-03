import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { checkAuth } from '../redux/Slice/authSlice'

export default function PrivateRoute() {

  const [loading , isLoading] = useState(true)

  const auth = useSelector(state => state.auth)

  console.log("auth",auth);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    const check_authe = async () => {
      try {
         await dispatch(checkAuth())
      } catch (error) {

        navigate("/")

        console.log(error);
        
      }finally{
        isLoading(false)
      }
    }

    check_authe()
  },[navigate,dispatch])

  if(loading){
    return(
      <p>Loading...</p> 
    )
  }

  // let auth = true
  return (
    auth.isValidate ? <Outlet/> : <Navigate to={"/"} />
  )
}
