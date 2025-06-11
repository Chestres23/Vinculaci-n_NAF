import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../App.css";
import { motion } from 'framer-motion';

import fondo7 from "../../assets/images/fondo2.jpg";
import gale1 from '../../assets/images/gale1.jpg';
import gale2 from '../../assets/images/gale2.jpg';
import gale3 from '../../assets/images/gale3.jpg';
import gale4 from '../../assets/images/gale4.jpg';
import gale5 from '../../assets/images/gale5.jpg';
import gale6 from '../../assets/images/gale6.jpeg';

const imagenes = [
  { src: gale3, alt: "Imagen 3" },
  { src: gale2, alt: "Imagen 2" },
  { src: gale1, alt: "Imagen 1" },
  { src: gale4, alt: "Imagen 4" },
  { src: gale6, alt: "Imagen 6" },
  { src: gale5, alt: "Imagen 5" },
];

const Galeria = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${fondo7})`,
        backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Encabezado */}
        <div className="text-center mb-6">
          <div className="bg-green-800 text-white py-3 px-6 rounded-xl inline-block w-full sm:w-auto max-w-full">
            <h2 className="text-lg sm:text-2xl font-bold">Nuestra Galería</h2>
            <p className="text-sm sm:text-base">
              Momentos más memorables capturados por nuestra comunidad.
            </p>
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Flechas */}
          <button
            onClick={() => scroll("left")}
            className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-800 text-white hover:text-green-800 hover:bg-white transition p-2 rounded-full shadow-lg"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-800 text-white hover:text-green-800 hover:bg-white transition p-2 rounded-full shadow-lg"
          >
            <ChevronRight size={28} />
          </button>

          {/* Galería horizontal */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-2 py-6 sm:py-8 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {imagenes.map((img, index) => (
              <div
                key={index}
                className="min-w-[300px] sm:min-w-[340px] md:min-w-[400px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] bg-gray-800 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-300 snap-center"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </main>

  );
};

export default Galeria;