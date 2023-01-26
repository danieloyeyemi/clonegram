import React from 'react'
import pic from '../asset/image/instagramlogo.png'
import './style/style.css'
import { FaRegPlusSquare, FaRegHeart, FaRegUserCircle } from "react-icons/fa"
import { MdSend, MdHome, MdOutlineExplore, MdCached } from "react-icons/md"
import { RiSettings3Line } from "react-icons/ri"
import { BiUserCircle } from "react-icons/bi"
import { GrBookmark } from "react-icons/gr"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function NavBar({upload}) {
  const url = `https://davaserver022.onrender.com/users/upload`
  const [myfile, setmyfile] = useState('')
  const [image, setimage] = useState('')
  const [caption, setcaption] = useState('')
  const pickFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      setmyfile(result)
      console.log(result)
    }
  }
  // const upload = () => {
  //   const token = localStorage.token
  //   const userData = { myfile,token }
  //   axios.post(url, userData).then((res) => {
  //     setimage(res.data.image)
  //     console.log(res.data.image)
  //   })
  // }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-center">

          <div className=" navbar" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex mx-2 mx-lg-2 mx-sm-1">
                <div className='instalogo mx-lg-5'>
                  <img src={pic} alt="" />
                </div>
                <div className='con col-md-6 d-none d-md-block mx-3'>
                  <form className="d-flex mx-5">
                    <input className="form-control mx-5 mt-2" type="search" placeholder="Search" aria-label="Search" />
                  </form>
                </div>
                <div className='icons  d-flex mt-2 justify-content-end'>
                  <Link to={'/dashboard'} className='home me-lg-3' style={{ color: 'black' }}><MdHome id='hom' /></Link>
                  <Link to={'/dashboard'} className='home me-lg-3' style={{ color: 'black' }}><MdSend id='hom' /></Link>
                  <Link to={'/dashboard'} className='home me-lg-3' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ color: 'black' }}><FaRegPlusSquare id='hom' /></Link>
                  <Link to={'/dashboard'} className='home me-lg-3' style={{ color: 'black' }}><FaRegHeart id='hom' /></Link>
                  <Link to={'/dashboard'} className='home me-lg-3' style={{ color: 'black' }}><MdOutlineExplore id='hom' /></Link>
                  <div className="dropdown">
                    <a className="dropdown" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      <Link to={'/profile'} className='home me-lg-3' style={{ color: 'black' }}><FaRegUserCircle id='hom' /></Link>
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><a className="dropdown-item" href="profile"><BiUserCircle className='ris me-2' />Profile</a></li>
                      <li><a className="dropdown-item" href="#"><GrBookmark className='ris me-2' />Saved</a></li>
                      <li><a className="dropdown-item" href="#"><RiSettings3Line className='ris me-2' />Settings</a></li>
                      <li><a className="dropdown-item" href="#"><MdCached className='ris me-2' />Switch Accounts</a></li>
                      <hr />
                      <li><a className="dropdown-item" href="login">Log Out</a></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Make a post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="file" name="img" onChange={(e) => pickFile(e)} className='form-control' id="" />
            </div>
            <div className="modal-footer">
              <input type="text" className='caption w-75' placeholder='Enter caption'onChange={(e)=>setcaption(e.target.value)} />
              <button type="button" onClick={()=>upload(myfile,setimage,caption)} className="btn btn-primary">Upload</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default NavBar