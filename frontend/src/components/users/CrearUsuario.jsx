import React, { useState } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import fondo from "../../assets/images/fondo2.jpg";

const CrearUsuario = () => {
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
    password: "", // 👈 necesario para Firebase
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3001/api/users/create-user-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Error al registrar usuario");

    alert("✅ Usuario registrado exitosamente");
    setFormData({
      nombre: "", segundoNombre: "", apellido: "", segundoApellido: "",
      correo: "", cedulaRUC: "", telefono: "", ciudad: "",
      tipoContribuyente: "", rol_id: "3", username: "", password: ""
    });
  } catch (error) {
    console.error("❌ Error al registrar:", error);
    alert(`Error: ${error.message}`);
  }
};


  return (
    <main className="py-16 px-6 min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url(${fondo})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"
    }}>
      <motion.div className="bg-white bg-opacity-95 p-10 rounded-3xl shadow-2xl w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Crear Usuario (Admin)</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[["nombre", "Nombre"], ["segundoNombre", "Segundo Nombre"], ["apellido", "Apellido"],
            ["segundoApellido", "Segundo Apellido"], ["correo", "Correo"], ["password", "Contraseña"],
            ["cedulaRUC", "Cédula o RUC"], ["telefono", "Teléfono"], ["ciudad", "Ciudad"], ["username", "Nombre de usuario"]
          ].map(([name, placeholder]) => (
            <input key={name} name={name} placeholder={placeholder} value={formData[name]}
              onChange={handleChange} className="input" required />
          ))}
          <select name="tipoContribuyente" value={formData.tipoContribuyente} onChange={handleChange} required className="input">
            <option value="">Tipo de Contribuyente</option>
            <option value="natural_no_conta">Natural NO contable</option>
            <option value="natural_conta">Natural contable</option>
            <option value="juridica">Jurídica</option>
            <option value="sociedad">Sociedad</option>
            <option value="otro">Otro</option>
          </select>
          <select name="rol_id" value={formData.rol_id} onChange={handleChange} className="input">
            <option value="1">Admin</option>
            <option value="2">Editor</option>
            <option value="3">Usuario</option>
          </select>
          <div className="col-span-2 text-center mt-6">
            <button type="submit" className="bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800">
              Registrar Usuario
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default CrearUsuario;
