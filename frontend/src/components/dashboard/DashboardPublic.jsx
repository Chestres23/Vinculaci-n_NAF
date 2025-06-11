import Header from "../layout/Header";
import Footer from "../layout/Footer";

const DashboardPublic = ({ children }) => (
  <>
    <Header />
    <div className="content flex-grow">{children}</div>
    <Footer />
  </>
);

export default DashboardPublic;
