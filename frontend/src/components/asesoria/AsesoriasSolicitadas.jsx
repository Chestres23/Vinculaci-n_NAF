import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import fondo6 from "../../assets/images/fondo6.jpg";

const AsesoriasSolicitadas = () => {
  const [asesorias, setAsesorias] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const fetchAsesorias = async () => {
    try {
      const API = process.env.REACT_APP_API_URL;
      const response = await fetch(`http://localhost:3001/api/asesorias/todas`);
      if (!response.ok) throw new Error("Error al obtener asesorías");
      const data = await response.json();
      setAsesorias(data);

      const noRealizadas = data.filter((a) => !a.Realizada);
      if (noRealizadas.length > 0) {
        Swal.fire({
          icon: "info",
          title: "Asesorías pendientes",
          text: `Hay ${noRealizadas.length} asesoría(s) sin marcar como realizada.`,
        });
      }
    } catch (error) {
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  useEffect(() => {
    fetchAsesorias();
  }, []);

  const marcarComoRealizada = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/asesorias/marcar/${id}`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) throw new Error("No se pudo marcar como realizada");

      await fetchAsesorias();
      Swal.fire("✅ Actualizado", "Asesoría marcada como realizada", "success");
    } catch (error) {
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  const eliminarAsesoria = async (id) => {
  const asesoría = asesorias.find((a) => a.Id === id);

  if (!asesoría) {
    return Swal.fire("❌ Error", "No se pudo encontrar la asesoría", "error");
  }

  const mensaje = asesoría.Realizada
    ? "Esta asesoría ya fue marcada como realizada. ¿Deseas eliminarla?"
    : "⚠️ Esta asesoría aún no ha sido marcada como realizada. ¿Deseas eliminarla de todos modos?";

  const confirmacion = await Swal.fire({
    title: "¿Eliminar asesoría?",
    text: mensaje,
    icon: asesoría.Realizada ? "question" : "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (!confirmacion.isConfirmed) return;

  try {
    const res = await fetch(`http://localhost:3001/api/asesorias/eliminar/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("No se pudo eliminar");

    await fetchAsesorias();

    Swal.fire("✅ Eliminado", "Asesoría eliminada correctamente", "success");
  } catch (error) {
    Swal.fire("❌ Error", error.message, "error");
  }
};


  const eliminarAsesoriasRealizadas = async () => {
    // Verificar si hay al menos una asesoría marcada como realizada
    const realizadas = asesorias.filter((a) => a.Realizada);

    if (realizadas.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "Sin asesorías realizadas",
        text: "No hay asesorías marcadas como realizadas para eliminar.",
      });
    }

    const confirmacion = await Swal.fire({
      title: "¿Eliminar asesorías realizadas?",
      text: `Hay ${realizadas.length} asesoría(s) realizadas. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3001/api/asesorias/eliminar-realizadas`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) throw new Error("No se pudo eliminar");

        await fetchAsesorias();
        Swal.fire(
          "✅ Eliminadas",
          "Se eliminaron las asesorías realizadas",
          "success"
        );
      } catch (error) {
        Swal.fire("❌ Error", error.message, "error");
      }
    }
  };

  const eliminarTodasAsesorias = async () => {
  if (asesorias.length === 0) {
    return Swal.fire({
      icon: "info",
      title: "Sin asesorías registradas",
      text: "No hay asesorías para eliminar.",
    });
  }

  const confirmacion = await Swal.fire({
    title: "¿Eliminar TODAS las asesorías?",
    text: "Se eliminarán todas, incluso las no realizadas. Esta acción es irreversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar todas",
    cancelButtonText: "Cancelar",
  });

  if (confirmacion.isConfirmed) {
    try {
      const res = await fetch(
        "http://localhost:3001/api/asesorias/eliminar-todas",
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("No se pudo eliminar");

      await fetchAsesorias();
      Swal.fire(
        "✅ Eliminadas",
        "Todas las asesorías han sido eliminadas",
        "success"
      );
    } catch (error) {
      Swal.fire("❌ Error", error.message, "error");
    }
  }
};


  return (
    <main
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url(${fondo6})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-green-900 mb-6 text-center">
          Asesorías Solicitadas
        </h2>

        <div className="overflow-x-auto">
          <div className="mb-4 flex gap-4 justify-end">
            <button
              onClick={eliminarAsesoriasRealizadas}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
            >
              🗑️ Eliminar realizadas
            </button>
            <button
              onClick={eliminarTodasAsesorias}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
            >
              ❌ Eliminar todas
            </button>
          </div>

          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3">Usuario</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Ciudad</th>
                <th className="p-3">Servicio</th>
                <th className="p-3">Contribuyente</th>
                <th className="p-3">Discapacidad</th>
                <th className="p-3">Contacto</th>
                <th className="p-3">Detalle</th>
                <th className="p-3">Fecha de Solicitud</th>
                <th className="p-3">¿Realizada?</th>
                <th className="p-3">Fecha de Asesoramiento</th>
                <th className="p-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {asesorias.length > 0 ? (
                asesorias.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      {item.UsuarioUsername || "Sin cuenta"}
                    </td>
                    <td className="p-3">{item.Nombre}</td>
                    <td className="p-3">{item.Correo}</td>
                    <td className="p-3">{item.Telefono}</td>
                    <td className="p-3">{item.Ciudad}</td>
                    <td className="p-3">{item.TipoServicio}</td>
                    <td className="p-3">{item.TipoContribuyente}</td>
                    <td className="p-3">{item.Discapacidad ? "Sí" : "No"} </td>
                    <td className="p-3">{item.MedioContacto}</td>
                    <td className="p-3">{item.DetalleSolicitud}</td>
                    <td className="p-3">
                      {item.FechaSolicitud
                        ? new Date(item.FechaSolicitud).toLocaleDateString()
                        : "No registrada"}
                    </td>
                    <td className="p-3">{item.Realizada ? "Sí" : "No"}</td>
                    <td className="p-3">
                      {item.FechaRealizacion
                        ? new Date(item.FechaRealizacion).toLocaleDateString()
                        : "Pendiente"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => marcarComoRealizada(item.Id)}
                        disabled={item.Realizada}
                        className={`mr-2 ${
                          item.Realizada
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-700 hover:bg-green-800"
                        } text-white px-2 py-1 rounded text-sm`}
                      >
                        {item.Realizada ? "Realizada" : "Marcar como realizada"}
                      </button>
                      <button
                        onClick={() => eliminarAsesoria(item.Id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    No se han registrado asesorías aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  );
};

export default AsesoriasSolicitadas;
