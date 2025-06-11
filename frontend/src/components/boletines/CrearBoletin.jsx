import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CrearBoletin = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", descripcion: "", fechaPublicacion: "" });
  const [archivo, setArchivo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", form.titulo);
    formData.append("descripcion", form.descripcion);
    formData.append("fechaPublicacion", form.fechaPublicacion);
    formData.append("subidoPor", userData?.Id);
    formData.append("archivoPdf", archivo);

    console.log("subidoPor:", userData?.Id);


    await fetch("http://localhost:3001/api/boletines/crear", {
      method: "POST",
      body: formData,
    });

    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Crear nuevo boletín</h2>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required className="w-full p-2 border mb-2 rounded" />
      <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required className="w-full p-2 border mb-2 rounded" />
      <input type="date" name="fechaPublicacion" value={form.fechaPublicacion} onChange={handleChange} required className="w-full p-2 border mb-2 rounded" />
      <input type="file" accept="application/pdf" onChange={handleFileChange} required className="w-full mb-4" />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Guardar</button>
    </form>
  );
};

export default CrearBoletin;
