import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 👈 Asegúrate de importar correctamente

const UserManager = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { rol, userData } = useAuth();


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const esAdmin = rol === 1;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-900">Gestión de Usuarios</h2>

      {esAdmin && (
        <Link
          to="crear"
          className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ➕ Crear nuevo usuario
        </Link>
      )}

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre completo</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Cédula/RUC</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
  const esMismoUsuario = user.FirebaseUid === userData?.FirebaseUid;


  return (
    <tr
      key={user.FirebaseUid}
      className={`text-center ${esMismoUsuario && esAdmin ? "bg-gray-200 text-gray-500" : ""}`}
    >
      <td className="p-2 border">
        {user.Nombre} {user.SegundoNombre} {user.Apellido} {user.SegundoApellido}
      </td>
      <td className="p-2 border">{user.Username}</td>
      <td className="p-2 border">{user.CedulaRUC}</td>
      <td className="p-2 border space-x-2">
        {esMismoUsuario && esAdmin ? (
          <span className="italic text-gray-500">Acciones deshabilitadas</span>
        ) : (
          <>
            <Link to={`ver/${user.FirebaseUid}`} className="text-green-600 underline">Ver</Link>
            {esAdmin && (
              <>
                <Link to={`editar/${user.FirebaseUid}`} className="text-yellow-600 underline">Editar</Link>
                <Link to={`eliminar/${user.FirebaseUid}`} className="text-red-600 underline">Eliminar</Link>
              </>
            )}
          </>
        )}
      </td>
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  );
};

export default UserManager;
