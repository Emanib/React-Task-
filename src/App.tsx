import React from 'react';
import Login from './pages/Login'
import Admin from './pages/Admin'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter >
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
