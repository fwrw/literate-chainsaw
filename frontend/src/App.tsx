import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

import { Home, Login, Register, About } from './pages';
import Tasks from './pages/userPages/Tasks/Tasks';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
