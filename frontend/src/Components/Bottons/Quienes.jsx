import React from 'react';
import {
  FaUniversity, FaBullseye, FaEye, FaHandshake,
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt,
  FaFacebook, FaInstagram, FaUserTie,
  FaLightbulb, FaBook, FaRocket,
  FaVenusMars,
  FaAsterisk,
  FaAssistiveListeningSystems,
  FaAccessibleIcon,
  FaUniversalAccess,
  FaCheck,
  FaCheckDouble
} from 'react-icons/fa';

import inge from '../../assets/inge.jpg';
import fondo2 from '../../assets/fondo2.jpg';



const iconClass = "text-4xl md:text-5xl text-blue-700 min-w-[40px]";

const Quienes = () => {
  return (
    <section
      className="py-4 px-6 flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-10 animate-fade-in space-y-10 backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold text-center text-green-900 mb-8">¿Quiénes Somos?</h1>
          <div className="flex flex-col md:flex-row items-start gap-6"><div>
            <p className="text-gray-700 text-justify">
              La Universidad de las Fuerzas Armadas ESPE, a través de la Carrera de Contabilidad y Auditoría y la colaboración del Servicio de Rentas Internas SRI, ha generado un Núcleo de Apoyo Contable y Financiero (NAF) con el objetivo de fortalecer el conocimiento de los derechos de los contribuyentes en el Ecuador
            </p>
            <br></br>
            <p className="text-gray-700 text-justify">
              El NAF está constituido con la participación de docentes universitarios, así como la colaboración de los estudiantes de la Carrera de Contabilidad y Auditoria para garantizar una atención de calidad hacia los contribuyentes en diversos temas contables y tributarios. El proyecto permitirá que los estudiantes de la carrera de Contabilidad y Auditoría pongan en práctica los conocimientos adquiridos en sus estudios y cumplan con sus prácticas de servicio a la comunidad.
            </p>
          </div>

          </div>
          {/* Misión */}
          <h1 className="text-4xl font-extrabold text-center text-green-900 mb-8">Plan Estratégico</h1>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <FaBullseye className="text-green-500 text-6xl" />
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Misión</h2>
              <p className="text-gray-700 text-justify">
                Brindar un servicio a la ciudadanía de una forma gratuita, en temas relacionados a contabilidad y tributación a través de asesorías y capacitaciones elaboradas por estudiantes de Contabilidad y Auditoría de la ESPE.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <FaEye className="text-purple-600 text-4xl md:text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Visión</h2>
              <p className="text-gray-700 text-justify">
                Ser un referente nacional en educación tributaria, asesoría contable y compromiso social universitario.
              </p>
            </div>
          </div>

          {/* Metas */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <FaBullseye className="text-yellow-500 text-4xl" />
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
            <FaHandshake className="text-orange-500 text-4xl md:text-8xl" />
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Impacto</h2>
              <p className="text-gray-700 text-justify">
                El NAF genera conocimiento tributario y contable en la comunidad, promueve una cultura de cumplimiento fiscal y fortalece la participación social desde la universidad. Su impacto se refleja en más de 5.000 personas atendidas cada semestre y su vigencia se mantiene hasta enero de 2028.
              </p>
            </div>
          </div>

          {/* Colaboración */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <FaUniversity className="text-indigo-500 text-4xl md:text-6xl" />
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Colaboración con el SRI</h2>
              <p className="text-gray-700 text-justify">
                El proyecto se desarrolla en alianza con el Servicio de Rentas Internas, reforzando el vínculo entre el Estado, la universidad y la ciudadanía, y contribuyendo a una sociedad más consciente y justa.
              </p>
            </div>
          </div>


          {/* Coordinación */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-800 text-center mb-4">Coordinación</h2>

            <div className="flex flex-col items-center text-center">
              <img
                src={inge}
                alt="Director del Proyecto"
                className="w-60 h-auto rounded-full shadow-2xl mb-4 border-4 border-blue-700"
              />

              <p className="text-xl font-bold text-blue-900">Director del Proyecto</p>
              <p className="text-lg text-gray-700">
                <strong>CPA. Ing. Carlos Alfonso Ramírez Lafuente, MBA</strong>
              </p>
            </div>
          </div>


          {/* Propuesta de Valor */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-800 text-center mb-4">Propuesta de valor</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <FaLightbulb className="text-yellow-500 text-5xl" />
                <p className="text-lg text-gray-700 font-medium">Adquiere atención con facilidad</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FaBook className="text-green-600 text-5xl" />
                <p className="text-lg text-gray-700 font-medium">Fortalece tu conocimiento</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FaRocket className="text-blue-700 text-5xl" />
                <p className="text-lg text-gray-700 font-medium">Aprende y actualízate con la NAF</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FaUserTie className="text-purple-600 text-5xl" />
                <p className="text-lg text-gray-700 font-medium">Servicio totalmente gratuito</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FaUniversalAccess className="text-pink-500 text-5xl" />
                <p className="text-lg text-gray-700 font-medium">Asistencia para los contribuyes</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FaCheckDouble className="text-red-600 text-5xl" />
                <p className="text-lg text-gray-700 font-medium">Atención de calidad</p>
              </div>
            </div>
          </div>

          {/* Descarga del perfil del proyecto */}
          <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-green-900 mb-2">Descargar Perfil del Proyecto</h2>
            <p className="text-gray-700 mb-4 max-w-2xl">
              Conoce a fondo el alcance, objetivos y resultados esperados del Núcleo de Apoyo Fiscal (NAF) descargando el perfil oficial del proyecto en formato PDF.
            </p>
            <a
              href="/documentos/perfil_proyecto_naf.pdf"
              download
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Descargar PDF
            </a>
          </div>


          {/* Contacto */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <FaMapMarkerAlt className="text-red-500 text-4xl md:text-5xl" />
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
      </div>
    </section>
  );
};

export default Quienes;
