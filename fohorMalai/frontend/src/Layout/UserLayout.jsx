import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="p-2">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
