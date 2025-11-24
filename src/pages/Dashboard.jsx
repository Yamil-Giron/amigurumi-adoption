import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import useRewards from "../hooks/useRewards"
import { useCart } from "../context/CartContext"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const { totalComprados, regalosCanjeados, regalosPendientes, faltan } = useRewards()
  const { cart, history } = useCart()

  const [paidMonthly, setPaidMonthly] = useState(Array(12).fill(0))
  const [giftMonthly, setGiftMonthly] = useState(Array(12).fill(0))

  useEffect(() => {
    const monthlyPaid = Array(12).fill(0)
    const monthlyGift = Array(12).fill(0)

    const allItems = [...history, ...cart]

    allItems.forEach(item => {
      if (item.fecha) {
        const month = new Date(item.fecha).getMonth()
        if (item.regalo) {
          monthlyGift[month] += item.cantidad
        } else {
          monthlyPaid[month] += item.cantidad
        }
      }
    })

    setPaidMonthly(monthlyPaid)
    setGiftMonthly(monthlyGift)
  }, [history, cart])

  const chartData = {
    labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    datasets: [
      { label: "Pagados", data: paidMonthly, backgroundColor: "rgba(75,192,192,0.6)" },
      { label: "Regalos", data: giftMonthly, backgroundColor: "rgba(255,206,86,0.6)" }
    ]
  }

  return (
    <div className="container mt-4">
      <h2>📊 Dashboard mensual</h2>
      <ul className="list-group mb-4">
        <li className="list-group-item">Amigurumis comprados: <strong>{totalComprados}</strong></li>
        <li className="list-group-item">Regalos por canjear: <strong>{regalosPendientes}</strong></li>
        <li className="list-group-item">Regalos canjeados: <strong>{regalosCanjeados}</strong></li>
        <li className="list-group-item">Próximo regalo en <strong>{faltan}</strong> adopciones</li>
      </ul>
      <Bar data={chartData} />
    </div>
  )
}
