import React, { useEffect, useState } from 'react'
import './style/style.css'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { FiSettings } from "react-icons/fi"
import {GrBookmark} from "react-icons/gr"
import {RiFolderUserLine} from "react-icons/ri"
import {BsGrid3X3} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
// import { useState } from 'react'
import axios from 'axios'

function Profile({id}) {
  const token = localStorage.token
  const [userDetails, setuserDetails] = useState('')
  const [imgDetails, setimgDetails] = useState('')
  const [currentUser, setcurrentUser] = useState('')
   const [file, setFile] = useState()
  const navigate=useNavigate()
  const url = `https://davaserver022.onrender.com/users/getimage`
  const url1 = `https://davaserver022.onrender.com/users/dashboard`

   const [myfile, setmyfile] = useState('')
   useEffect(() => {
    axios.get(url1, {
      headers:
      {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      if (res.data.status) {
        setuserDetails(res.data.userDetails)
        setimgDetails(res.data.posts)
        setmyfile(res.data.userDetails.file)
        setcurrentUser(`${res.data.userDetails.firstname} ${res.data.userDetails.lastname}`)
        console.log(res.data.userDetails.username)
      } else {
        localStorage.removeItem('token')
        navigate('/')
      }
    })
  
  }, [token])
  const pickFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      setmyfile(result)
      console.log(result)
      axios.post(url,{myfile:result,token:localStorage.token}).then((res) => {
        if (res.data.status) {
          console.log(res.data);
          setmyfile(res.data.image)
          // setuserDetails(res.data.userDetails)
         
        }
        else{console.log(res.data)}
      })
    }
   }
 


  return (
    <>
      <NavBar />
      <div className="container ">
        <div className="row d-flex">
          <div className=" card col-md-6 mt-5">
            <div className='d-flex p-3 '>
              <label>
                <input type="file" hidden="hidden" onChange={(e) => pickFile(e)} />
                <img src={myfile} alt="" className='rounded-circle p-1 border' style={{ width: '10vw', height: '10vw', cursor: 'pointer' }} />
              </label>
              <div>
                <div className='d-flex mt-3 justify-content-center'>
                  <h2 className='me-3'>Daniel</h2>
                  <Link to={'/editprofile'}><button className='me-3 mt-2' style={{ height: '30px' }}>Edit profile</button></Link>
                  <FiSettings className='me-3 mt-3' />
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='me-3'>Posts</div>
                  <div className='me-3'>Followers</div>
                  <div className='me-3'>Followings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dl d-flex justify-content-center ">
        <Link to={'/'} className='home me-lg-3'><BsGrid3X3/>POSTS</Link>
        <Link to={'/'} className='home me-lg-3'><GrBookmark/>SAVED</Link>
        <Link to={'/'} className='home me-lg-3'><RiFolderUserLine/>TAGGED</Link>
      </div>
    </>
  )
}

export default Profile