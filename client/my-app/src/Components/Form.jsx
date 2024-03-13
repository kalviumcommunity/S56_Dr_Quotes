import React, { useState } from 'react';
import axios from 'axios';
import './Forms.css'; 
import { Link } from 'react-router-dom';


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
      const response = await axios.post('https://dr-quotes.onrender.com/api/add-quotes', dataToSend);
      if (response.status === 200) {
        setSuccessMessage("Quote added successfully!");
        setErrorMessage("");
        setFormData({
          content: "",
          speaker: "",
          authorName: "",
          authorBirthdate: "",
          profileimg: ""
        });
      } else {
        throw new Error("Failed to add quote. Please try again.");
      }
    } catch (error) {
      console.error('Error adding quote:', error);
      setErrorMessage("Error adding quote. Please try again.");
      setSuccessMessage("");
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
          <input type="text" required name="content" value={formData.content} onChange={handleChange} />
        </label>
        <label>
          Speaker:
          <input type="text" required name="speaker" value={formData.speaker} onChange={handleChange} />
        </label>
        <label>
          User Name:
          <input type="text" required name="authorName" value={formData.authorName} onChange={handleChange} />
        </label>
        <label>
          User Birthdate:
          <input type="text" required name="authorBirthdate" value={formData.authorBirthdate} onChange={handleChange} />
        </label>
        <label>
          Profile Image:
          <input type="text" required name="profileimg" value={formData.profileimg} onChange={handleChange} />
        </label>
        
        <button type="submit">Submit</button>
       

       
      </form>
    </div>
  );
};

export default AddQuoteForm;
