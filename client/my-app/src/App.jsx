import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Container from './Components/Container';
import axios from 'axios';

function App() { 
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/quotes')
      .then(res => {
        setQuotes(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
        setLoading(false); 
      });
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

export default App;
