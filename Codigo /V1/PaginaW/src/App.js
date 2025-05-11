import React from 'react';
import './App.css';
import Header from './Components/Header';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Servicios from './Components/Bottons/Servicios'; // etc.

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/servicios" element={<Servicios />} />
          {/* Agrega las demás rutas */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;