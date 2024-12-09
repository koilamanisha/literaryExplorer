import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';

const ProjectRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<App />} />
  </Routes>
);

export default ProjectRoutes;