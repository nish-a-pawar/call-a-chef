import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css'
import MealsPage from './pages/MealsPage';
import ChefDashboard from './pages/ChefDashboard.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/menu" element={<MainLayout />}>
          <Route index element={<MealsPage />} />
        </Route>
        
        <Route path="/chef-dashboard" element={<ChefDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
