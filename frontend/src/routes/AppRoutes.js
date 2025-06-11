import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicOnlyRoute from "../components/auth/PublicOnlyRoute";
import { useAuth } from "../context/AuthContext";

// Dashboards por rol
import DashboardAdmin from "../components/dashboard/DashboardAdmin";
import DashboardEditor from "../components/dashboard/DashboardEditor";
import DashboardUsuario from "../components/dashboard/DashboardUsuario";
import DashboardPublic from "../components/dashboard/DashboardPublic";

// Componentes públicos
import MainContent from "../components/layout/MainContent";
import Servicios from "../components/buttons/Servicios";
import NAF from "../components/buttons/NAF";
import Biblioteca from "../components/buttons/Biblioteca";
import Boletines from "../components/buttons/Boletines";
import Quienes from "../components/buttons/Quienes";
import Galeria from "../components/buttons/Galeria";

// Login y registro
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AppRoutes = () => {
  const { user, rol, isAuthResolved } = useAuth();

  if (!isAuthResolved) {
    return <div className="p-4 text-center">Verificando acceso...</div>;
  }

  // ✅ Si el usuario está logueado y entra a una ruta pública, redirige a su dashboard
  const redirectIfLoggedIn = (element) => {
    if (user && rol) {
      if (rol === 1) return <Navigate to="/dashboard-admin/inicio" />;
      if (rol === 2) return <Navigate to="/dashboard-editor/inicio" />;
      if (rol === 3) return <Navigate to="/dashboard-usuario/inicio" />;
    }
    return element;
  };

  return (
    <Routes>
      {/* 🌐 RUTAS PÚBLICAS */}
      <Route path="/" element={redirectIfLoggedIn(<DashboardPublic><MainContent /></DashboardPublic>)} />
      <Route path="/quienes" element={redirectIfLoggedIn(<DashboardPublic><Quienes /></DashboardPublic>)} />
      <Route path="/naf" element={redirectIfLoggedIn(<DashboardPublic><NAF /></DashboardPublic>)} />
      <Route path="/galeria" element={redirectIfLoggedIn(<DashboardPublic><Galeria /></DashboardPublic>)} />
      <Route path="/boletines" element={redirectIfLoggedIn(<DashboardPublic><Boletines /></DashboardPublic>)} />
      <Route path="/biblioteca" element={redirectIfLoggedIn(<DashboardPublic><Biblioteca /></DashboardPublic>)} />
      <Route path="/servicios" element={redirectIfLoggedIn(<DashboardPublic><Servicios /></DashboardPublic>)} />

      {/* 🔐 LOGIN / REGISTRO */}
      <Route path="/login" element={<PublicOnlyRoute element={<Login />} />} />
      <Route path="/register" element={<PublicOnlyRoute element={<Register />} />} />

      {/* 🔒 DASHBOARDS PROTEGIDOS */}
      <Route path="/dashboard-admin/*" element={<ProtectedRoute requiredRole={1} element={<DashboardAdmin />} />} />
      <Route path="/dashboard-editor/*" element={<ProtectedRoute requiredRole={2} element={<DashboardEditor />} />} />
      <Route path="/dashboard-usuario/*" element={<ProtectedRoute requiredRole={3} element={<DashboardUsuario />} />} />

      {/* 🚫 CUALQUIER RUTA DESCONOCIDA */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
