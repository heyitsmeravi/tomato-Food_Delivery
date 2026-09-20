import {useContext, useState} from 'react'

import './Navbar.css'
import {assets} from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount ,token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setToken("");
  }
  return (
    <div className = "navbar">
      <Link to ="/"> <img src={assets.logo} alt="logo" className='logo'/> </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>{setMenu("home")}} className = {menu ==="home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={()=>{setMenu("menu")}} className = {menu ==="menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={()=>{setMenu("mobile")}} className = {menu ==="mobile" ? "active" : ""}>Mobile App</a>
        <a href="#footer" onClick={()=>{setMenu("contact")}} className = {menu ==="contact" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-search-icon">
            <Link to="/cart"> <img src={assets.basket_icon} alt="" /> </Link>
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        {
          !token ? 
          <button onClick={() => setShowLogin(true)}>sign in</button>
          : < div className = "navbar-profile" >
            <img src={assets.profile_icon} alt="profile_icon" />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="logout_icon" /><p>My Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="logout_icon"  /><p>Logout</p>
              </li>
            </ul>
          </div>
      }
      </div>
    </div>
  )
}

export default Navbar
