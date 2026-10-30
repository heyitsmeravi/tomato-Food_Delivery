// import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = ({logout}) => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="Logo" className="logo" />
      <div className="navbar-profile">
        <img src={assets.profile_image} alt="User" className="profile" />
        <ul className="navbar-profile-dropdown">
          <li onClick={logout}>
            <img src={assets.logout_icon} alt="logout_icon"  /><p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
