import React, { useState } from "react";
import fondo4 from '../../assets/fondo4.jpg';
import { motion } from "framer-motion";

const Boletines = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("login");
  const [loginData, setLoginData] = useState({ correo: "", password: "" });
  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    ciudad: "",
    nacimiento: "",
    password: "",
  });

  const boletinesData = [
    {
      id: 1,
      titulo: "Boletín Tributario Abril 2025",
      descripcion: "Resumen de reformas tributarias y obligaciones del mes.",
      fecha: "2025-04-10",
      archivo: "/boletines/boletin-abril-2025.pdf",
    },
    {
      id: 2,
      titulo: "Boletín Financiero Marzo 2025",
      descripcion: "Análisis financiero y tendencias del mercado.",
      fecha: "2025-03-15",
      archivo: "/boletines/boletin-marzo-2025.pdf",
    },
    {
      id: 3,
      titulo: "Guía Contable Febrero 2025",
      descripcion: "Guía práctica para la declaración de impuestos.",
      fecha: "2025-02-20",
      archivo: "/boletines/guia-febrero-2025.pdf",
    },
  ];

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setView("success");
  };

  return (

    <main
      className="py-4 px-6 flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo4})`, // corregido
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >

      {!isLoggedIn ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg transition-all duration-700 transform animate-slideUp">
            {view === "login" && (
              <>
                <h2 className="text-2xl font-extrabold text-center text-green-900 mb-8">Iniciar Sesión</h2>
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo electrónico"
                    value={loginData.correo}
                    onChange={handleLoginChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700"
                  >
                    Entrar
                  </button>
                </form>
                <p className="mt-4 text-center text-sm">
                  ¿Nuevo aquí?{" "}
                  <button
                    className="text-blue-700 underline"
                    onClick={() => setView("register")}
                  >
                    Registrarse
                  </button>
                </p>
              </>
            )}

            {view === "register" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-2xl font-extrabold text-center text-green-900 mb-8">Registro de Usuario</h2>
                  <form onSubmit={handleRegisterSubmit}>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={registerData.nombre}
                      onChange={handleRegisterChange}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="apellido"
                      placeholder="Apellido"
                      value={registerData.apellido}
                      onChange={handleRegisterChange}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <input
                      type="email"
                      name="correo"
                      placeholder="Correo electrónico"
                      value={registerData.correo}
                      onChange={handleRegisterChange}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="ciudad"
                      placeholder="Ciudad"
                      value={registerData.ciudad}
                      onChange={handleRegisterChange}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <input
                      type="date"
                      name="nacimiento"
                      value={registerData.nacimiento}
                      onChange={handleRegisterChange}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />

                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña para este sitio"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700"
                    >
                      Registrarse
                    </button>
                  </form>
                </motion.div>
              </>

            )}

            {view === "success" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-800 mb-4">¡Registro Exitoso!</h2>
                <p className="mb-4">Ya puedes iniciar sesión con tu correo y contraseña.</p>
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setView("login")}
                >
                  Regresar al Login
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md mb-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-4 lg:text-4xl">
                Boletines Contables
              </h2>
              <p className="text-center text-gray-700 lg:text-lg">
                Bienvenido/a, <strong>{loginData.correo}</strong>
              </p>
            </div>


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {boletinesData.map((boletin) => (
                <div
                  key={boletin.id}
                  className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-blue-800 mb-2">{boletin.titulo}</h3>
                    <p className="text-gray-700 mb-4">{boletin.descripcion}</p>
                    <p className="text-sm text-gray-500 mb-4">Publicado: {boletin.fecha}</p>
                  </div>
                  <a
                    href={boletin.archivo}
                    download
                    className="mt-auto bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-green-600 text-center"
                  >
                    Descargar PDF
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </main>
  );
};

export default Boletines;
