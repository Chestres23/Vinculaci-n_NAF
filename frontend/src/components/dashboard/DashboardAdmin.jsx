import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import MainContent from "../layout/MainContent";
import Servicios from "../buttons/Servicios";
import Biblioteca from "../buttons/Biblioteca";
import Boletines from "../buttons/Boletines";
import Galeria from "../buttons/Galeria";
import Quienes from "../buttons/Quienes";
import NAF from "../buttons/NAF";
import Asesoria from "../buttons/AsesoriasRecibidas";

import CrearUsuario from "../users/CrearUsuario";
import EditarUsuario from "../users/EditarUsuario";
import EliminarUsuario from "../users/EliminarUsuario";
import VerUsuario from "../users/VerUsuario";
import UserManager from "../users/UserManager";

const DashboardAdmin = () => (
  <>
    <Header />
    
      <Routes>
        <Route path="inicio" element={<MainContent />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="biblioteca" element={<Biblioteca />} />
        <Route path="boletines" element={<Boletines />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="quienes" element={<Quienes />} />
        <Route path="naf" element={<NAF />} />

        {/* Rutas para gestión de usuarios */}
        <Route path="usuarios" element={<UserManager />} />
        <Route path="usuarios/crear" element={<CrearUsuario />} />
        <Route path="usuarios/editar/:uid" element={<EditarUsuario />} />
        <Route path="usuarios/eliminar/:uid" element={<EliminarUsuario />} />
        <Route path="usuarios/ver/:uid" element={<VerUsuario />} />

        <Route path="ver-asesorias" element={<Asesoria />} />

        <Route path="*" element={<Navigate to="inicio" />} />
      </Routes>
   
    <Footer />
  </>
);

export default DashboardAdmin;
