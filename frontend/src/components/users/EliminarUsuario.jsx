import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EliminarUsuario = () => {
  const { uid } = useParams(); // ⚠️ cambia de "id" a "uid"
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [userId, setUserId] = useState(null); // ID real GUID

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${uid}`);
        const data = await response.json();
        setUsuario(data);
        setUserId(data.Id || data.id); // asegúrate de capturar el GUID real
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUsuario();
  }, [uid]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "DELETE",
      });
      alert("Usuario eliminado correctamente ✅");
      navigate("/dashboard-admin/usuarios");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar el usuario ❌");
    }
  };

  if (!usuario) return <p className="text-center mt-10">Cargando usuario...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">Confirmar Eliminación</h2>
      <p className="text-center text-gray-800">
        ¿Estás seguro de que deseas eliminar al usuario <strong>{usuario.Nombre} {usuario.Apellido}</strong>?
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar
        </button>
        <Link
          to="/dashboard-admin/usuarios"
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
};

export default EliminarUsuario;
