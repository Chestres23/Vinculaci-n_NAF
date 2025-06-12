import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fondoBiblioteca from "../../assets/images/biblioteca.jpg";

const Biblioteca = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/libros/ver")
      .then((res) => res.json())
      .then(setLibros)
      .catch((err) => console.error("Error al obtener libros:", err));
  }, []);

  return (
    <main
      className="py-4 px-6 flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondoBiblioteca})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.section
        className="w-full max-w-7xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">
          Biblioteca Digital
        </h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {libros.map((libro) => (
            <div
              key={libro.Id}
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{libro.Titulo}</h3>
                <p className="text-gray-600 italic mb-1">Autor: {libro.Autor}</p>
                <p className="text-sm text-gray-500 mb-1">Publicado: {libro.FechaPublicacion?.split("T")[0]}</p>
                <p className="text-sm text-gray-500 mb-2">Tipo: {libro.Tipo}</p>
                <p className="text-gray-700 mb-4">{libro.Descripcion}</p>
              </div>
              <a
  href={libro.RutaPdf}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-auto bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-green-600 text-center"
>
  Ver PDF
</a>

            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
};

export default Biblioteca;
