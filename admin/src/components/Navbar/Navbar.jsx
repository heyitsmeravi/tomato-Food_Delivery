// import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = ({logout}) => {
  return (
    <div className='navbar'>
      <div className="navbar-brand">
        <img src={assets.logo} alt="Logo" className="logo" />
        <span>Admin workspace</span>
      </div>
      <div className="navbar-account">
        <div className="navbar-account-copy">
          <strong>Tomato Admin</strong>
          <span>Control center</span>
        </div>
        <div className="navbar-profile">
        <img src={assets.profile_image} alt="User" className="profile" />
        <ul className="navbar-profile-dropdown">
          <li onClick={logout}>
            <img src={assets.logout_icon} alt="logout_icon"  /><p>Logout</p>
          </li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
