import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/") // 👈 redirige al Home
    } catch (err) {
      setError("❌ Error al registrarse: " + err.message)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit" className="btn btn-success">Registrarse</button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  )
}
