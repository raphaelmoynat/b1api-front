
import './App.css'
import Navbar from './components/Navbar'
import Home from "./views/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import CarDetail from "./views/CarDetail.jsx";


function App() {

  return (
      <>
          <Router>
              <Navbar/>
              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="cardetail" element={<CarDetail />} />

              </Routes>


          </Router>

      </>
  )
}

export default App
