import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Form from './Pages/Form'; 
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
     <Route path="/quote-builder" element={<Form />} />
     <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
