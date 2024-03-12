import React, { useState } from 'react';
import "./Login.css"
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        document.cookie = `username=${username}; max-age=3600`; // Seting username in cookie for 1 hour
        setLoggedIn(true);
        axios.post("https://dr-quotes.onrender.com/api/auth",{username})
        .then((result)=>{
            document.cookie = `token=${result.data}; expires=` +new Date(2040,0,1).toUTCString

        })
        .catch((err)=>console.log(err))
        navigate("/")
        console.log('Login successful');
    };

    const handleLogout = () => {
        document.cookie = 'username=; max-age=0'; // Removing the username cookie and token
        document.cookie = `token=; max-age=0 `  ;   
        window.location.reload()
        setLoggedIn(false);
        console.log('Logout successful');
    };

    return (
        <>
        
            {!loggedIn ? (
                 <div className='main-container'>
                    
                 
                <div className='form-box'>
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
                    <input type="text" 
                    placeholder='Password'/>
                    <button  className='login-bttn'  onClick={handleLogin}>Login</button>
                    </div></div>
                </div>
                 ) : (
                <div className='main-container'>
                    <div className='form-box'>
                    <h1 style={{textAlign:"center",marginTop:"120px"}}>Welcome, {document.cookie.split('=')[1]}</h1>
                    <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
