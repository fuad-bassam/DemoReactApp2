import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useAuth } from "../../Context/AuthContext";
import { NavRoutesEnum } from "../../routes/NavRoutes";

const Layout: React.FC = () => {
    const { loginUser } = useAuth();
    if (!loginUser) {
        return <Navigate to={NavRoutesEnum.Login} />;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CssBaseline />
            {/* {false && <Sidebar />} */}
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>

                <Header />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "#f4f6f8",
                        padding: 3,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

        </Box>
    );
};

export default Layout;
