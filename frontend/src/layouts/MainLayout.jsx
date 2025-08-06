import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] p-4 container mx-auto my-12 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
