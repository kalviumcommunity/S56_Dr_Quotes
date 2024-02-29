import React from 'react';
import './Container.css';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import icon from "../assets/icon.png"
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";


const Container = () => (
  <div className="quote-container">
    <div className="quote-container-content">
     <div className='quote-author'>
       <div className='author-img'>
        <img src={icon} alt="icon" className='profile-img' />
       </div>
       <div className='author-name'> <h3>Dr.Quotes</h3>  <IoCheckmarkDoneCircleSharp size={20} /></div>
       <div className='Options'><BsThreeDots  size={50} /> </div>
       
     </div>
     <blockquote className="blockquote"><p>“Not only is the Universe stranger than we think, it is stranger than we can think.”
          ― Werner Heisenberg</p></blockquote>
<br />
    </div>
    <div className="quote-controls">
    <div className='likes'>   <FaRegHeart size={40} /> <h3>20.1k</h3>  </div>
    <div className='comment'>  <FaRegComment size={40} /> <h3>25</h3>  </div>
    <div className='share'>   <GoShare size={40} /> <h3>Share</h3>  </div>
      <button type="button">
        Next Quote
      </button>
    </div>
  </div>
);

export default Container;