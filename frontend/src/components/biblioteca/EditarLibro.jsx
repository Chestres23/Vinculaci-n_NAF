import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", autor: "", descripcion: "", fechaPublicacion: "", tipo: "", rutaPdf: "" });
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/libros/ver")
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
      });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setArchivo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "rutaPdf") formData.append(key, value);
    });

    if (archivo) {
      formData.append("archivoPdf", archivo);
    } else {
      formData.append("rutaPdf", form.rutaPdf);
    }

    await fetch(`http://localhost:3001/api/libros/editar/${id}`, {
      method: "PUT",
      body: formData,
    });

    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Editar libro</h2>
      {["titulo", "autor", "descripcion", "fechaPublicacion", "tipo"].map((field) => (
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
      <div className="mb-2 text-sm text-gray-500">Archivo actual: <a href={form.rutaPdf} target="_blank" rel="noreferrer" className="underline text-blue-600">Ver PDF</a></div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full mb-4" />
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Guardar Cambios</button>
    </form>
  );
};

export default EditarLibro;
