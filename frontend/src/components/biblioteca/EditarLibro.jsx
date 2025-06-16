import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    fechaPublicacion: "",
    tipo: "",
    rutaPdf: "",
  });
  const [archivo, setArchivo] = useState(null);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/libros/ver`)
      .then((res) => res.json())
      .then((data) => {
        const libro = data.find((l) => l.Id.toString() === id);
        if (libro) {
          setForm({
            titulo: libro.Titulo,
            autor: libro.Autor,
            descripcion: libro.Descripcion,
            fechaPublicacion: libro.FechaPublicacion?.split("T")[0],
            tipo: libro.Tipo,
            rutaPdf: libro.RutaPdf,
          });
        }
      })
      .catch((error) => {
        console.error("❌ Error al obtener el libro:", error);
        Swal.fire("❌ Error", "No se pudo cargar el libro.", "error");
      });
  }, [id, API]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (file && file.size > maxSize) {
      Swal.fire(
        "❌ Archivo demasiado grande",
        "El tamaño máximo es 10 MB.",
        "error"
      );
      setArchivo(null);
      e.target.value = null; // limpia el input
      return;
    }

    setArchivo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Guardando cambios...",
      text: "Por favor espera mientras se actualiza el libro.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "rutaPdf") formData.append(key, value);
      });

      if (archivo) {
        formData.append("archivoPdf", archivo);
      } else {
        formData.append("rutaPdf", form.rutaPdf);
      }

      const res = await fetch(`${API}/api/libros/editar/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("No se pudo guardar los cambios.");

      Swal.close();
      Swal.fire(
        "✅ Libro actualizado",
        "Los cambios se guardaron correctamente.",
        "success"
      );
      navigate(-1);
    } catch (error) {
      Swal.close();
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Editar libro</h2>
      {["titulo", "autor", "descripcion", "fechaPublicacion"].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded"
          required
          type={field === "fechaPublicacion" ? "date" : "text"}
        />
      ))}
      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2 rounded"
      >
        <option value="">Selecciona el tipo de libro</option>
        <option value="Contable">Contable</option>
        <option value="No Contable">No Contable</option>
      </select>

      <div className="mb-2 text-sm text-gray-500">
        Archivo actual:{" "}
        <a
          href={form.rutaPdf}
          target="_blank"
          rel="noreferrer"
          className="underline text-blue-600"
        >
          Ver PDF
        </a>
      </div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full mb-4"
      />
      <p className="text-sm text-gray-500 mb-2">
        Solo archivos PDF menores a 10MB.
      </p>

      <button
        type="submit"
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditarLibro;
