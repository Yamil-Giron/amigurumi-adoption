import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null)
    })
    return () => unsubscribe()
  }, [])

  if (user === undefined) {
    return <p>Cargando...</p> // mientras se chequea sesión
  }

  return user ? children : <Navigate to="/login" />
}
