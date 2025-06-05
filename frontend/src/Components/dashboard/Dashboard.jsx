import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Servicios from "../bottons/Servicios";
import NAF from "../bottons/NAF";
import Biblioteca from "../bottons/Biblioteca";
import Boletines from "../bottons/Boletines";
import Quienes from "../bottons/Quienes";
import Galeria from "../bottons/Galeria";

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
