import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/escudo.png';
import nafLogo from '../assets/naf.jpg';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <img src={logo} alt="Escudo" className="logo logo-left" />
        <h1 className="title">NÚCLEO DE APOYO CONTABLE Y FISCAL - ESPE</h1>
        <img src={nafLogo} alt="NAF Logo" className="logo logo-right" />
      </div>

      {/* Botón hamburguesa visible solo en móvil */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </div>

      {/* Menú responsive */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <Link to="/quienes" onClick={closeMenu}>¿Quiénes Somos?</Link>
        <Link to="/servicios" onClick={closeMenu}>Servicios</Link>
        <Link to="/biblioteca" onClick={closeMenu}>Biblioteca</Link>
        <Link to="/boletines" onClick={closeMenu}>Boletines Contables</Link>
        <Link to="/naf" onClick={closeMenu}>NAF</Link>
        <Link to="/Galeria" onClick={closeMenu}>Galería</Link>
      </nav>
    </header>
  );
}

export default Header;
