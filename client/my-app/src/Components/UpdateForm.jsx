import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Update.css'; 
import Nav from '../Components/Nav';
import { Link, useParams } from 'react-router-dom';

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    content: "",
    speaker: "",
    authorName: "",
    authorBirthdate: "",
    profileimg: ""
  });

  const { id } = useParams(); // Extracting quote ID from URL

  useEffect(() => {
    // Fetching the quote data using the extracted ID
    const fetchQuote = async () => {
      try {
        const response = await axios.get(`https://dr-quotes.onrender.com/api/quotes/${id}`); // Use the correct URL for your backend
        const quoteData = response.data;
        setFormData({
          content: quoteData.content || "",
          speaker: quoteData.speaker || "",
          authorName: quoteData.author?.name || "",
          authorBirthdate: quoteData.author?.birthdate || "",
          profileimg: quoteData.author?.profileimg || ""
        });
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, [id]); // Fetch quote data whenever the ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error('Quote ID is undefined.');
      return;
    }
  
    const dataToSend = {
      content: formData.content,
      speaker: formData.speaker,
      author: {
        name: formData.authorName,
        birthdate: formData.authorBirthdate,
        profileimg: formData.profileimg
      }
    };
  
    try {
      const response = await axios.put(`https://dr-quotes.onrender.com/api/quotes/${id}`, dataToSend); // Use the correct URL for your backend
      if (response.status === 200) {
         alert('Quote updated successfully!');
        console.log('Quote updated successfully.');
      } else {
         alert('Failed to update quote. Please try again.');
        throw new Error("Failed to update quote. Please try again.");
      }
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  return (
    <>
      <Nav/>
      <div className="container">
        <Link to={"/"}><button className='exit'>X</button></Link>
        <h2>Update Quote</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <input type="text" required name="content" value={formData.content} onChange={handleChange} />
          </label>
          <label>
            Speaker:
            <input type="text" required name="speaker" value={formData.speaker} onChange={handleChange} />
          </label>
          <label>
            Author Name:
            <input type="text" required name="authorName" value={formData.authorName} onChange={handleChange} />
          </label>
          <label>
            Author Birthdate:
            <input type="text" required name="authorBirthdate" value={formData.authorBirthdate} onChange={handleChange} />
          </label>
          <label>
            Profile Image:
            <input type="text" required name="profileimg" value={formData.profileimg} onChange={handleChange} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateForm;
