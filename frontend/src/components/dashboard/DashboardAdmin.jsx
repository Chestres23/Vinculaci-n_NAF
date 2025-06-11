import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import MainContent from "../layout/MainContent";
import Servicios from "../asesoria/SolicitarAsesoria";
import Biblioteca from "../biblioteca/Biblioteca";
import Boletines from "../boletines/Boletines";
import Galeria from "../buttons/Galeria";
import Quienes from "../buttons/Quienes";
import NAF from "../buttons/NAF";
import Asesoria from "../asesoria/AsesoriasSolicitadas";

import CrearUsuario from "../users/CrearUsuario";
import EditarUsuario from "../users/EditarUsuario";
import EliminarUsuario from "../users/EliminarUsuario";
import VerUsuario from "../users/VerUsuario";
import UserManager from "../users/UserManager";
import PerfilUsuario from "../users/PerfilUsuario";

import BoletinManager from "../boletines/BoletinManager";
import CrearBoletin from "../boletines/CrearBoletin";
import EditarBoletin from "../boletines/EditarBoletin";
import EliminarBoletin from "../boletines/EliminarBoletin";

import LibroManager from "../biblioteca/LibroManager";
import CrearLibro from "../biblioteca/CrearLibro";
import EditarLibro from "../biblioteca/EditarLibro";
import EliminarLibro from "../biblioteca/EliminarLibro";


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
      <Route path="perfil" element={<PerfilUsuario />} />

      <Route path="ver-asesorias" element={<Asesoria />} />

      {/* Rutas para gestión de boletines */}
      <Route path="boletines-manager" element={<BoletinManager />} />
      <Route path="boletines-manager/crear" element={<CrearBoletin />} />
      <Route path="boletines-manager/editar/:id" element={<EditarBoletin />} />
      <Route
        path="boletines-manager/eliminar/:id"
        element={<EliminarBoletin />}
      />

      {/* Rutas para gestión de libros */}
      <Route path="libros-manager" element={<LibroManager />} />
      <Route path="libros-manager/crear" element={<CrearLibro />} />
      <Route path="libros-manager/editar/:id" element={<EditarLibro />} />
      <Route path="libros-manager/eliminar/:id" element={<EliminarLibro />} />

      {/* Redirección por defecto */}

      <Route path="*" element={<Navigate to="inicio" />} />
    </Routes>

    <Footer />
  </>
);

export default DashboardAdmin;
