import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, rol, isAuthResolved } = useAuth();

  // 🕓 Esperar hasta que el contexto se resuelva (usuario y rol definidos o null)
  if (!isAuthResolved) {
    return <div className="p-4 text-center">Verificando acceso...</div>;
  }

  // 🔐 Si no hay sesión activa
  if (!user) return <Navigate to="/login" />;

  // 🔐 Validación de rol
  const isAuthorized = Array.isArray(requiredRole)
    ? requiredRole.includes(rol)
    : rol === requiredRole;

 if (rol === null || rol === undefined) {
  console.warn("Rol aún no cargado. Rol actual:", rol);
  return <div>Cargando permisos (esperando rol)...</div>;
}



  if (!isAuthorized) {
    if (rol === 1) return <Navigate to="/dashboard-admin" />;
    if (rol === 2) return <Navigate to="/dashboard-editor" />;
    if (rol === 3) return <Navigate to="/dashboard-usuario" />;
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
