import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../Components/Login'
import Nav from '../Components/Nav'

const LoginPage = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://dr-quotes.onrender.com/api/quotes');
          setQuotes(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching quotes:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
  return (
    <>
        <Nav quotes={quotes}/>
         <Login/>
    </>
  )
}

export default LoginPage