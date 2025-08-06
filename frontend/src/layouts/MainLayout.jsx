import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-6 flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
