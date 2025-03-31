// admin/AdminLayout.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemText } from '@mui/material';

// Tes pages admin
import Dashboard from './DashboardAd';
import UserManagement from './UserManagmenet';
import DocumentManagement from './DocumentManagement';
import ActivityLogs from './Activitylogs';

const drawerWidth = 240;

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* La sidebar */}
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
          <ListItem button component={Link} to="/admin/activities">
            <ListItemText primary="Activity Logs" />
         
          </ListItem>
        </List>
      </Drawer>

      {/* Le contenu principal (topbar + pages) */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* La barre du haut */}
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <h2>Admin Panel</h2>
          </Toolbar>
        </AppBar>

        {/* Les sous-routes admin */}
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="activities" element={<ActivityLogs />} />
        </Routes>
      </Box>
    </Box>
  );
}
