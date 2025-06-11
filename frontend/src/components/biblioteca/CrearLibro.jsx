import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CrearLibro = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", autor: "", descripcion: "", fechaPublicacion: "", tipo: "" });
  const [archivo, setArchivo] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setArchivo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("subidoPor", userData?.Id);
    formData.append("archivoPdf", archivo);

    await fetch("http://localhost:3001/api/libros/crear", {
      method: "POST",
      body: formData,
    });

    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Subir nuevo libro</h2>
      {["titulo", "autor", "descripcion", "fechaPublicacion", "tipo"].map((field) => (
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
      <input type="file" accept="application/pdf" onChange={handleFileChange} required className="w-full mb-4" />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Guardar</button>
    </form>
  );
};

export default CrearLibro;
