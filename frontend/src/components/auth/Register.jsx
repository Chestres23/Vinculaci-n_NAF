import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    username: "",
    correo: "",
    password: "",
    cedulaRUC: "",
    telefono: "",
    ciudad: "",
    tipoContribuyente: "",
    rol_id: 3, // por defecto: usuario
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  let firebaseUser = null;

  try {
    // 🌀 Mostrar alerta de carga
    Swal.fire({
      title: "Registrando usuario...",
      text: "Por favor, espera un momento",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // 1. Crear en Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.correo,
      formData.password
    );
    firebaseUser = userCredential.user;

    const uid = firebaseUser.uid;

    // 2. Cerrar sesión para evitar onAuthStateChanged prematuro
    await signOut(auth);

    // 3. Guardar en el backend
    const response = await fetch("http://localhost:3001/api/users/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, uid }),
    });

    const result = await response.json();

    if (!response.ok) {
      // ⚠️ BORRAR de Firebase si el backend falla
      try {
        await firebaseUser.delete();
        console.warn("🧹 Usuario de Firebase eliminado por error en backend");
      } catch (deleteError) {
        console.error("❌ Error al eliminar usuario de Firebase:", deleteError);
      }

      throw new Error(result.error || "Error al guardar en la base de datos");
    }

    // 4. Volver a logear
    const resLogin = await signInWithEmailAndPassword(
      auth,
      formData.correo,
      formData.password
    );

    login(resLogin.user); // activa el contexto

    // ✅ Mostrar confirmación
    Swal.fire({
      icon: "success",
      title: "Usuario registrado",
      text: "Tu cuenta se ha creado correctamente.",
    });

    // 5. Redirigir según rol
    switch (formData.rol_id) {
      case 1:
        navigate("/dashboard-admin/inicio");
        break;
      case 2:
        navigate("/dashboard-editor/inicio");
        break;
      case 3:
      default:
        navigate("/dashboard-usuario/inicio");
        break;
    }
  } catch (err) {
    console.error("❌ Error en registro:", err);
    Swal.fire({
      icon: "error",
      title: "Registro fallido",
      text: err.message || "Ocurrió un error durante el registro",
    });
    setError(err.message);
  }
};



  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="border p-2 rounded" />
        <input name="segundoNombre" placeholder="Segundo Nombre" value={formData.segundoNombre} onChange={handleChange} className="border p-2 rounded" />
        <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className="border p-2 rounded" />
        <input name="segundoApellido" placeholder="Segundo Apellido" value={formData.segundoApellido} onChange={handleChange} className="border p-2 rounded" />
        <input name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} required className="border p-2 rounded" />
        <input name="cedulaRUC" placeholder="Cédula o RUC" value={formData.cedulaRUC} onChange={handleChange} required className="border p-2 rounded" />
        <input name="telefono" placeholder="Teléfono de contacto" value={formData.telefono} onChange={handleChange} required className="border p-2 rounded" />
        <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required className="border p-2 rounded" />
        <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required className="border p-2 rounded" />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required className="border p-2 rounded" />

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1">Tipo de Contribuyente</label>
          <select
            name="tipoContribuyente"
            value={formData.tipoContribuyente}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccione...</option>
            <option value="Persona natural no obligada a llevar contabilidad">
              Persona natural no obligada
            </option>
            <option value="Persona natural obligada a llevar contabilidad">
              Persona natural obligada
            </option>
            <option value="Persona jurídica">Persona jurídica</option>
            <option value="Sociedad">Sociedad</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <button
  type="submit"
  className="col-span-1 md:col-span-2 bg-green-700 text-white py-2 rounded hover:bg-green-600"
>
  Registrarse
</button>

<button
  type="button"
  onClick={() => navigate("/login")}
  className="col-span-1 md:col-span-2 bg-blue-700 text-white py-2 rounded hover:bg-blue-600"
>
  Volver al login
</button>

{error && <p className="col-span-2 text-red-600 text-sm mt-2">{error}</p>}


        

        {error && <p className="col-span-2 text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
