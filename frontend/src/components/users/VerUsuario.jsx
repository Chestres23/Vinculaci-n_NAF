import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerUsuario = () => {
  const { uid } = useParams(); // antes usabas id
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${uid}`);
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUsuario();
  }, [uid]);


  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        Detalles del Usuario
      </h2>
      <div className="space-y-3">
        <p><strong>Nombre:</strong> {usuario.Nombre} {usuario.SegundoNombre}</p>
<p><strong>Apellido:</strong> {usuario.Apellido} {usuario.SegundoApellido}</p>
<p><strong>Cédula/RUC:</strong> {usuario.CedulaRUC}</p>
<p><strong>Correo:</strong> {usuario.Correo}</p>
<p><strong>Teléfono:</strong> {usuario.Telefono}</p>
<p><strong>Ciudad:</strong> {usuario.Ciudad}</p>
<p><strong>Tipo Contribuyente:</strong> {usuario.TipoContribuyente}</p>
<p><strong>Nombre de Usuario:</strong> {usuario.Username}</p>
<p><strong>Rol:</strong> {usuario.rol_id}</p>
<p><strong>Registrado el:</strong> {new Date(usuario.FechaRegistro).toLocaleString()}</p>

      </div>
      <div className="mt-6 text-center">
        <Link to="/dashboard-admin/usuarios" className="text-blue-600 hover:underline">Volver</Link>
      </div>
    </div>
  );
};

export default VerUsuario;
