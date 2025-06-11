import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EliminarBoletin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boletin, setBoletin] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/boletines/ver")
      .then((res) => res.json())
      .then((data) => {
        const b = data.find((b) => b.Id.toString() === id);
        setBoletin(b);
      });
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/api/boletines/eliminar/${id}`, { method: "DELETE" });
    navigate(-1);
  };

  if (!boletin) return <p className="text-center mt-10">Cargando boletín...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">Eliminar Boletín</h2>
      <p className="mb-4">¿Seguro que deseas eliminar <strong>{boletin.Titulo}</strong>?</p>
      <button onClick={handleDelete} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 mr-4">Eliminar</button>
      <button onClick={() => navigate(-1)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
    </div>
  );
};

export default EliminarBoletin;
