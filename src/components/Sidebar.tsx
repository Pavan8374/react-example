import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  IconButton,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Article as ContentIcon,
  LogoutRounded,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import LogoutDialog from './LogoutDialog.tsx';

const drawerWidth = 240;

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  isLogout?: boolean; // Flag to identify logout item
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <PersonIcon />,
  },
  {
    title: 'Contents',
    path: '/contents',
    icon: <ContentIcon />,
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <LogoutRounded />,
    isLogout: true, // Mark as logout item
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useAuth(); // Use logout function from AuthContext

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/login'); // Navigate to login page
  };

  const handleNavigation = (item: SidebarItem) => {
    if (item.isLogout) {
      setLogoutDialogOpen(true); // Open the logout confirmation dialog
    } else {
      navigate(item.path); // Navigate to the specified path
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : 65,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : 65,
              boxSizing: 'border-box',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'flex-end' : 'center',
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          >
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'inherit' }}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor:
                      location.pathname === item.path
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    },
                  }}
                  onClick={() => handleNavigation(item)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
      open={logoutDialogOpen}
      onClose={() => setLogoutDialogOpen(false)}
      onConfirm={() => {
        setLogoutDialogOpen(false);
        handleLogout();
      }}
    />
    </>
  );
};

export default Sidebar;
