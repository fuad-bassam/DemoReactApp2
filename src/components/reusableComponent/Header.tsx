import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../Context/AuthContext';
import Sidebar from './Sidebar';
import { useLocation, useParams } from 'react-router-dom';
import useAuthService from '../../helpers/AuthService';

const Header: React.FC = () => {
    const { loginUser } = useAuth();
    const { logout } = useAuthService();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { urlId } = useParams();
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    // Route-to-name mapping
    const routeMap: { [key: string]: { name: string, showInSidebar?: boolean } } = {
        '': { name: 'Home', },
        'home': { name: 'Home', showInSidebar: false },
        'dashboard': { name: 'Dashboard' },
        'products': { name: 'Products' },
        'product-create-update': { name: urlId ? 'Product Edit' : 'Product Creation', showInSidebar: false },
        'category-create-update': { name: urlId ? 'Category Edit' : 'Category Creation', showInSidebar: false },
        'variant-create-update': { name: urlId ? 'Variant Edit' : 'Variant Creation', showInSidebar: false },
        'categories': { name: 'Categories' },
        'variants': { name: 'Variants' },
    };
    const getPageName = () => {
        const path = location.pathname.replaceAll("/", "");
        return routeMap[path].name || 'Unknown Page';
    };
    const handleLogout = () => {
        logout();
    };
    return (

        <AppBar position="static" style={{ marginLeft: '0px', }}>
            <Toolbar sx={{
                boxShadow: 3, // Applies a shadow (equivalent to elevation 3)
                borderRadius: 1, // Optional: Add rounded corners
            }} >
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {getPageName()}
                </Typography>
                {loginUser && (
                    <Box display="flex" gap={2} mt={2}>
                        <Button onClick={handleLogout}
                            variant="text" sx={{ color: 'white' }}>
                            Logout
                        </Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {loginUser.name}
                        </Typography>

                    </Box>

                )}
                <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} routeMap={routeMap} />
            </Toolbar>
        </AppBar>
    );
}


export default Header;
