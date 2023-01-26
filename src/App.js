import React from "react"
import { Navigate,Route, Routes } from "react-router-dom"
import FormikForm from "./components/FormikForm"
import bootstrap from "bootstrap";
import { useFormik } from "formik";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [id, setId] = useState();
  const token = localStorage.token
  const idSet = ({gets}) => {
    axios.get(`https://davaserver022.onrender.com/users/get-image`, {username: gets}).then((res) => {
      if(res.data.status) {
        setId(res.data.image);
      }
    })
  }
  return (
    // token?<DashBoard gets={idSet}/>:<Navigate to='/login'/>}
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<FormikForm/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/profile" element={<Profile id={id}/>}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
    </Routes>
  
    </>
  );
}

export default App;
