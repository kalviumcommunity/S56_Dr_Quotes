import React from 'react'
import "./Nav.css"
import logo from "../assets/dr quotes .png"
import { MdDarkMode } from "react-icons/md";
const Nav = () => {
  return (
    <>
   <nav>
    <div className='logo'>
    <img src={logo} alt="logo" className="logo" />
    </div>
    <button className="dark-mode">
    <MdDarkMode  size={40}/>
    </button>
  </nav>
    </>
  )
}

export default Nav