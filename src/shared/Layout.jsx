import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import PersistentDrawerLeft from "./Drawer";

export const Layout = () => {
    return (
        <Box>
            <PersistentDrawerLeft>
                <Outlet />
            </PersistentDrawerLeft>
        </Box>
    )
}
