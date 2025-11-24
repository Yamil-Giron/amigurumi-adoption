import AmigurumiList from "../components/AmigurumiList.jsx"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import eeveeImg from "../img/eevee.jpeg"

export default function Adopt() {
  const { cart } = useCart()
  const navigate = useNavigate()

  const amigurumis = [
  { id: "AMG-001", nombre: "Storm Truper", descripcion: "Soldado de asalto", precio: 7000, imagen: eeveeImg },
  { id: "AMG-002", nombre: "Flores eternas", descripcion: "Ramo de flores de tela", precio: 5000, imagen: "/img/flores.jpeg" },
  { id: "AMG-003", nombre: "Oso de lana", descripcion: "Osito tejido a crochet", precio: 5000, imagen: "/img/oso.jpeg" },
  { id: "AMG-004", nombre: "Baby Yoda", descripcion: "Grogu versión amigurumi", precio: 5000, imagen: "/img/yoda.jpeg" },
  { id: "AMG-005", nombre: "Eevee", descripcion: "Pokémon amigurumi", precio: 5000, imagen: "/img/eevee.jpeg" },
  { id: "AMG-006", nombre: "Vaporeon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/vaporeon.jpeg" },
  { id: "AMG-007", nombre: "Jolteon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/jolteon.jpeg" },
  { id: "AMG-008", nombre: "Flareon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/flareon.jpeg" },
  { id: "AMG-009", nombre: "Espeon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/espeon.jpeg" },
  { id: "AMG-010", nombre: "Umbreon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/umbreon.jpeg" },
  { id: "AMG-011", nombre: "Leafeon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/leafeon.jpeg" },
  { id: "AMG-012", nombre: "Glaceon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/glaceon.jpeg" },
  { id: "AMG-013", nombre: "Sylveon", descripcion: "Evolución de Eevee", precio: 5000, imagen: "/img/sylveon.jpeg" }
]

  const handleConfirm = () => {
    navigate("/cart")
  }

  return (
    <div className="container mt-4">
      <h2>Selecciona un amigurumi</h2>
      <AmigurumiList amigurumis={amigurumis} />

      {cart.length > 0 && (
        <button className="btn btn-primary mt-3" onClick={handleConfirm}>
          Confirmar y ver carrito
        </button>
      )}
    </div>
  )
}
