import React from 'react';
import { FaLaptop, FaUsersCog, FaChartLine } from 'react-icons/fa';

const NAF = () => {
  return (
    <section className="bg-gradient-to-tr from-gray-100 to-blue-50 py-16 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl p-10 space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-900">¿Qué es el NAF?</h1>
        <p className="text-gray-700 text-lg text-justify">
          El Núcleo de Apoyo Contable y Fiscal (NAF) de la Universidad de las Fuerzas Armadas ESPE es un espacio donde estudiantes capacitados ofrecen asesoría contable y tributaria gratuita a la comunidad, especialmente a personas naturales no obligadas a llevar contabilidad.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-center mt-8">
          <div className="p-6 border rounded-xl bg-white hover:shadow-xl transition">
            <FaLaptop className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl">Atención Virtual y Presencial</h3>
            <p className="text-sm text-gray-600">Asesoría contable por nuestros estudiantes supervisados, vía online o en la ESPE.</p>
          </div>

          <div className="p-6 border rounded-xl bg-white hover:shadow-xl transition">
            <FaUsersCog className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl">Interacción y Formación</h3>
            <p className="text-sm text-gray-600">Promovemos la cooperación entre SRI, universidad y sociedad.</p>
          </div>

          <div className="p-6 border rounded-xl bg-white hover:shadow-xl transition">
            <FaChartLine className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl">Conciencia Tributaria</h3>
            <p className="text-sm text-gray-600">Fortalecemos la cultura tributaria y el compromiso ciudadano con el país.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NAF;
