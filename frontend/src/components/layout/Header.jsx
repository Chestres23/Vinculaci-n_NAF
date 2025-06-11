import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/escudo.png";
import nafLogo from "../../assets/images/naf.jpg";
import { FiMenu, FiX } from 'react-icons/fi';
import React, { useState } from 'react';



function Header() {
  const { user, rol, userData, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
  await handleLogout();
  window.location.href = "/"; // ⬅️ REDIRECCIÓN DURA
};


  return (
    <header className="header">
      <div className="header-top">
        <img src={logo} alt="Escudo" className="logo logo-left" />
        <h1 className="title">NÚCLEO DE APOYO CONTABLE Y FISCAL - ESPE</h1>
        <img src={nafLogo} alt="NAF Logo" className="logo logo-right" />
      </div>

      {/* Botón hamburguesa visible solo en móvil */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </div>

      <nav className="navbar navbar-expand text-green-900 bg-white flex-wrap gap-4 p-4">
        {/* 🔓 ZONA PÚBLICA */}
        {!isDashboard && (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/quienes">¿Quiénes Somos?</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/biblioteca">Biblioteca</Link>
            <Link to="/boletines">Boletines Contables</Link>
            <Link to="/naf">NAF</Link>
            <Link to="/galeria">Galería</Link>
          </>
        )}

        {/* 🔐 ZONA PRIVADA POR ROL */}
        {isDashboard && user && (
          <>
            {rol === 1 && (
              <>
                <Link to="/dashboard-admin/inicio">Inicio</Link>
                <Link to="/dashboard-admin/quienes">¿Quiénes Somos?</Link>
                <Link to="/dashboard-admin/servicios">Servicios</Link>
                <Link to="/dashboard-admin/ver-asesorias">Ver Asesorias Recibidas</Link>
                <Link to="/dashboard-admin/biblioteca">Biblioteca</Link>
                <Link to="/dashboard-admin/boletines">Boletines Contables</Link>             
                <Link to="/dashboard-admin/naf">NAF</Link>
                <Link to="/dashboard-admin/galeria">Galería</Link>
                <Link to="/dashboard-admin/usuarios">Usuarios</Link>
              </>
            )}
            {rol === 2 && (
              <>
                <Link to="/dashboard-editor/inicio">Inicio</Link>
                <Link to="/dashboard-editor/quienes">¿Quiénes Somos?</Link>
                <Link to="/dashboard-editor/servicios">Servicios</Link>
                <Link to="/dashboard-editor/ver-asesorias">Ver Asesorias Recibidas</Link>
                <Link to="/dashboard-editor/biblioteca">Biblioteca</Link>
                <Link to="/dashboard-editor/boletines">Boletines Contables</Link>             
                <Link to="/dashboard-editor/naf">NAF</Link>
                <Link to="/dashboard-editor/galeria">Galería</Link>
                <Link to="/dashboard-editor/usuarios">Usuarios</Link>
              </>
            )}
            {rol === 3 && (
              <>
                <Link to="/dashboard-usuario/inicio">Inicio</Link>
                <Link to="/dashboard-usuario/quienes">¿Quiénes Somos?</Link>
                <Link to="/dashboard-usuario/servicios">Servicios</Link>
                <Link to="/dashboard-usuario/biblioteca">Biblioteca</Link>
                <Link to="/dashboard-usuario/boletines">Boletines Contables</Link>             
                <Link to="/dashboard-usuario/naf">NAF</Link>
                <Link to="/dashboard-usuario/galeria">Galería</Link>
              </>
            )}
          </>
        )}

        {/* 🔘 Controles de sesión */}
        <div className="ml-auto flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Iniciar Sesión
              </Link>
              <Link to="/register">Registrarse</Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-900">
                {userData?.nombre} ({rol})
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
