import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import fondo4 from "../../assets/images/fondo4.jpg";
import { useNavigate } from "react-router-dom";

const Boletines = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [boletines, setBoletines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/boletines/ver")
      .then((res) => res.json())
      .then(setBoletines)
      .catch((err) => console.error("Error al obtener boletines", err));
  }, []);

  return (
    <main
      className="py-16 px-6 min-h-screen flex flex-col items-center justify-start relative"
      style={{
        backgroundImage: `url(${fondo4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`w-full ${!user ? "blur-sm select-none pointer-events-none" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl"
        >
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-4 lg:text-4xl">
              Boletines Contables
            </h2>
            {userData && (
              <p className="text-center text-gray-700 text-lg">
                Bienvenido/a, <strong>{userData.nombre}</strong>
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {boletines.map((boletin) => (
              <div
                key={boletin.Id}
                className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {boletin.Titulo}
                  </h3>
                  <p className="text-gray-700 mb-2">{boletin.Descripcion}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Publicado: {boletin.FechaPublicacion?.split("T")[0]}
                  </p>
                </div>
                <a
                href={`http://localhost:3001${boletin.RutaPdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-center text-sm"
                >
                Ver PDF
                </a>


              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {!user && (
  <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white p-8 rounded-xl shadow-xl text-center space-y-4 max-w-md"
    >
      <h2 className="text-2xl font-bold text-red-700">Acceso restringido</h2>
      <p className="text-gray-700">
        Para acceder a los boletines contables necesitas iniciar sesión o registrarte.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Registrarse
        </button>
      </div>
    </motion.div>
  </div>
)}

    </main>
  );
};

export default Boletines;
