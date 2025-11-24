import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/") // redirige al Home
    } catch (err) {
      setError("❌ Error al iniciar sesión: " + err.message)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>

      {error && <p className="text-danger mt-2">{error}</p>}

      {/* 🔹 Botón para ir a registro */}
      <div className="mt-3 text-center">
        <p>¿No tienes cuenta?</p>
        <Link to="/register" className="btn btn-outline-success">
          Registrarse
        </Link>
      </div>
    </div>
  )
}
