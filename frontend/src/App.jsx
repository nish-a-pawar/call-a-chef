import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import "./App.css";
import MealsPage from "./pages/MealsPage";
import Cart from "./pages/Cart.jsx";
import { Toaster } from "react-hot-toast";
import ChefDashboard from "./pages/ChefDashboard.jsx";
import MenuItemDetails from "./components/MenuItemDetails.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Denied from "./pages/Denied.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/menu" element={<MainLayout />}>
          <Route index element={<MealsPage />} />
        </Route>
        <Route path="/item-details/:id" element={<MainLayout />}>
          <Route index element={<MenuItemDetails />} />
        </Route>

        <Route path="/cart" element={<MainLayout />}>
          <Route index element={<Cart />} />
        </Route>
         <Route path="/checkout" element={<MainLayout />}>
          <Route index element={<CheckoutPage />} />
        </Route>
        <Route path="/order-confirmation" element={<MainLayout />}>
          <Route index element={<OrderConfirmation />} />
        </Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/chef-dashboard"
          element={
            <ProtectedRoutes allowedRoles={["Chef"]}>
              <ChefDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
