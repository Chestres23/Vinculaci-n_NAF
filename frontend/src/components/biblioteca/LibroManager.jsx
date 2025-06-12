import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LibroManager = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/libros/ver")
      .then((res) => res.json())
      .then(setLibros)
      .catch((err) => console.error("Error al obtener libros:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-900">Gestión de Libros</h2>
      <Link to="crear" className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        ➕ Subir nuevo libro
      </Link>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Autor</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">PDF</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((l) => (
            <tr key={l.Id} className="text-center">
              <td className="p-2 border">{l.Titulo}</td>
              <td className="p-2 border">{l.Autor}</td>
              <td className="p-2 border">{l.Tipo}</td>
              <td className="p-2 border">
                <a href={l.RutaPdf} target="_blank" rel="noreferrer" className="text-blue-600 underline">Ver</a>
              </td>
              <td className="p-2 border space-x-2">
                <Link to={`editar/${l.Id}`} className="text-yellow-600 underline">Editar</Link>
                <Link to={`eliminar/${l.Id}`} className="text-red-600 underline">Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibroManager;
