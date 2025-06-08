import React from "react";
import { motion } from "framer-motion";
import fondoBiblioteca from "../../assets/biblioteca.jpg";

const librosData = [
  {
    id: 1,
    titulo: "Normas de Contabilidad NIIF® Ilustradas 2023 – Parte A",
    autor: "Consejo de Normas Internacionales de Contabilidad (IASB)",
    descripcion: "Contiene las Normas requeridas y el Marco Conceptual para la Información Financiera, incluyendo las modificaciones vigentes hasta el 31 de diciembre de 2022. Esta edición es ideal para quienes deseen trabajar con las Normas de Contabilidad vigentes y aquellas que entrarán en vigor en una fecha futura.",
    fecha: "1 de Enero de 2023",
    tipodelibro: "Contable",
    archivo: "/libros/niif-2023-parte-a.pdf"
  },

  {
    id: 2,
    titulo: "Normas de Contabilidad NIIF® Ilustradas 2023 – Parte B",
    autor: "Consejo de Normas Internacionales de Contabilidad (IASB)",
    descripcion: "Incluye guías complementarias y documentos de práctica de las NIIF, proporcionando referencias cruzadas, notas explicativas y decisiones del Comité de Interpretaciones para facilitar la aplicación de las Normas de Contabilidad.",
    fecha: "1 de Enero de 2023",
    tipodelibro: "Contable",
    archivo: "/libros/niif-2023-parte-b.pdf"
  },

  {
    id: 3,
    titulo: "Normas de Contabilidad NIIF® Ilustradas 2023 – Parte C",
    autor: "Consejo de Normas Internacionales de Contabilidad (IASB)",
    descripcion: "Contiene los fundamentos de las conclusiones de las Normas NIIF, ofreciendo una comprensión profunda de las decisiones tomadas en el desarrollo de las normas y su aplicación práctica.",
    fecha: "1 de enero de 2023",
    tipodelibro: "Contable",
    archivo: "/libros/niif-2023-parte-c.pdf"
  },

  {
    id: 4,
    titulo: "Adopción de las Normas Internacionales de Información Financiera (NIIF) 2023",
    autor: "Consejo técnico de Contabilidad Pública (CTCP)",
    descripcion: "Contiene orientaciones técnicas sobre la aplicación de las Normas Internacionales de Información Financiera (NIIF) para las Pymes",
    fecha: "31 de diciembre de 2023",
    tipodelibro: "Contable",
    archivo: "/libros/niif.pdf"
  },

  {
    id: 5,
    titulo: "Proyecto de Norma: Tercera edición de la NIIF para las PYMES",
    autor: "Consejo de Normas Internacionales de Contabilidad (IASB)",
    descripcion: "Edición de septiembre de 2022 del Proyecto de Norma que propone la tercera edición de la NIIF para las PYMES. Incluye fundamentos de las conclusiones, estados financieros ilustrativos y modificaciones alineadas con las NIIF completas. Cubre temas como instrumentos financieros, consolidación, ingresos, beneficios a empleados, medición del valor razonable y transición.",
    fecha: "1 de septiembre de 2022",
    tipodelibro: "Contable",
    archivo: "/libros/niif-pymes-2022-proyecto.pdf"
  },

  {
    id: 6,
    titulo: "El arte de no amargarse la vida",
    autor: "Rafael Santandreu",
    descripcion: "Guía de psicología cognitiva que ofrece herramientas prácticas y científicamente validadas para transformar el modo de pensar, reducir el malestar emocional y alcanzar una vida más serena, alegre y optimista.",
    fecha: "6 de septiembre de 2011",
    tipodelibro: "No contable",
    archivo: "/libros/el‑arte-de-no-amargarse-la-vida.pdf"
  }
];

const Biblioteca = () => {
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
                <p className="text-sm text-gray-500 mb-1">Publicado: {libro.fecha}</p>
                <p className="text-sm text-gray-500 mb-4">Tipo de libro: {libro.tipodelibro}</p>
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
