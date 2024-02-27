import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Container } from "@mui/material";

export const Layout = () => {
    return (
        <Container maxWidth="lg">
            <Navigation />
            <Outlet />
        </Container>
    )
}
