import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import Container from '../Components/Container';
import axios from 'axios';

function Home() { 
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
      <Nav/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container quotes={quotes} />
      )}
    </>
  );
}

export default Home;
