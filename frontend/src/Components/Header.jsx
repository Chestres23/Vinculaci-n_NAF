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
        <h1 className="title">NÚCLEO DE APOYO CONTABLE Y FISCAL - ESPE</h1>
        <img src={nafLogo} alt="NAF Logo" className="logo logo-right" />
      </div>

      <nav className="navbar">
        <Link to="/quienes">¿Quiénes Somos?</Link>         {/* Primero: presentación de la entidad */}
        <Link to="/servicios">Servicios</Link>             {/* Segundo: qué ofrecen */}
        <Link to="/biblioteca">Biblioteca</Link>           {/* Tercero: recursos disponibles */}
        <Link to="/boletines">Boletines Contables</Link>   {/* Cuarto: contenidos periódicos */}
        <Link to="/naf">NAF</Link>                         {/* Último: detalles del proyecto */}
      </nav>
    </header>
  );
}

export default Header;
