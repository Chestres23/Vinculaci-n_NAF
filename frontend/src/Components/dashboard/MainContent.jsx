import React from 'react';
import '../../App.css';
import { motion } from 'framer-motion';

import fondo from '../../assets/images/fondo2.jpg';
import compu from '../../assets/images/computadora.png';

function MainContent() {
  return (
    <main
      className="py-16 px-6 min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
      >
      <motion.div
        className="w-full max-w-6xl bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
  
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row items-center p-8">
        <img
          src={compu}
          alt="Logo NAF ESPE"
          className="w-48 h-48 object-contain mx-auto mb-6 md:mb-0 md:mr-8"
        />
        <div className="text-gray-800">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4 text-center md:text-left">
            Bienvenidos al Núcleo de Apoyo Fiscal - ESPE
          </h2>
          <p className="text-lg leading-relaxed mb-2">
            El NAF ESPE es una iniciativa académica que ofrece orientación gratuita sobre temas contables y tributarios. Nuestro objetivo es contribuir con la sociedad brindando apoyo profesional desde la formación estudiantil.
          </p>
          <p className="text-lg leading-relaxed">
            Aquí encontrarás recursos informativos, boletines actualizados, acceso a seminarios, asesorías y mucho más. ¡Gracias por visitarnos y ser parte de esta comunidad!
          </p>
        </div>
      </div>
      </motion.div>
    </main>
  );
}

export default MainContent;
