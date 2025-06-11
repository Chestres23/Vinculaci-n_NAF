import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import fondo from '../../assets/images/fondo2.jpg';
import compu from '../../assets/images/computadora.png';

function MainContent() {
  const [index, setIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const { user, rol } = useAuth();
  

  const slides = [
    {
      title: 'Bienvenidos al Núcleo de Apoyo Fiscal - ESPE',
      content: `El NAF ESPE ofrece orientación gratuita sobre temas contables y tributarios. 
                Nuestro objetivo es contribuir con la sociedad brindando apoyo profesional desde la formación estudiantil.`,
      extra: `Aquí encontrarás recursos informativos, boletines actualizados, acceso a seminarios, asesorías y mucho más.`,
      showButton: false,
    },
    {
      title: 'Consultoría y Asesoría Virtual Gratuita',
      content: `Ahora puedes acceder a nuestras asesorías de forma 100% virtual desde la comodidad de tu hogar.`,
      extra: `Haz clic en el siguiente botón para solicitar tu asesoría personalizada.`,
      showButton: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleServiciosClick = () => {
  if (!user) {
    navigate('/servicios'); // versión pública
  } else {
    // Redirigir al dashboard correspondiente
    if (rol === 1) navigate('/dashboard-admin/servicios');
    else if (rol === 2) navigate('/dashboard-editor/servicios');
    else if (rol === 3) navigate('/dashboard-usuario/servicios');
    else navigate('/'); // fallback en caso de rol no definido
  }
};

  const goToNext = () => setIndex((index + 1) % slides.length);
  const goToPrev = () => setIndex((index - 1 + slides.length) % slides.length);
  const currentSlide = slides[index];

  return (
    <main
      className="main py-4 px-6 flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full"
      >
        <div className="container mx-auto px-4 relative min-h-[400px]">
          <button
            onClick={goToPrev}
            className="hidden sm:block absolute left-16 top-1/2 transform -translate-y-1/2 z-10 bg-white text-green-800 hover:text-white hover:bg-green-800 transition p-2 rounded-full shadow-lg"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={goToNext}
            className="hidden sm:block absolute right-16 top-1/2 transform -translate-y-1/2 z-10 bg-white text-green-800 hover:text-white hover:bg-green-800 transition p-2 rounded-full shadow-lg"
          >
            <ChevronRight size={28} />
          </button>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-screen-md mx-auto flex flex-col items-center p-4 sm:p-6 md:p-10 text-center">
            <img
              src={compu}
              alt="Logo NAF ESPE"
              className="w-40 sm:w-48 md:w-60 h-auto object-contain mb-6"
            />
            <div className="text-gray-800 transition-all duration-700 ease-in-out">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
                {currentSlide.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-2">
                {currentSlide.content}
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                {currentSlide.extra}
              </p>

              {currentSlide.showButton && (
                <button
                  onClick={handleServiciosClick}
                  className="mt-4 px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-xl transition-all"
                >
                  Ir a Servicios
                </button>
              )}

              {showWarning && (
                <p className="mt-4 text-red-700 font-semibold">
                  Debes iniciar sesión para acceder a los servicios.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

export default MainContent;
