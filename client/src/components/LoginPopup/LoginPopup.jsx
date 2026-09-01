// import React from 'react'
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login-popup" id="login-popup">
      <form action="" className="login-popup-container">
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
            {currState === "Sign Up" ? <input type="text" placeholder="Your Name" required /> : <></>}
            <input type="email" placeholder="Your email" required />
            <input type="password" placeholder="Your password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" :"Login" }</button>
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
