import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { checkAuth } from '../redux/Slice/authSlice'

export default function PrivateRoute() {

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
    
    auth.isValidate ? <Outlet/> : <Navigate to={"/"} />

  )
}
