import React from 'react';
import '../App.css';

import fondo from '../assets/fondo.jpg';
import compu from '../assets/computadora.png'; 

function MainContent() {
  return (
    <main className="main" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="welcome-container">
        <h2 className="subtitle">Bienvenidos al Núcleo de Apoyo Fiscal - ESPE</h2>
        <div className="content-box">
          <img src={compu} alt="Logo NAF ESPE" className="computer" />
          <div className="text-box">
            <p>
              El NAF ESPE es una iniciativa académica que ofrece orientación gratuita sobre temas contables y tributarios. 
              Nuestro objetivo es contribuir con la sociedad brindando apoyo profesional desde la formación estudiantil.
            </p>
            <p>
              Aquí encontrarás recursos informativos, boletines actualizados, acceso a seminarios, asesorías y mucho más. 
              ¡Gracias por visitarnos y ser parte de esta comunidad!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
