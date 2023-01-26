import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import './style/style.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import pic from '../asset/image/instagramlogo.png'
import pic2 from '../asset/image/Appstore.png'
import pic3 from '../asset/image/Playstore.png'
import pic4 from '../asset/image/WhatsApp Image 2022-06-08 at 9.48.26 AM.jpeg'
import vid from '../asset/video/Screen-2022-06-03-053820.mp4'
import { useNavigate } from 'react-router-dom'
function FormikForm() {
    const [message, setmessage] = useState('')
    const [status, setstatus] = useState('')
    const url = `https://davaserver022.onrender.com/users/signup`
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            username:'',
            file:'',
            password: ''
        },
        onSubmit: (values) => {
            const newUser = values;
            console.log(url);
            axios.post(url, newUser).then((res) => {
                console.log(res)
                setmessage(res.data.message)
                setstatus(res.data.status)
                if (res.data.status) {
                    console.log('successful');
                    navigate("/")
                }else{
                    console.log('unsuccesfu;l');
                }
            })
            // axios.post(url,values).then((result)=>{
            //     console.log(values)
            // })
        },
        validationSchema: yup.object({
            firstname: yup.string().required('Required Field'),
            lastname: yup.string().required('Required Field'),
            email: yup.string().required('Required Field'),
            username: yup.string().required('Required Field'),
            password: yup.string().required('Required Field'),
        })
    })
    console.log(formik.touched)
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-5">
                        <div className="row">
                            <div className='justify mb-3'>
                                <img src={pic} alt="" />
                            </div>
                                <div className='sup justify-content-center text-muted '>Sign up to see photos and videos from your friends.</div>
                            <form action="" className='form-group' onSubmit={formik.handleSubmit}>
                                <div className='justify mb-4'>
                                    <input type="text" placeholder='First Name' className='my-2 form-control w-100' name='firstname' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.firstname && <div className='text-danger'>{formik.errors.firstname}</div>}
                                </div>
                                <div className='justify mb-4'>
                                    <input type="text" placeholder='Last Name' className='my-2 form-control w-100' name='lastname' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.lastname && <div className='text-danger'>{formik.errors.lastname}</div>}
                                </div>
                                <div className='justify mb-4'>
                                    <input type="text" placeholder='Email' className='my-2 form-control w-100' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}</div>
                                <div className='justify mb-4'>
                                    <input type="text" placeholder='Username' className='my-2 form-control w-100' name='username' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.username && <div className='text-danger'>{formik.errors.username}</div>}</div>
                                <div className='justify mb-4'>
                                    <input type="text" placeholder='password' className='my-2 form-control w-100' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}</div>
                                <div className='justify mb-4'>
                                    <button disabled={!formik.isValid} className='btn btn-primary w-100 my-2' type='submit' onClick={FormikForm}>Sign Up</button>
                                </div>
                                <div className='justify mb-4'>
                                    <img src={pic4} alt="" id='pic4' style={{ width: '350px', height: 'auto' }} />
                                </div>
                                <div className='justify mb-4'>
                                <button className='btn btn-primary w-50'>Log in with Facebook</button>
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
        </>
    )
}

export default FormikForm