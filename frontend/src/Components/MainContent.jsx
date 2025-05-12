import React from 'react';
import '../App.css';

import fondo from '../assets/fondo.jpg';
import compu from '../assets/computadora.png';


function MainContent() {
  return (
    <main className="main" style={{ backgroundImage: `url(${fondo})` }}>
      <h2 className="subtitle">ARTÍCULOS DE INTERÉS CONTABLE</h2>
      <div className="content-box">
        <img src={compu} alt="Computadora" className="computer" />
        <div className="text-box">
          <p>Regístrate totalmente gratis para acceder a cientos de boletines actualizados de temas contables y tributarios</p>
          <button>ACCEDER</button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
