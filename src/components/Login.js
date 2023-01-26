import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './style/style.css'
import pic from '../asset/image/instagramlogo.png'
import pic2 from '../asset/image/Appstore.png'
import pic3 from '../asset/image/Playstore.png'
import vid from '../asset/video/Screen-2022-06-03-053820.mp4'
import pic4 from '../asset/image/WhatsApp Image 2022-06-08 at 9.48.26 AM.jpeg'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import bootstrap from 'bootstrap'
function Login() {
    const url = `https://davaserver022.onrender.com/users/`
    const [message, setmessage]=useState("")
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            // console.log(url)
            const userDetails = values;
            axios.post(url,userDetails).then((res)=>{
                if(res.data.status){
                    console.log('succesful login');
                    localStorage.token = res.data.token
                    setmessage(res.data.message)
                    navigate("/dashboard")
                }else{
                    console.log('unsuccesful');
                }
            })
        },
        validationSchema: yup.object({
            email: yup.string().required('Required Field'),
            password: yup.string().required('Required Field'),
        })
    })
  
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8 ">
                        <div className="row mt-3">
                            <div className="col-md-6 d-none d-md-block pt-5" >
                                <video src={vid} autoPlay loop style={{ width: '300px' }}></video>
                            </div>
                            <div className="col-md-6 pt-5" id='col'>
                               <div className='justify'>
                               <img src={pic} alt="" />
                               </div>
                                <form action=""className='form justify-content-center p-3' onSubmit={formik.handleSubmit}>
                                    <input type="text" placeholder='Email ' className='my-2 form-control w-100' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}

                                    <input type="text" placeholder='Password' className='my-2 form-control w-100' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
                                    <button disabled={!formik.isValid} className='btn btn-primary w-100 my-2' type='submit' onClick={Login}>Log In</button>
                                    <div className='justify'>
                                    <img src={pic4} alt="" style={{width:'150px',height:'auto'}} />
                                    </div>
                                    <p id='log'>Log in with Facebook</p>
                                    <p id='log'>forgot password?</p>
                                    <div id='don'>
                                      <b>Dont have an account</b>  <NavLink to='/signup' >Signup</NavLink>
                                    </div>
                                    <p className='get'>Get The App</p>
                                    <div className='justify'>
                                        <img src={pic2} alt="" className='pic2' />
                                        <img src={pic3} alt="" className='pic3' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login