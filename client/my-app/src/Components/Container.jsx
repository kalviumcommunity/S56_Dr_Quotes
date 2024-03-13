import React, { useState } from 'react';
import './Container.css';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import icon from '../assets/icon.png';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { GoShare } from 'react-icons/go';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Container = ({ quotes, onDelete, selectedAuthor }) => {
  if (!quotes.length) return <p>No more quotes available.</p>;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextQuote = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredQuotes.length);
  };

  // Filter quotes based on selected author
  const filteredQuotes = selectedAuthor ? quotes.filter(quote => quote.author.name === selectedAuthor) : quotes;

  const handleDelete = (quoteId) => {
    onDelete(quoteId);
  };

  const quote = filteredQuotes[currentIndex];

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
            <Link to={`/UpdateForm/${quote._id}`}><FaEdit size={40} /></Link>
            <button className='delete' onClick={() => handleDelete(quote._id)}><RiDeleteBin6Line size={45} className='delete_icon'/></button>
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
