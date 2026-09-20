// import React from 'react'
import { useState } from "react";
import { assets } from "../../assets/assets";
import {StoreContext} from "../../context/StoreContext";
import { useContext } from "react";
import axios from "axios";
import "./LoginPopup.css";
const LoginPopup = ({ setShowLogin }) => {
  const {url , setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };
  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if ( currState === "Sign Up") {
      newUrl += "/api/user/register";
    } else {
      newUrl += "/api/user/login";
    }
    // Perform the actual login or registration
    const response = await axios.post(newUrl, data);
    console.log(response.data.success);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }

  }
  return (
    <div className="login-popup" id="login-popup">
      <form action="" className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => {
              setShowLogin(false);
            }}
          />
        </div>
        <div className="login-popup-inputs">
            {currState === "Sign Up" ? <input onChange={onChangeHandler} type="text" name="name" value={data.name} placeholder="Your Name" required /> : <></>}
            <input onChange={onChangeHandler} type="email" name="email" value={data.email} placeholder="Your email" required />
            <input onChange={onChangeHandler} type="password" name="password" value={data.password} placeholder="Your password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" :"Login" }</button>
        <div className="login-popup-condition">
            <input type="checkbox" name="" id="" />
            <p> By continuing, i agree to the terms of use & privacy policy. </p>
        </div>
        {
            currState === "Login"
            ?
            <p>
                Create a new account ? <span onClick={()=>{setCurrState("Sign Up")}}>click here</span>
            </p>
            :
             <p> Already have an account ? <span onClick={()=>{setCurrState("Login")}} > Login here </span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
