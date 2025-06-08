import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Servicios from "../buttons/Servicios";
import NAF from "../buttons/NAF";
import Biblioteca from "../buttons/Biblioteca";
import Boletines from "../buttons/Boletines";
import Quienes from "../buttons/Quienes";
import Galeria from "../buttons/Galeria";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="content flex-grow">
        <Routes>
          <Route index element={<MainContent />} /> {/* <-- Aquí está la raíz '/' */}
          <Route path="servicios" element={<Servicios />} />
          <Route path="naf" element={<NAF />} />
          <Route path="biblioteca" element={<Biblioteca />} />
          <Route path="boletines" element={<Boletines />} />
          <Route path="quienes" element={<Quienes />} />
          <Route path="galeria" element={<Galeria />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
