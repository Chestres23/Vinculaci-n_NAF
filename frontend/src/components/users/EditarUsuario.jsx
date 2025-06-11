import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import fondo from "../../assets/images/fondo2.jpg";

const EditarUsuario = () => {
  const { uid } = useParams();  // uid de Firebase desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    correo: "",
    cedulaRUC: "",
    telefono: "",
    ciudad: "",
    tipoContribuyente: "",
    rol_id: "3",
    username: "",
  });

  const [userId, setUserId] = useState(null); // ← ID real de la tabla Usuario

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${uid}`);
        const data = await response.json();
        setFormData({
          nombre: data.Nombre,
          segundoNombre: data.SegundoNombre,
          apellido: data.Apellido,
          segundoApellido: data.SegundoApellido,
          correo: data.Correo,
          cedulaRUC: data.CedulaRUC,
          telefono: data.Telefono,
          ciudad: data.Ciudad,
          tipoContribuyente: data.TipoContribuyente,
          rol_id: data.rol_id,  // ✅ case-sensitive corregido
          username: data.Username,
        });
        setUserId(data.Id); // ← lo que necesitas para PUT
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        alert("No se pudo cargar el usuario");
      }
    };

    fetchUsuario();
  }, [uid]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Error: ID del usuario no disponible");
      return;
    }

    try {
      console.log("Enviando a backend:", formData);
      const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar el usuario");

      alert("Usuario actualizado correctamente ✅");
      navigate("/dashboard-admin/usuarios");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar el usuario");
    }
  };


  return (
    <main
      className="py-16 px-6 min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="bg-white bg-opacity-95 p-10 rounded-3xl shadow-2xl w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Editar Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="nombre"
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="segundoNombre"
              type="text"
              placeholder="Segundo Nombre"
              value={formData.segundoNombre}
              onChange={handleChange}
              className="input"
            />
            <input
              name="apellido"
              type="text"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="segundoApellido"
              type="text"
              placeholder="Segundo Apellido"
              value={formData.segundoApellido}
              onChange={handleChange}
              className="input"
            />
            <input
              name="correo"
              type="email"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="cedulaRUC"
              type="text"
              placeholder="Cédula o RUC"
              value={formData.cedulaRUC}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="telefono"
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="input"
            />
            <input
              name="ciudad"
              type="text"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="input"
            />
            <select
              name="tipoContribuyente"
              value={formData.tipoContribuyente}
              onChange={handleChange}
              className="input"
            >
              <option value="">Tipo de Contribuyente</option>
              <option value="natural_no_conta">Natural NO contable</option>
              <option value="natural_conta">Natural contable</option>
              <option value="juridica">Jurídica</option>
              <option value="sociedad">Sociedad</option>
              <option value="otro">Otro</option>
            </select>

            <select
              name="rol_id"
              value={formData.rol_id}
              onChange={handleChange}
              className="input"
            >
              <option value="1">Admin</option>
              <option value="2">Editor</option>
              <option value="3">Usuario</option>
            </select>

            <input
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default EditarUsuario;
