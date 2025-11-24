import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login")
      } else {
        setUser(currentUser)
      }
    })
    return () => unsubscribe()
  }, [navigate])

  return (
    <div className="container mt-4">
      <h2>Bienvenido {user?.email}</h2>
      <p>Explora nuestros amigurumis y adopta tus favoritos.</p>
    </div>
  )
}
