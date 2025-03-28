
import './App.css'
import Navbar from './components/Navbar'
import Home from "./views/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import CarDetail from "./views/CarDetail.jsx";
import CreateCar from "./views/CreateCar.jsx";
import EditCar from "./views/EditCar.jsx";


function App() {

  return (
      <>
          <Router>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="/cars/show/:id" element={<CarDetail   />} />
                  <Route path="/cars/create" element={<CreateCar   />} />
                  <Route path={"/cars/update/:id"} element={<EditCar />} />

              </Routes>


          </Router>

      </>
  )
}

export default App
