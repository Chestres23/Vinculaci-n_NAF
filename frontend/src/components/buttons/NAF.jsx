import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptop, FaUsersCog, FaChartLine } from 'react-icons/fa';
import fondo5 from '../../assets/images/fondo5.png';
import NAFE from '../../assets/images/ejemNAF.jpg';

const NAF = () => {
  return (
    <section
      className="py-4 px-6 flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo5})`,
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
        <h1 className="text-4xl font-extrabold text-center text-green-900 mb-8">
          Bienvenidos al NAF
        </h1>

        <p className="text-gray-800 text-lg text-justify">
          Los NAF son centros de información tributaria y contable en los que los estudiantes de Contabilidad y Auditoría de la Universidad de las Fuerzas Armadas ESPE brindan atención gratuita a las personas naturales no obligadas a llevar contabilidad y microempresarios, bajo la supervisión de docentes universitarios.
        </p>

        <p className="text-gray-800 text-lg text-justify">
          La comunidad se beneficia directamente al recibir información contable y tributaria indispensable para el desarrollo eficiente y oportuno de las actividades económicas y el cumplimiento voluntario de las obligaciones tributarias. Adicionalmente, los núcleos permiten a los estudiantes cumplir con su vinculación con la sociedad y potencializar sus habilidades de comunicación y de servicio al cliente.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-center mt-8">
          <div className="p-6 border rounded-xl bg-white hover:shadow-xl transition">
            <FaLaptop className="text-5xl text-green-700 mx-auto mb-4" />
            <h3 className="font-bold text-xl">Atención Virtual y Presencial</h3>
            <p className="text-sm text-gray-600">
              Asesoría contable por nuestros estudiantes supervisados, vía online o en la ESPE.
            </p>
          </div>

          <div className="p-6 border rounded-xl bg-white hover:shadow-xl transition">
            <FaUsersCog className="text-5xl text-green-700 mx-auto mb-4" />
            <h3 className="font-bold text-xl">Interacción y Formación</h3>
            <p className="text-sm text-gray-600">
              Promovemos la cooperación entre SRI, universidad y sociedad.
            </p>
          </div>

          <div className="p-6 border rounded-xl bg-white hover:shadow-xl transition">
            <FaChartLine className="text-5xl text-green-700 mx-auto mb-4" />
            <h3 className="font-bold text-xl">Conciencia Tributaria</h3>
            <p className="text-sm text-gray-600">
              Fortalecemos la cultura tributaria y el compromiso ciudadano con el país.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">
            ¿Quiénes componen la NAF?
          </h2>
          <img
            src={NAFE}
            alt="Comunidad NAF"
            className="rounded-xl shadow-lg mx-auto max-w-full h-auto"
          />
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="/docs/convenio-naf-sangolqui.pdf"
            download
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-xl shadow transition-all duration-300"
          >
            Descargar Convenio ESPE - SRI ~ Matriz Sangolquí
          </a>

          <a
            href="/docs/convenio-naf-latacunga.pdf"
            download
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-xl shadow transition-all duration-300"
          >
            Descargar Convenio ESPE - SRI ~ Latacunga
          </a>
        </div>

      </motion.div>
    </section>
  );
};

export default NAF;