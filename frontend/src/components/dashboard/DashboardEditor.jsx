import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import MainContent from "../layout/MainContent";
import Servicios from "../asesoria/SolicitarAsesoria";
import Biblioteca from "../buttons/Biblioteca";
import Boletines from "../buttons/Boletines";
import Galeria from "../buttons/Galeria";
import Quienes from "../buttons/Quienes";
import NAF from "../buttons/NAF";
import Asesoria from "../asesoria/AsesoriasSolicitadas";
import UserManager from "../users/UserManager";
import VerUsuario from "../users/VerUsuario";
import PerfilUsuario from "../users/PerfilUsuario";

const DashboardEditor = () => (
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

      <Route path="usuarios" element={<UserManager />} />
      <Route path="usuarios/ver/:uid" element={<VerUsuario />} />
      <Route path="perfil" element={<PerfilUsuario />} />


      <Route path="ver-asesorias" element={<Asesoria />} />

      <Route path="*" element={<Navigate to="inicio" />} />
    </Routes>

    <Footer />
  </>
);

export default DashboardEditor;
