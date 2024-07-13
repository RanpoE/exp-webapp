import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = () => {
    const { logged } = JSON.parse(localStorage.getItem('userInfo'), '') || false

    return logged ? <Outlet /> : <Navigate to="/" replace />
}
