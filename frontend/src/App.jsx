import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css'
import MealsPage from './pages/MealsPage';
import Cart from './pages/Cart.jsx';
import { Toaster } from "react-hot-toast"
import ChefDashboard from './pages/ChefDashboard.jsx';
import MenuItemDetails from './components/MenuItemDetails.jsx';


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
        
        <Route path="/chef-dashboard" element={<ChefDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
