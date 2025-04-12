import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { checkOTP, userLogin, userRegister } from '../../redux/Slice/authSlice';
import { redirect, useNavigate } from 'react-router-dom';


export default function Auth() {

    const [type, setType] = useState("login");

    const [userEmail, setuserEmail] = useState('')

    const dispatch = useDispatch()

    const authSelector = useSelector(state => state.auth)

    console.log(authSelector);

    const navigate = useNavigate();
    if (authSelector.isValidate) {
        navigate("/");
    }

    let initialValues = {}, validationSchema = {}

    if (type === 'login') {
        validationSchema = {
            email: string().email().required(),
            password: string().min(6, "Password must be at least 6 characters").required()
        }
        initialValues = {
            email: "",
            password: ""
        }
    } else if (type === 'register') {
        validationSchema = {
            name: string().required(),
            email: string().email().required(),
            password: string().min(6, "Password must be at least 6 characters").required()
        }
        initialValues = {
            name: "",
            email: "",
            password: ""
        }
    } else if (type === 'OTP') {
        validationSchema = {
            otp: string().required(),
        }
        initialValues = {
            otp: ""
        }
    } else {
        validationSchema = {
            email: string().email().required()
        }
        initialValues = {
            email: ""
        }
    }

    const authSchema = object(validationSchema)

    validationSchema = { authSchema }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: authSchema,
        enableReinitialize: true,
        onSubmit: async values => {
            //   alert(JSON.stringify(values, null, 2));

            if (type === 'login') {
                dispatch(userLogin(values))
            } else if (type === 'register') {
                const res = await dispatch(userRegister({ ...values, role: 'user' }))

                console.log("res", res);

                if (res.type === "auth/userRegister/fulfilled") {
                    setType("OTP")
                    setuserEmail(values.email)
                }

            } else if (type === 'OTP') {
                console.log(values);
                const res = await dispatch(checkOTP({otp : values.otp , email : userEmail}))

                

                if (res.type === "auth/checkOTP/fulfilled") {
                    setType("login")
                    localStorage.removeItem('UserEmail')
                    setuserEmail('')
                }
            }

            resetForm()

        },

    })

    useEffect(() => {
       const LocalEmail = localStorage.getItem('UserEmail')

       if(LocalEmail){
            setType("OTP")
            setuserEmail(LocalEmail)
       }

    },[])

    const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, setFieldValue, resetForm } = formik;

    const googleLogin = () => {
        try {
            window.location.href = 'http://localhost:8000/api/v1/user/google'
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {
                        type === "login" ? "Login" : type === "register" ? "register" : type === 'OTP' ? "Verify OTP" : "Forgot password"
                    }
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">{type === "login" ? "Login" : type === "register" ? "register" : type === 'OTP' ? "Verify OTP" : "Forgot password"
                    }</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">

                            <div className="col-lg-7">
                                <form action className onSubmit={handleSubmit}>

                                    {type !== "register" ? "" :
                                        <>
                                            <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name"
                                                name='name'
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            {
                                                <span style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</span>
                                            }
                                        </>
                                    }

                                    {
                                        type !== 'OTP' ?
                                            <>
                                                <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email"
                                                    name='email'
                                                    value={values?.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {
                                                    <span style={{ color: 'red' }}>{errors.email && touched.email ? errors.email : ''}</span>
                                                }
                                            </> : ""


                                    }



                                    {
                                        type === "login" || type === "register" ?
                                            <>
                                                <input className="w-100 form-control border-0 mb-4"
                                                    placeholder="Your password"
                                                    name='password'
                                                    value={values?.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {
                                                    <span style={{ color: 'red' }}>{errors.password && touched.password ? errors.password : ''}</span>
                                                }
                                            </>
                                            : null


                                    }

                                    {
                                        type === "OTP" ?
                                            <>
                                                <input className="w-100 form-control border-0 mb-4"
                                                    placeholder="Your OTP"
                                                    name='otp'
                                                    value={values?.otp}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {
                                                    <span style={{ color: 'red' }}>{errors.otp && touched.otp ? errors.otp : ''}</span>
                                                }
                                            </>
                                            : null


                                    }

                                    <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit"> {
                                        type === "login" ? "Login" : type === "register" ? "register" : type === 'OTP' ? "Verify OTP" : "Forgot password"
                                    }</button>

                                    {
                                        type === "login" ?
                                            <>
                                                <a onClick={() => setType("password")} href='#'>Forget password</a>
                                                <br></br>
                                                <a onClick={() => setType("register")} href='#'>Don't have a acount ? Create</a>
                                            </>
                                            :
                                            type === "password" ?
                                                <a onClick={() => setType("login")} href='#'>You have acount ?Login</a>
                                                :
                                                null
                                    }

                                    {
                                        type === "register" ? <a onClick={() => setType("login")} href='#'>You have acount ?Login</a> : null
                                    }


                                    <button onClick={googleLogin} className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Login with google</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}




{/* Register Form */ }
//  <div className="tab-pane fade" id="registerTab">
//  <h4 className="text-center mb-4">Register</h4>
//  <form>
//    {/* Name Field */}
//    <div className="mb-3">
//      <label htmlFor="registerName" className="form-label">Name</label>
//      <input type="text" className="form-control" id="registerName" placeholder="Enter your name" required />
//    </div>
//    {/* Email Field */}
//    <div className="mb-3">
//      <label htmlFor="registerEmail" className="form-label">Email</label>
//      <input type="email" className="form-control" id="registerEmail" placeholder="Enter your email" required />
//    </div>
//    {/* Password Field */}
//    <div className="mb-3">
//      <label htmlFor="registerPassword" className="form-label">Password</label>
//      <input type="password" className="form-control" id="registerPassword" placeholder="Enter your password" required />
//    </div>
//    {/* Submit Button */}
//    <button type="submit" className="btn btn-success w-100 btn-custom">Register</button>
//  </form>
// </div>

