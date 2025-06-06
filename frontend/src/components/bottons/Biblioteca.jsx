import React from "react";
import { motion } from "framer-motion";
import fondoBiblioteca from "../../assets/images/biblioteca.jpg";

const librosData = [
  {
    id: 1,
    titulo: "Contabilidad Básica para Emprendedores",
    autor: "Dra. Ana Torres",
    descripcion: "Guía introductoria para entender los principios contables aplicados a pequeños negocios.",
    fecha: "2024-12-01",
    archivo: "/libros/contabilidad-basica.pdf",
  },
  {
    id: 2,
    titulo: "Impuestos en el Ecuador",
    autor: "Ing. Marco Rivas",
    descripcion: "Análisis actualizado sobre el régimen tributario y sus reformas.",
    fecha: "2025-01-10",
    archivo: "/libros/impuestos-ecuador.pdf",
  },
  {
    id: 3,
    titulo: "Educación Financiera para Jóvenes",
    autor: "Lcda. Paula Almeida",
    descripcion: "Conceptos clave sobre ahorro, inversión y uso responsable del dinero.",
    fecha: "2025-03-15",
    archivo: "/libros/educacion-financiera.pdf",
  },
];

const Biblioteca = () => {
  return (
    <main
      className="py-16 px-6 min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondoBiblioteca})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Contenedor principal con animación */}
      <motion.section
        className="w-full max-w-7xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">
          Biblioteca Digital
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Accede a nuestros libros y recursos digitales de manera libre y gratuita.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {librosData.map((libro) => (
            <div
              key={libro.id}
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {libro.titulo}
                </h3>
                <p className="text-gray-600 italic mb-1">Autor: {libro.autor}</p>
                <p className="text-sm text-gray-500 mb-4">Publicado: {libro.fecha}</p>
                <p className="text-gray-700 mb-4">{libro.descripcion}</p>
              </div>
              <a
                href={libro.archivo}
                download
                className="mt-auto inline-block bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-green-600 text-center"
              >
                Descargar PDF
              </a>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
};

export default Biblioteca;
