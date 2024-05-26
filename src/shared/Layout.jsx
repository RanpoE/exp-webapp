import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";

export const Layout = () => {
    return (
        <div className="min-h-screen">
            <TopNav />
            <Outlet />
        </div>
    )
}
