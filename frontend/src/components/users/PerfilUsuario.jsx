import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

import Swal from "sweetalert2";

const PerfilUsuario = () => {
  const { user, userData, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
  nombre: "", segundoNombre: "", apellido: "", segundoApellido: "",
  cedulaRUC: "", telefono: "", ciudad: "", tipoContribuyente: "",
  passwordActual: "", nuevaContrasena: ""
});


  useEffect(() => {
    if (userData) {
      setFormData({
        nombre: userData.Nombre || "",
        segundoNombre: userData.SegundoNombre || "",
        apellido: userData.Apellido || "",
        segundoApellido: userData.SegundoApellido || "",
        cedulaRUC: userData.CedulaRUC || "",
        telefono: userData.Telefono || "",
        ciudad: userData.Ciudad || "",
        tipoContribuyente: userData.TipoContribuyente || "",
        nuevaContrasena: ""
      });
    }
  }, [userData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/api/users/perfil/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      if (formData.nuevaContrasena.trim() !== "" && formData.passwordActual.trim() !== "") {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Usuario no autenticado en Firebase");

  const credential = EmailAuthProvider.credential(currentUser.email, formData.passwordActual);

  try {
    // 🔐 Reautenticación
    await reauthenticateWithCredential(currentUser, credential);

    // 🔄 Cambio de contraseña
    await updatePassword(currentUser, formData.nuevaContrasena);
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      throw new Error("La contraseña actual es incorrecta");
    } else {
      throw new Error("Error al cambiar la contraseña");
    }
  }
}



      Swal.fire("✅ Perfil actualizado", "", "success");
      setEditMode(false);
    } catch (err) {
      Swal.fire("❌ Error", err.message, "error");
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará tu cuenta permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3001/api/users/perfil/${user.uid}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Error al eliminar cuenta");

      Swal.fire("✅ Cuenta eliminada", "", "success");
      await handleLogout();
      navigate("/");
    } catch (err) {
      Swal.fire("❌ Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2 md:mb-0">Mi Perfil</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
          >
            {editMode ? "Cancelar Edición" : "Editar Perfil"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {!editMode ? (
        <div className="grid grid-cols-2 gap-4">
          {[
            ["Nombre", formData.nombre],
            ["Segundo Nombre", formData.segundoNombre],
            ["Apellido", formData.apellido],
            ["Segundo Apellido", formData.segundoApellido],
            ["Cédula o RUC", formData.cedulaRUC],
            ["Teléfono", formData.telefono],
            ["Ciudad", formData.ciudad],
            ["Tipo de Contribuyente", formData.tipoContribuyente],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-lg font-semibold">{value || "—"}</p>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
  {[["nombre", "Nombre"], ["segundoNombre", "Segundo Nombre"], ["apellido", "Apellido"],
    ["segundoApellido", "Segundo Apellido"], ["cedulaRUC", "Cédula o RUC"], ["telefono", "Teléfono"],
    ["ciudad", "Ciudad"]
  ].map(([key, label]) => (
    <input
      key={key}
      name={key}
      value={formData[key]}
      onChange={handleChange}
      placeholder={label}
      className="border p-2 rounded"
      required
    />
  ))}

  <select
    name="tipoContribuyente"
    value={formData.tipoContribuyente}
    onChange={handleChange}
    required
    className="border p-2 rounded"
  >
    <option value="">Tipo de Contribuyente</option>
    <option value="Persona natural no obligada a llevar contabilidad">Persona natural no obligada</option>
    <option value="Persona natural obligada a llevar contabilidad">Persona natural obligada</option>
    <option value="Persona jurídica">Persona jurídica</option>
    <option value="Sociedad">Sociedad</option>
    <option value="Otro">Otro</option>
  </select>

  {/* Nueva sección de cambio de contraseña */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    <input
      name="passwordActual"
      type="password"
      placeholder="Contraseña actual"
      onChange={handleChange}
      className="border p-2 rounded"
    />
    <input
      name="nuevaContrasena"
      type="password"
      placeholder="Nueva contraseña"
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </div>

  <div className="flex gap-2">
    <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600">
      Guardar Cambios
    </button>
    <button type="button" onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500">
      Eliminar Cuenta
    </button>
  </div>
</form>

      )}
    </div>
  );
};

export default PerfilUsuario;
