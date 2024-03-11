import React, { useState } from 'react';
import './Container.css';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import icon from '../assets/icon.png';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { GoShare } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Container = ({ quotes }) => {
  if (!quotes.length) return <p>No quotes available.</p>;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextQuote = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length);
  };

  const quote = quotes[currentIndex];

  return (
    <div className="quote-container">
      <div className="quote-container-content">
        <div className="quote-author">
          <div className="author-img">
            <img src={icon} alt="icon" className="profile-img" />
          </div>
          <div className="author-name">
            <h3>{quote.author.name}</h3> <IoCheckmarkDoneCircleSharp size={20} />
          </div>
          <div className="Options">
            {/* Pass quote ID to UpdateForm */}
            <Link to={`/UpdateForm/${quote._id}`}><FaEdit size={40} /></Link>
            <RiDeleteBin6Line size={40} />
          </div>
        </div>
        <blockquote className="blockquote">
          <p>"{quote.content}"</p>
        </blockquote>
        <br />
      </div>
      <div className="quote-controls">
        <div className="likes">
          <FaRegHeart size={40} /> <h3>20.1k</h3>
        </div>
        <div className="comment">
          <FaRegComment size={40} /> <h3>25</h3>
        </div>
        <div className="share">
          <GoShare size={40} /> <h3>Share</h3>
        </div>
        <button type="button" onClick={handleNextQuote}>Next Quote</button>
      </div>
    </div>
  );
};

export default Container;
