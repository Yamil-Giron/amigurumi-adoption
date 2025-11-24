import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Adopt from "./pages/Adopt"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import Checkout from "./pages/Checkout"
import Cart from "./pages/Cart"
import Redeem from "./pages/Redeem"
import Confirmation from "./pages/Confirmation"
import './styles/Global.css'

export default function App() {
  const location = useLocation()
  const hideNavbar = ["/login", "/register"].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/adopt" element={<PrivateRoute><Adopt /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/confirmation" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
        <Route path="/redeem" element={<PrivateRoute><Redeem /></PrivateRoute>} /> {/* 👈 nueva ruta */}
      </Routes>
    </>
  )
}
