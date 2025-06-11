import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EliminarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/libros/ver")
      .then((res) => res.json())
      .then((data) => {
        const libro = data.find((l) => l.Id.toString() === id);
        setLibro(libro);
      });
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/api/libros/eliminar/${id}`, { method: "DELETE" });
    navigate(-1);
  };

  if (!libro) return <p className="text-center mt-10">Cargando libro...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">Eliminar Libro</h2>
      <p className="mb-4">¿Seguro que deseas eliminar <strong>{libro.Titulo}</strong>?</p>
      <button onClick={handleDelete} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 mr-4">Eliminar</button>
      <button onClick={() => navigate(-1)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
    </div>
  );
};

export default EliminarLibro;
