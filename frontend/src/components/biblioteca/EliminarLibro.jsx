import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EliminarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/libros/ver`)
      .then((res) => res.json())
      .then((data) => {
        const libroEncontrado = data.find((l) => l.Id.toString() === id);
        setLibro(libroEncontrado);
      })
      .catch((err) => {
        console.error("❌ Error al obtener libro:", err);
        Swal.fire("❌ Error", "No se pudo cargar la información del libro.", "error");
      });
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar libro?",
      text: `¿Estás seguro de eliminar "${libro.Titulo}"? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Eliminando...",
      text: "Espere un momento",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`http://localhost:3001/api/libros/eliminar/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("No se pudo eliminar el libro.");

      Swal.close();
      Swal.fire("✅ Eliminado", "El libro fue eliminado correctamente.", "success");
      navigate(-1);
    } catch (error) {
      Swal.close();
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  if (!libro) return <p className="text-center mt-10">Cargando libro...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">Eliminar Libro</h2>
      <p className="mb-4">¿Seguro que deseas eliminar <strong>{libro.Titulo}</strong>?</p>
      <button
        onClick={handleDelete}
        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 mr-4"
      >
        Eliminar
      </button>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Cancelar
      </button>
    </div>
  );
};

export default EliminarLibro;
