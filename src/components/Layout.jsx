import Navbar from "./Navbar.jsx"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  )
}
