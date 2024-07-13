import { Login } from "../pages/Login";
import { Navigate } from "react-router-dom";
export function Home() {
    const { logged } = JSON.parse(localStorage.getItem('userInfo', '')) || false

    return (
        logged ? (
            <Navigate to="/dashboard" replace />
        ) : (<Login />)
    )
}
