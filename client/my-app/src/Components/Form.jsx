import React, { useState } from 'react';
import axios from 'axios';
import './Forms.css'; 
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';


const AddQuoteForm = () => {
  const [formData, setFormData] = useState({
    content: "",
    speaker: "",
    authorName: "",
    authorBirthdate: "",
    profileimg: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dr-quotes.onrender.com/api/add-quotes', formData);
      setSuccessMessage("Quote added successfully!");
      setErrorMessage(""); // Reset error message if there was any
      setFormData({
        content: "",
        speaker: "",
        authorName: "",
        authorBirthdate: "",
        profileimg: ""
      });
    } catch (error) {
      console.error('Error adding quote:', error);
      setErrorMessage("Error adding quote. Please try again.");
      setSuccessMessage(""); // Reset success message if there was any
    }
  };

  return (
    <div className="container">
      <Link to={"/"}><button className='exit'>X</button></Link>
      <h2 className='nquote'>Add New Quote</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Content:
          <input type="text" name="content" value={formData.content} onChange={handleChange} />
        </label>
        <label>
          Speaker:
          <input type="text" name="speaker" value={formData.speaker} onChange={handleChange} />
        </label>
        <label>
          Author Name:
          <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} />
        </label>
        <label>
          Author Birthdate:
          <input type="text" name="authorBirthdate" value={formData.authorBirthdate} onChange={handleChange} />
        </label>
        <label>
          Profile Image:
          <input type="text" name="profileimg" value={formData.profileimg} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuoteForm;
