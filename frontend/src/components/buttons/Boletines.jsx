import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import fondo4 from "../../assets/images/fondo4.jpg";
import { useNavigate } from "react-router-dom";

const Boletines = () => {
  const { user, userData, rol } = useAuth();
  const navigate = useNavigate();

  const [boletines, setBoletines] = useState([
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
  ]);

  const [nuevoBoletin, setNuevoBoletin] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    archivo: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const puedeEditar = rol === 1 || rol === 2;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoBoletin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoBoletin.titulo) return;
    setBoletines((prev) => [
      ...prev,
      {
        ...nuevoBoletin,
        id: Date.now(),
      },
    ]);
    setNuevoBoletin({ titulo: "", descripcion: "", fecha: "", archivo: "" });
  };

  const handleEliminar = (id) => {
    setBoletines((prev) => prev.filter((b) => b.id !== id));
  };

  const handleEditar = (id) => {
    const boletin = boletines.find((b) => b.id === id);
    setNuevoBoletin(boletin);
    setEditandoId(id);
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setBoletines((prev) =>
      prev.map((b) => (b.id === editandoId ? { ...nuevoBoletin, id: b.id } : b))
    );
    setEditandoId(null);
    setNuevoBoletin({ titulo: "", descripcion: "", fecha: "", archivo: "" });
  };

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
      {/* Contenido desenfocado si no hay usuario */}
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

          {puedeEditar && (
            <form
              onSubmit={editandoId ? handleGuardarEdicion : handleAgregar}
              className="bg-white bg-opacity-90 p-4 rounded-lg shadow mb-8 grid gap-4 md:grid-cols-2"
            >
              <input
                type="text"
                name="titulo"
                placeholder="Título del boletín"
                value={nuevoBoletin.titulo}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={nuevoBoletin.descripcion}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="date"
                name="fecha"
                value={nuevoBoletin.fecha}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="archivo"
                placeholder="Ruta del PDF"
                value={nuevoBoletin.archivo}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <button
                type="submit"
                className="col-span-2 bg-green-700 text-white font-bold py-2 rounded hover:bg-green-600"
              >
                {editandoId ? "Guardar Cambios" : "Agregar Boletín"}
              </button>
            </form>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {boletines.map((boletin) => (
              <div
                key={boletin.id}
                className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between relative"
              >
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {boletin.titulo}
                  </h3>
                  <p className="text-gray-700 mb-2">{boletin.descripcion}</p>
                  <p className="text-sm text-gray-500 mb-2">Publicado: {boletin.fecha}</p>
                </div>

                <a
                  href={boletin.archivo}
                  download
                  className="mt-auto bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-green-600 text-center"
                >
                  Descargar PDF
                </a>

                {puedeEditar && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEditar(boletin.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(boletin.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MODAL de acceso bloqueado */}
      {!user && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-red-700">Acceso restringido</h2>
            <p className="text-gray-700">
              Para acceder a los boletines contables necesitas iniciar sesión o registrarte.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 cursor-pointer"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Boletines;
