import React from 'react';
import { FaUniversity, FaBullseye, FaEye, FaHandshake, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebook, FaInstagram } from 'react-icons/fa';

const iconClass = "text-4xl md:text-5xl text-blue-700 min-w-[40px]";

const Quienes = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 animate-fade-in space-y-10">
        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-8">¿Quiénes Somos?</h1>

        {/* ¿Qué es el NAF? */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaUniversity className={`${iconClass} text-blue-700`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">¿Qué es el NAF?</h2>
            <p className="text-gray-700 text-justify">
              El NAF – ESPE es un centro de atención gratuito dirigido por estudiantes del DCEA, supervisados por docentes, que brindan asesoría contable y tributaria a personas naturales no obligadas a llevar contabilidad, fomentando la conciencia tributaria y el vínculo entre universidad, sociedad y administración fiscal.
            </p>
          </div>
        </div>

        {/* Misión */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaBullseye className={`${iconClass} text-green-600`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Misión</h2>
            <p className="text-gray-700 text-justify">
              Formar estudiantes integrales a través de asesorías tributarias gratuitas, fortaleciendo sus competencias profesionales y contribuyendo a la comunidad.
            </p>
          </div>
        </div>

        {/* Visión */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaEye className={`${iconClass} text-purple-600`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Visión</h2>
            <p className="text-gray-700 text-justify">
              Ser un referente nacional en educación tributaria, asesoría contable y compromiso social universitario.
            </p>
          </div>
        </div>

        {/* Metas */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaBullseye className={`${iconClass} text-yellow-500`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Metas</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Aumentar presencia en redes en un 20% cada semestre.</li>
              <li>Realizar campañas de concienciación tributaria.</li>
              <li>Ofrecer 3 capacitaciones virtuales por semestre.</li>
              <li>Atender 4.000 contribuyentes semestralmente.</li>
              <li>Desarrollar materiales didácticos para redes y formación.</li>
              <li>Brindar asesorías académicas a estudiantes de niveles iniciales.</li>
            </ul>
          </div>
        </div>

        {/* Impacto */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaHandshake className={`${iconClass} text-orange-500`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Impacto</h2>
            <p className="text-gray-700 text-justify">
              El NAF genera conocimiento tributario y contable en la comunidad, promueve una cultura de cumplimiento fiscal y fortalece la participación social desde la universidad. Su impacto se refleja en más de 5.000 personas atendidas cada semestre y su vigencia se mantiene hasta enero de 2028.
            </p>
          </div>
        </div>

        {/* Colaboración */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaUniversity className={`${iconClass} text-indigo-500`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Colaboración con el SRI</h2>
            <p className="text-gray-700 text-justify">
              El proyecto se desarrolla en alianza con el Servicio de Rentas Internas, reforzando el vínculo entre el Estado, la universidad y la ciudadanía, y contribuyendo a una sociedad más consciente y justa.
            </p>
          </div>
        </div>

        {/* Contacto */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <FaMapMarkerAlt className={`${iconClass} text-red-500`} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Ubicación y Contacto</h2>
            <div className="text-gray-700 space-y-1">
              <p>📍 Atención: ESPE Matriz e Islas SRI Zona 9</p>
              <p className="flex items-center gap-2"><FaEnvelope className="text-blue-700" /> naf@espe.edu.ec</p>
              <p className="flex items-center gap-2"><FaPhoneAlt className="text-green-600" /> 0963498517</p>
              <p className="flex items-center gap-2"><FaFacebook className="text-blue-800" /> <a href="https://www.facebook.com/nafespe" className="text-blue-600">@nafespe</a></p>
              <p className="flex items-center gap-2"><FaInstagram className="text-pink-500" /> <a href="https://www.instagram.com/nafespe" className="text-blue-600">@nafespe</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quienes;
