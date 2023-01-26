import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { useFormik } from 'formik'
// import * as yup from 'yup'
import axios from 'axios'
// import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function EditProfile() {
    return (
        <>
            <NavBar />
            <div className="container-fluid ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-3" style={{border:'1px solid black '}}>
                            <div style={{ listStyleType: 'none'}}>
                                
                                <li className='mt-5 mx-3'><strong><Link className='text-decoration-none text-dark' to={''}>Edit Profile</Link></strong></li>
                                <li className='mt-5 mx-3'><Link className='text-decoration-none text-dark' to={''}>Change Password</Link></li>
                                <li className='mt-5 mx-3'><Link className='text-decoration-none text-dark' to={''}>Email Notifications</Link></li>
                                <li className='mt-5 mx-3'><Link className='text-decoration-none text-dark' to={''}>Push Notifications</Link></li>
                                <li className='mt-5 mx-3'><Link className='text-decoration-none text-dark' to={''}>Manage Contacts</Link></li>
                                <li className='mt-5 mx-3'><Link className='text-decoration-none text-dark' to={''}>Privacy and Security</Link></li>
                                <li className='mt-5 mx-3'><Link className='text-decoration-none text-dark' to={''}>Login Activities</Link></li>
                                <li className='mt-5 mx-3'><strong><Link className='text-decoration-none text-dark' to={''}>Help</Link></strong></li>
                            </div>
                            <hr />
                                <img src="" alt="" /><strong>Meta</strong>
                                <div>Account Center</div>
                        </div>
                        <div className="col-md-6" style={{border:'1px solid black '}}>
                            <div >
                                <div>
                                    <img src="" alt="" />
                                    <div>username</div>
                                </div>
                                <div className=''>
                                    <div className='d-flex'>
                                    <div>Name</div>
                                    <input type="text" placeholder='' />
                                    </div>
                                    <p className='mx-'>Help people discover your account by using the name your are known by: either your full name, nickname, or business name </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default EditProfile