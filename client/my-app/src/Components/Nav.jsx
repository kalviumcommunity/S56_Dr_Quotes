import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import logo from "../assets/dr quotes .png";
import { MdDarkMode } from "react-icons/md";
import Form from '../Pages/Form';
import Login from './Login';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Nav = ({ onAuthorSelect }) => {
  const [selectedAuthor, setAuthor] = useState('');

  const handleAuthorChange = (event) => {
    const authorName = event.target.value;
    setAuthor(authorName);
    onAuthorSelect(authorName);
  };

  return (
    <>
      <nav>
        <div className='logo'>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <Link to="/quote-builder" className='builder'><h1>Quote Builder</h1></Link>
        <Link to="/Login" className='login'><h1>Login</h1></Link>
        <div className='topics'>
          <FormControl style={{ width: "200px" }}>
            <InputLabel id="select-label">Authors</InputLabel>
            <Select
              labelId="Topics"
              id="topic"
              value={selectedAuthor}
              onChange={handleAuthorChange}
            >
              <MenuItem value={'retierd_magnu'}>retierd_magnu</MenuItem>
              <MenuItem value={'Author2'}>Author 2</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='about'><h1>About us</h1></div>
        <button className="dark-mode">
          <MdDarkMode size={40} />
        </button>
      </nav>
    </>
  );
}

export default Nav;
