import React, { useEffect, useState,useRef } from 'react'
import pic1 from '../asset/image/pic1.jpg'
import pic2 from '../asset/image/pic2.jpg'
import animal from '../asset/image/animal.jpg'
import animal2 from '../asset/image/animal2.jpg'
import animal3 from '../asset/image/animal3.jpg'
import './style/style.css'
import Card from './Slideshow'
import Slideshow from './Slideshow'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { FaRegHeart } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'
import { BsFillChatRightFill } from 'react-icons/bs'
import hero from '../asset/image/hero.webp'
import applestore from '../asset/image/Appstore.png'
import forth from '../asset/image/94edb770accf.png'
import NavBar from './NavBar'

function DashBoard({ gets }) {
  const inpRef = useRef({})
  const navigate = useNavigate()
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const token = localStorage.token
  const [userDetails, setuserDetails] = useState('')
  const [id, setId] = useState('')
  const [userName, setUserName] = useState('')
  const [userCommentInput, setUserCommentInput] = useState('')
  const [imgDetails, setimgDetails] = useState('')
  const [currentUser, setcurrentUser] = useState('')
  const [postArray, setpostArray] = useState([])
  const [commentId, setcommentId] = useState('')
  const [comment, setcommentBox] = useState('')
  const [AllUser, setAllUser] = useState('')
  const url = `https://davaserver022.onrender.com/users/dashboard`
  const url2 = `https://davaserver022.onrender.com/users/upload`
  const url4 =  `https://davaserver022.onrender.com/users/getPost`
  const url5 =  `https://davaserver022.onrender.com/users/getalluser`
  const url6 = `https://davaserver022.onrender.com/users/postcomment`
  useEffect(() => {
    axios.get(url, {
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
        setUserName(res.data.userDetails.username)
        setcurrentUser(`${res.data.userDetails.firstname} ${res.data.userDetails.lastname}`)
        setcommentId(res.data.userDetails.userId)
      } else {
        localStorage.removeItem('token')
        navigate('/')
      }
    })
    axios.get(url5).then((res) => {
      if (res.data.status) {
        console.log(res.data)
        setAllUser(res.data.AllUser)
      }
      else {
        console.log(res.data)
      }
    })
    axios.get(url4).then((res) => {
      if (res.data.status) {
        console.log(res.data)
        setimgDetails(res.data.posts)
        let p = []
        for (let i = res.data.userPic.length; i > 0; i--) {
          p.push(res.data.userPic[i - 1]);
        }
        console.log(p)
        setpostArray(p);
      }
      else {
        console.log(res.data)
      }
    })
  }, [token])
  const upload = (myfile, setimage, caption) => {
    const token = localStorage.token
    const userData = { myfile, caption, token, currentUser }
    axios.post(url2, userData).then((res) => {
      setimage(res.data.image)
      window.location.reload(true)
      console.log(res.data.image)
    })
  }
  const postComment = (userId) => {
    setId(userId)
    const date = new Date()
    const isoDate = date.toISOString()
    let commentpayload = {userCommentInput, id, isoDate, userName }
    axios.post('https://davaserver022.onrender.com/users/comment',
    commentpayload, {
      headers:
      {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((result) => {
      if (result.data.status) {
      }else{
        localStorage.removeItem('token')
        navigate('/dashboard')
      }
    })
  }
  return (
    <>
      <NavBar upload={upload} />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className='col-md-4 mt-5  mx-auto '>
            <Slideshow />
            {
              postArray.map((user, index) => (
                <div className=" mt-5 card text-dark bg-light" key={index} >
                  <div className="card-header d-flex">
                    <div>
                      <img className='rounded-circle  p-1 border' style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={AllUser[AllUser.findIndex(el => el.email === user.userId)].file !== "" ? AllUser[AllUser.findIndex(el => el.email === user.userId)].file : ""} alt="" /></div>
                    <div className='name mx-3'>
                      <strong>{user.username}</strong>
                      <div className='time'><p>{user.created_at}</p></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title"><img src={user.image} className="card-img-top" alt="" id='cardpic' /></h5>
                    <div>
                      <FaRegHeart className='me-3' />
                      <BsFillChatRightFill className='me-3' />
                      <MdSend className='me-3' />
                    </div>
                    <div className="col-md-7 "><b>{user.username}</b> {user.caption}</div>
                    <input type="text" onChange={(e)=>setUserCommentInput(e.target.value)}  ref={ref=>{inpRef.current[index]=ref}} placeholder='comment' className='place w-75' value={userCommentInput} /><button className='btn btn-primary mx-3' onClick={()=>postComment(user._id)} type="submit">Post</button>
                  </div>
                    <div className='mx-3'>
                      {user.comment.map((user)=>(
                        <>
                        <div>
                        <b style={{marginRight:'10px'}}>{user.username} : </b>
                        <b className='text-muted' >{user.comment}</b>
                        </div>
                        
                        </>
                      ))}
                    </div>

                </div>
              ))
            }
          </div>
          <div className="col-md-4 ">
            <div className='d-flex mt-5'>
              <img className='rounded-circle  p-1 border'  style={{ width: '70px', height: '70px', cursor: 'pointer' }} src="" alt="" />
              <div className='mt-4 mx-5'>
                <b>Username</b>
                <b className='mx-5'> <Link className='text-decoration-none' to={''}>swicth</Link></b>
              </div>
            </div>
            <div className='d-flex mt-4'>
              <p>Suggestions For You</p>
              <Link className='text-decoration-none mx-5' to={''}>See All</Link>
            </div>
            <div className='d-flex mt-3'>
              <img className='rounded-circle  p-1 border' style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={hero} alt="" />
              <div className='mt-2 mx-2'>
                <b>Fadare Joe</b>
                {/* <b className='mx-5 p-5'> <Link className='text-decoration-none text-dark' to={''}>lorem</Link></b> */}
              </div>
            </div>
            <div className='d-flex mt-3'>
              <img className='rounded-circle  p-1 border' style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={applestore} alt="" />
              <div className='mt-2 mx-2'>
                <b>Akinpelu Jona</b>
                {/* <b className='mx-5 p-5'> <Link className='text-decoration-none text-dark' to={''}>lorem</Link></b> */}
              </div>
            </div>
            <div className='d-flex mt-3'>
              <img className='rounded-circle  p-1 border' style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={forth} alt="" />
              <div className='mt-2 mx-2'>
                <b>Jame Owolabi</b>
                {/* <b className='mx-5 p-5'> <Link className='text-decoration-none text-dark' to={''}>lorem</Link></b> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard