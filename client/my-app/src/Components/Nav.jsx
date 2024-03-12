import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./Nav.css";
import logo from "../assets/dr quotes .png";
import { MdDarkMode } from "react-icons/md";
import Form from '../Pages/Form';
import Login from './Login';

const Nav = () => {
  return (
    
      <>
        <nav>
          <div className='logo'>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <Link  to="/quote-builder" className='builder'><h1>Quote Builder</h1></Link>
          <Link to="/Login" className='login'><h1>Login</h1></Link>
          <div className='topics'><h1>Topics</h1></div>
          <div className='about'><h1>About us</h1></div>
          <button className="dark-mode">
            <MdDarkMode size={40}/>
          </button>
        </nav>
     </>
  );
}

export default Nav;
