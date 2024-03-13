import React, { useState } from 'react';
import "./Login.css"
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        document.cookie = `username=${username}; max-age=3600`; 
        setLoggedIn(true);
        axios.post("https://dr-quotes.onrender.com/api/auth",{username})
        .then((result)=>{
            document.cookie = `token=${result.data}; expires=` +new Date(2040,0,1).toUTCString

        })
        .catch((err)=>console.log(err))

    };



    return (
        <>
                 <div className='main-container'>
                    <div className='form-box'>
                        <Link to={"/"}><button className='exit'>X</button></Link>
                        <div className='user-icon'> <FaUserCircle size={140} /></div>
                        <div className='input-box'>
                            <label htmlFor="input">Your Username :</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="input">Your Password :</label>
                            <input type="password" placeholder='Password'/>
                            <Link to={"/"}><button className='login-bttn' onClick={handleLogin}>Login</button></Link>
                        </div>
                    </div>
                </div>
          
        </>
    );
};

export default Login;
