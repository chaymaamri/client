import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

// Tes pages admin
import Dashboard from './DashboardAd';
import UserManagement from './UserManagmenet';
import DocumentManagement from './DocumentManagement';
;

const drawerWidth = 240;

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Efface le token et les infos de l'admin du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirige vers la page de connexion admin
    navigate("/admin/signin");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
  }}
>
  <Toolbar>
    {/* Logo ou titre */}
    <h3>Admin Panel</h3>
  </Toolbar>
  <List>
  <ListItem button component={Link} to="/admin">
    <ListItemText primary="Dashboard" />
  </ListItem>
  <ListItem button component={Link} to="/admin/users">
    <ListItemText primary="Users" />
  </ListItem>
  <ListItem button component={Link} to="/admin/documents">
    <ListItemText primary="Documents" />
  </ListItem>
  <ListItem button onClick={handleLogout}>
    <ListItemText primary="Logout" />
  </ListItem>
</List>
</Drawer>

      {/* Contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Topbar avec bouton Logout */}
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <h2 style={{ flexGrow: 1 }}>Admin Panel</h2>
         
          </Toolbar>
        </AppBar>

        {/* Sous-routes admin */}
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="documents" element={<DocumentManagement />} />
          
        </Routes>
      </Box>
    </Box>
  );
}
