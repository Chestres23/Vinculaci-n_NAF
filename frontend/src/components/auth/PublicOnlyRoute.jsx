import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicOnlyRoute = ({ element }) => {
  const { user, rol, isAuthResolved } = useAuth();

  if (!isAuthResolved) {
    return <div className="p-4 text-center">Verificando sesión...</div>;
  }

  if (user && rol) {
    if (rol === 1) return <Navigate to="/dashboard-admin/inicio" />;
    if (rol === 2) return <Navigate to="/dashboard-editor/inicio" />;
    if (rol === 3) return <Navigate to="/dashboard-usuario/inicio" />;
    return <Navigate to="/" />;
  }

  return element;
};

export default PublicOnlyRoute;
