import React from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
interface SidebarProps {
    open: boolean;
    handleDrawerToggle: () => void;
    routeMap: { [key: string]: { name: string, showInSidebar?: boolean } };
}

const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle, routeMap }) => {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}>
            <List>
                {Object.keys(routeMap).map((path) => (
                    routeMap[path].showInSidebar !== false && (
                        <ListItemButton key={path} component={Link} to={path} onClick={handleDrawerToggle}>
                            <ListItemText primary={routeMap[path].name} />
                        </ListItemButton>
                    )
                ))}
            </List>
            {/* <List>
                <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/dashboard" onClick={handleDrawerToggle}>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products" onClick={handleDrawerToggle}>
                    <ListItemText primary="Products" />
                </ListItemButton>
                <ListItemButton component={Link} to="/categories" onClick={handleDrawerToggle}>
                    <ListItemText primary="Categories" />
                </ListItemButton>
                <ListItemButton component={Link} to="/variants" onClick={handleDrawerToggle}>
                    <ListItemText primary="Variants" />
                </ListItemButton>
            </List> */}
        </Drawer>
    );
};

export default Sidebar;
