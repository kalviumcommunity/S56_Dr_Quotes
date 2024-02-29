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
    <div className='builder'><h1>Quote Builder</h1></div>
    <div className='topics'><h1>Topics</h1></div>
    <div className='about'><h1>About us</h1></div>
    
    <button className="dark-mode">
    <MdDarkMode  size={40}/>
    </button>
  </nav>
    </>
  )
}

export default Nav