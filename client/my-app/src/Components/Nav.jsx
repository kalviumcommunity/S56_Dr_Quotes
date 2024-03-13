import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import "./Nav.css";
import logo from "../assets/dr quotes .png";
import { MdDarkMode } from "react-icons/md";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Cookies from 'js-cookie';

const Nav = ({ onAuthorSelect, quotes }) => {
  const [selectedAuthor, setAuthor] = useState('');
  let username = Cookies.get('username');

  // Extract unique author names from the quotes
  const uniqueAuthors = [...new Set(quotes.map(quote => quote.author.name))];

  const handleAuthorChange = (event) => {
    const authorName = event.target.value;
    setAuthor(authorName);
    onAuthorSelect(authorName);
  };

  const handleLogout = () => {
    document.cookie = `username=; max-age=0`; 
    console.log('Logout successful');
  };

  return (
    <>
      <nav>
        <div className='logo'>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <Link to="/quote-builder" className='builder'><h1>Quote Builder</h1></Link>
        <div className='topics'>
          <FormControl style={{ width: "200px" }}>
            <InputLabel id="select-label">Authors</InputLabel>
            <Select
              labelId="Topics"
              id="topic"
              value={selectedAuthor}
              onChange={handleAuthorChange}
            >
              {/* Map over the unique authors */}
              {uniqueAuthors.map(author => (
                <MenuItem key={author} value={author}>{author}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='about'><h1>About us</h1></div>
        <div className="Login">
          {username === undefined ? (
            <Link to="/Login">
              <button style={{ width: "150px", height: "50px" }}>Login</button>
            </Link>
          ) : (
            <button style={{ width: "150px", height: "50px" }} onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
