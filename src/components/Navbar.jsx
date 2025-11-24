import { Link, useNavigate } from "react-router-dom"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"
import { useEffect, useState } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Adopciónes en forma de tela</Link>
        {user && (
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/adopt">Adoptar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Acerca de</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Carrito 🛒</Link>
              </li>
              {/* 👇 Nuevo enlace para canjear regalos */}
              <li className="nav-item">
                <Link className="nav-link" to="/redeem">🎁 Canjear regalos</Link>
              </li>
            </ul>
            <span className="navbar-text me-3">{user.email}</span>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
