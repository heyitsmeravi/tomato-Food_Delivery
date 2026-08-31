// import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.css'
const AppDownload = () => {
  return (
    <div className = "app-download" id="app-download">
      <p> For better experience download  <br/> Tomato App</p>
      <div className="app-download-icons">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
