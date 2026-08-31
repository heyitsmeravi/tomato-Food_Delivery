// import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className = "footer" id= "footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="Footer Logo"/>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium doloremque perferendis, iure maiores debitis beatae quibusdam at pariatur labore! Aspernatur voluptatum sint voluptate laborum, error recusandae voluptas? Dolores, vel debitis.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="Facebook" />
                <img src={assets.twitter_icon} alt="Twitter" />
                <img src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 7494002956</li>
                <li>heyitsmeravi01@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 &copy; Tomato.com - All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
