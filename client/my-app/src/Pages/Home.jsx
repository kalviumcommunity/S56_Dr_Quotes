import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import Container from '../Components/Container';
import axios from 'axios';
import ReactLoading from "react-loading";

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

  const [selectedAuthor, setSelectedAuthor] = useState('');

  const handleAuthorSelect = (authorName) => {
    setSelectedAuthor(authorName);
  };
  const handleDelete = async (quoteId) => {
    try {
      await axios.delete(`https://dr-quotes.onrender.com/api/quotes/${quoteId}`);
      // Filtering out the deleted quote from the quotes state
      setQuotes(quotes.filter(quote => quote._id !== quoteId));
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <>
       <Nav onAuthorSelect={handleAuthorSelect} />
      {loading ? (
         <ReactLoading type="bars" color="blue" height={200} width={80} />
      ) : (
        <Container  selectedAuthor={selectedAuthor} quotes={quotes} onDelete={handleDelete} />
      )}
    </>
  );
}

export default Home;

