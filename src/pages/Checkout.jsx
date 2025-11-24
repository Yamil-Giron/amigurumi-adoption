import { useState, useRef } from "react"
import SimpleReactValidator from "simple-react-validator"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../services/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function Checkout() {
  const { cart, clearCart, setHistory, history } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    entrega: "retiro",
    pago: "transferencia"
  })

  const validator = useRef(new SimpleReactValidator({
    autoForceUpdate: this,
    messages: {
      required: "Este campo es obligatorio",
      email: "Debe ser un correo válido",
      min: "Debe tener al menos :min caracteres"
    }
  }))

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    validator.current.showMessages()
  }

  const handleConfirmCheckout = async () => {
    if (!validator.current.allValid()) {
      validator.current.showMessages()
      return
    }

    try {
      const user = auth.currentUser
      if (!user) {
        alert("Debes iniciar sesión para confirmar la adopción.")
        return
      }

      await addDoc(collection(db, "checkoutHistory"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        datosCliente: formData,
        createdAt: serverTimestamp()
      })

      setHistory([...history, ...cart])
      clearCart()

      // Generar resumen de compra
      const resumenCompra = {
        cliente: `${formData.nombre} ${formData.apellido}`,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        entrega: formData.entrega,
        pago: formData.pago,
        productos: cart.map(i => `${i.nombre} x${i.cantidad}${i.regalo ? " 🎁" : ""}`),
        linkPago: "https://pago-ficticio.com/orden123"
      }

      // Navegar a página de confirmación y pasar resumen
      navigate("/confirmation", { state: { resumen: resumenCompra } })
    } catch (error) {
      console.error("Error en checkout:", error)
    }
  }

  return (
    <div className="container mt-4">
      <h2>💳 Checkout</h2>

      <form className="mb-3">
        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
        {validator.current.message("nombre", formData.nombre, "required|min:2")}

        <input className="form-control mb-2" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
        {validator.current.message("apellido", formData.apellido, "required|min:2")}

        <input className="form-control mb-2" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
        {validator.current.message("direccion", formData.direccion, "required|min:5")}

        <input className="form-control mb-2" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
        {validator.current.message("telefono", formData.telefono, "required|min:8")}

        <input className="form-control mb-2" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} />
        {validator.current.message("correo", formData.correo, "required|email")}

        <select className="form-select mb-2" name="entrega" value={formData.entrega} onChange={handleChange}>
          <option value="retiro">Retiro en tienda</option>
          <option value="envio">Envío a domicilio</option>
        </select>

        <select className="form-select mb-2" name="pago" value={formData.pago} onChange={handleChange}>
          <option value="transferencia">Transferencia bancaria</option>
          <option value="tarjeta">Tarjeta de crédito/débito</option>
          <option value="paypal">PayPal</option>
        </select>
      </form>

      <button className="btn btn-success" onClick={handleConfirmCheckout}>
        Confirmar adopción
      </button>
    </div>
  )
}
