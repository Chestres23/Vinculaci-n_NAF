import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EliminarUsuario = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${uid}`);
        const data = await response.json();
        setUsuario(data);
        setUserId(data.Id || data.id);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        Swal.fire("❌ Error", "No se pudo obtener el usuario", "error");
      }
    };

    fetchUsuario();
  }, [uid]);

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Fallo en la eliminación");

        Swal.fire("✅ Eliminado", "Usuario eliminado correctamente", "success").then(() => {
          navigate("/dashboard-admin/usuarios");
        });
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire("❌ Error", "No se pudo eliminar el usuario", "error");
      }
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
