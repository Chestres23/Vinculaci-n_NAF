import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoletinManager = () => {
  const [boletines, setBoletines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/boletines/ver")
      .then((res) => res.json())
      .then(setBoletines)
      .catch((err) => console.error("Error al obtener boletines", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-900">Gestión de Boletines</h2>
      <Link
        to="crear"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➕ Crear nuevo boletín
      </Link>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">PDF</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boletines.map((b) => (
            <tr key={b.Id} className="text-center">
              <td className="p-2 border">{b.Titulo}</td>
              <td className="p-2 border">{b.Descripcion}</td>
              <td className="p-2 border">{b.FechaPublicacion?.split("T")[0]}</td>
              <td className="p-2 border">
                <a
                href={`http://localhost:3001${b.RutaPdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-center text-sm"
                >
                Ver PDF
                </a>
              </td>
              <td className="p-2 border space-x-2">
                <Link to={`editar/${b.Id}`} className="text-yellow-600 underline">Editar</Link>
                <Link to={`eliminar/${b.Id}`} className="text-red-600 underline">Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoletinManager;
