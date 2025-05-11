import React from 'react';
import '../App.css';
import logo from '../assets/escudo.png';
import nafLogo from '../assets/naf.jpg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <img src={logo} alt="Escudo" className="logo logo-left" />
        <h1 className="title">NÚCLEO DE APOYO CONTABLE Y FISCAL</h1>
        <img src={nafLogo} alt="NAF Logo" className="logo logo-right" />
      </div>

      {/* Botones debajo del título */}
      <nav className="navbar">
        <Link to="/servicios">Servicios</Link>
        <Link to="/naf">NAF</Link>
        <Link to="/proyecto">Proyecto de Vinculación</Link>
        <Link to="/biblioteca">Biblioteca</Link>
        <Link to="/boletines">Boletines Contables</Link>
        <Link to="/quienes">Quienes Somos</Link>
      </nav>
    </header>
  );
}

export default Header;
