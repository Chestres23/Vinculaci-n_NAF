import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditarBoletin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fechaPublicacion: "",
    rutaPdf: "", // ruta del archivo original
  });
  const [archivo, setArchivo] = useState(null); // archivo nuevo (opcional)

  useEffect(() => {
    fetch("http://localhost:3001/api/boletines/ver")
      .then((res) => res.json())
      .then((data) => {
        const b = data.find((b) => b.Id.toString() === id);
        if (b) {
          setForm({
            titulo: b.Titulo,
            descripcion: b.Descripcion,
            fechaPublicacion: b.FechaPublicacion?.split("T")[0],
            rutaPdf: b.RutaPdf,
          });
        }
      });
  }, [id]);

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

    // Solo enviar nuevo archivo si se seleccionó uno
    if (archivo) {
      formData.append("archivoPdf", archivo);
    } else {
      formData.append("rutaPdf", form.rutaPdf); // mantener el archivo original
    }

    await fetch(`http://localhost:3001/api/boletines/editar/${id}`, {
      method: "PUT",
      body: formData,
    });

    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Editar boletín</h2>
      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
        required
      />
      <input
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
        required
      />
      <input
        type="date"
        name="fechaPublicacion"
        value={form.fechaPublicacion}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
        required
      />

      <div className="mb-2">
        <p className="text-sm text-gray-600 mb-1">Archivo actual:</p>
        <a
          href={form.rutaPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Ver PDF actual
        </a>
      </div>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full mb-4"
      />

      <button
        type="submit"
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditarBoletin;
