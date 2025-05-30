import React from 'react';
import './App.css';
import Header from './Components/Header';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Servicios from './Components/Bottons/Servicios'; // etc.
import NAF from './Components/Bottons/NAF'; // etc.
import Biblioteca from './Components/Bottons/Biblioteca'; // etc.
import Boletines from './Components/Bottons/Boletines'; // etc.
import Quienes from './Components/Bottons/Quienes'; // etc.
import Galeria from './Components/Bottons/Galeria'; // etc.


function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/naf" element={<NAF />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/boletines" element={<Boletines />} />
            <Route path="/quienes" element={<Quienes />} />
            <Route path="/galeria" element={<Galeria/>} />
            {/* Más rutas si deseas */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;