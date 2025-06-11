import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/escudo.png";
import nafLogo from "../../assets/images/naf.jpg";
import { FiMenu, FiX } from 'react-icons/fi';
import React, { useState } from 'react';
import "../../assets/styles/Header.css";

function Header() {
  const { user, rol, userData, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);


  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const handleSignOut = async () => {
  setLoggingOut(true); // Mostrar splash

  setTimeout(async () => {
    await handleLogout();
    window.location.href = "/";
  }, 1500);
};


  const commonLinks = (basePath) => (
    <>
      <Link to={`${basePath}/inicio`}>Inicio</Link>
      <Link to={`${basePath}/quienes`}>¿Quiénes Somos?</Link>
      <Link to={`${basePath}/servicios`}>Solicitar Asesoría</Link>
      <Link to={`${basePath}/biblioteca`}>Biblioteca</Link>
      <Link to={`${basePath}/boletines`}>Boletines Contables</Link>
      <Link to={`${basePath}/naf`}>NAF</Link>
      <Link to={`${basePath}/galeria`}>Galería</Link>
    </>
  );

  const roleSpecificLinks = {
    1: (
      <div className="w-full text-center mt-6">
        <p className="text-sm font-bold text-gray-600 mb-2 uppercase">Opciones para Admin</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link to="/dashboard-admin/ver-asesorias" className="btn-header">Ver Asesorías Solicitadas</Link>
          <Link to="/dashboard-admin/usuarios" className="btn-header">Usuarios</Link>
        </div>
      </div>
    ),
    2: (
      <div className="w-full text-center mt-6">
        <p className="text-sm font-bold text-gray-600 mb-2 uppercase">Opciones para Editor</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link to="/dashboard-editor/ver-asesorias" className="btn-header">Ver Asesorías Solicitadas</Link>
          <Link to="/dashboard-editor/usuarios" className="btn-header">Usuarios</Link>
        </div>
      </div>
    ),
  };

  // ➕ Ruta dinámica al perfil por rol
  const perfilPath =
    rol === 1 ? "/dashboard-admin/perfil"
    : rol === 2 ? "/dashboard-editor/perfil"
    : "/dashboard-usuario/perfil";

    if (loggingOut) {
  return (
    <div className="splash-screen">
      <img src={nafLogo} alt="Logo NAF" className="splash-logo" />
      <p className="splash-text">Cerrando sesión...</p>
    </div>
  );
}


  return (
    <header className="header">
      <div className="header-top relative flex justify-between items-center">
        <img src={logo} alt="Escudo" className="logo logo-left" />
        <h1 className="title">NÚCLEO DE APOYO CONTABLE Y FISCAL - ESPE</h1>

        {/* 🔒 Zona de sesión (debajo del logo derecho) */}
        <div className="logo-actions absolute top-full right-4 mt-2 flex flex-col items-end">
          {!user ? (
            <div className="flex flex-col gap-1">
              <Link to="/login" className="btn-login">Iniciar Sesión</Link>
              <Link to="/register" className="btn-register">Registrarse</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-1 text-right items-end">
              <span className="text-sm font-semibold text-green-900">
                {userData?.nombre} ({rol === 1 ? "Admin" : rol === 2 ? "Editor" : "Usuario"})
              </span>
              <div className="flex gap-2">
                <Link to={perfilPath} className="btn-perfil">Perfil</Link>
                <button onClick={handleSignOut} className="btn-logout">Cerrar Sesión</button>
              </div>
            </div>
          )}
        </div>

        <img src={nafLogo} alt="NAF Logo" className="logo logo-right" />
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </div>

      <nav className="navbar navbar-expand text-green-900 bg-white flex-wrap gap-4 p-4">
        {!isDashboard && (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/quienes">¿Quiénes Somos?</Link>
            <Link to="/servicios">Solicitar Asesoría</Link>
            <Link to="/biblioteca">Biblioteca</Link>
            <Link to="/boletines">Boletines Contables</Link>
            <Link to="/naf">NAF</Link>
            <Link to="/galeria">Galería</Link>
          </>
        )}

        {isDashboard && user && (
          <>
            {rol === 1 && (
              <>
                {commonLinks("/dashboard-admin")}
                {roleSpecificLinks[1]}
              </>
            )}
            {rol === 2 && (
              <>
                {commonLinks("/dashboard-editor")}
                {roleSpecificLinks[2]}
              </>
            )}
            {rol === 3 && (
              <>
                {commonLinks("/dashboard-usuario")}
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
