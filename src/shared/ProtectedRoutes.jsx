import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = () => {
    const [logged] = useState(true)
    return logged ? <Outlet /> : <Navigate to="/" replace />
}
