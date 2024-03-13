import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Form from './Pages/Form'; 
import Home from './Pages/Home';
import UpdateForm from './Components/UpdateForm';
import LoginPage from './Pages/LoginPage';

function App() {
  
  return (
    <Routes>
        <Route path="/Login" element={<LoginPage/>} />
     <Route path="/UpdateForm/:id" element={<UpdateForm/>} />
     <Route path="/quote-builder" element={<Form/>} />
     <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
