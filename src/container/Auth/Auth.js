import React, { useState } from 'react'
import { useFormik } from 'formik';
import { object, string } from 'yup';


export default function Auth() {

    const [type, setType] = useState("login");

    let authSchema = object({
        name: string().required(),
        email: string().email(),
        password : string().min(6, "Password must be at least 6 characters").required()
      });

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },
        validationSchema: authSchema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, setFieldValue, resetForm } = formik;


    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {
                        type === "login" ? "Login" : type === "register" ? "register" : "Forgot password"
                    }
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">{type === 'login' ? "login" : type === 'register' ? 'register' : 'forgot password'
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
                                    
                                    {type === "login" || type === "password" ? "" : <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name"
                                    name='name' 
                                    value={values.name}
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    }

                                    <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email" 
                                     name='email' 
                                     value={values.email}
                                     error={errors.email && touched.email}
                                     helperText={errors.email && touched.email ? errors.email : ''}
                                     onChange={handleChange}
                                     onBlur={handleBlur}/>

                                     
                                    {
                                        type !== "password" ? <input className="w-100 form-control border-0 mb-4" 
                                        placeholder="Your password" 
                                        name='password'
                                        value={values.password}
                                        error={errors.password && touched.password}
                                        helperText={errors.password && touched.password ? errors.password : ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                        
                                            : null
                                    }

                                    <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit"> {
                                        type === 'login' ? "login" : type === 'register' ? 'register' : 'forgot password'
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
                                                <a onClick={() => setType("login")} href='#'>You have acount ?</a>
                                                :
                                                null
                                    }
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

