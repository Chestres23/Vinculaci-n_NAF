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
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${fondo7})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="w-full max-w-6xl bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        {/* Mensaje superior */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center px-4 py-4 bg-green-800/60 rounded-xl text-white max-w-3xl z-20">
          <h2 className="text-3xl font-bold">Nuestra Galería</h2>
          <p className="mt-2 text-lg font-light">
            Explora los momentos más memorables capturados por nuestra comunidad.
          </p>
        </div>



        {/* Flecha izquierda */}
        <button
          onMouseEnter={() => scroll("left")}
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Galería horizontal */}
        <div
          ref={scrollRef}
          className="mt-32 mb-12 flex space-x-6 overflow-x-scroll no-scrollbar px-4 py-6"
          style={{ scrollBehavior: "smooth" }}
        >
          {imagenes.map((img, index) => (
            <div
              key={index}
              className="min-w-[250px] h-[400px] bg-gray-800 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          onMouseEnter={() => scroll("right")}
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition"
        >
          <ChevronRight size={32} />
        </button>
      </motion.div>
    </div>
  );
};

export default Galeria;
