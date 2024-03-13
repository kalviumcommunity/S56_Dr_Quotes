import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuoteForm from "../Components/Form";
import Nav from '../Components/Nav';

const Form = () => {
    const [quotes, setQuotes] = useState([]);  
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
    <Nav quotes={quotes} />
   <QuoteForm/>
   </>
  )
}

export default Form