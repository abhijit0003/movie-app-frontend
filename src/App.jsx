import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add" element={<AddMovie />} />
        <Route path="/admin/edit/:id" element={<EditMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
