import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const CrearLibro = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "", autor: "", descripcion: "", fechaPublicacion: "", tipo: ""
  });
  const [archivo, setArchivo] = useState(null);
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  const maxSize = 10 * 1024 * 1024; // 10 MB

  if (file && file.size > maxSize) {
    Swal.fire("❌ Archivo demasiado grande", "El tamaño máximo es 10 MB.", "error");
    setArchivo(null);
    e.target.value = null; // limpia el input
    return;
  }

  setArchivo(file);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Subiendo libro...",
      text: "Por favor espera mientras se guarda la información.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("subidoPor", userData?.Id);
      formData.append("archivoPdf", archivo);

      const res = await fetch(`${API}/api/libros/crear`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("No se pudo guardar el libro. Intenta nuevamente.");

      Swal.close();
      Swal.fire("✅ Libro creado", "El libro fue guardado exitosamente.", "success");
      navigate(-1);
    } catch (error) {
      Swal.close();
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Subir nuevo libro</h2>

      {["titulo", "autor", "descripcion", "fechaPublicacion"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
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
        className="w-full p-2 border mb-4 rounded"
      >
        <option value="">Selecciona el tipo de libro</option>
        <option value="Contable">Contable</option>
        <option value="No Contable">No Contable</option>
      </select>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        required
        className="w-full mb-4"
      />
      <p className="text-sm text-gray-500 mb-2">Solo archivos PDF menores a 10MB.</p>


      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Guardar
      </button>
    </form>
  );
};

export default CrearLibro;
