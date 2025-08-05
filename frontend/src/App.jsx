import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
