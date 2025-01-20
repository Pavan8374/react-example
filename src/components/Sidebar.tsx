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
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Article as ContentIcon,
  LogoutRounded,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import LogoutDialog from './LogoutDialog.tsx';
import logo from '../assets/images/software-engineer.png';

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
              backgroundColor: '#2C3E50', // Dark blue color for sidebar background
              color: '#ECF0F1', // Light gray for text
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            },
          }}
        >
          {/* Sidebar Header with Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2) }}>
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                width: open ? '40px' : '30px', 
                height: 'auto', 
                marginRight: open ? theme.spacing(1) : theme.spacing(0),
                cursor: 'pointer' // Change cursor to pointer for interactivity
              }} 
              onClick={handleDrawerToggle} // Toggle sidebar on logo click
            />
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                opacity: open ? 1 : 0, // Hide app name when collapsed
                transition: 'opacity 0.3s ease' // Smooth transition for opacity change
              }}
            >
              Admin Panel
            </Typography>
          </Box>

          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: open ? 2 : 'auto',
                    backgroundColor:
                      location.pathname === item.path
                        ? '#34495E' // Darker shade for active item
                        : 'transparent',
                    '&:hover': {
                      backgroundColor:
                        location.pathname === item.path
                          ? '#5D6D7E' // Lighter shade when hovering over active item
                          : '#3B5998', // Hover effect for other items (Facebook blue)
                    },
                  }}
                  onClick={() => handleNavigation(item)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? undefined : 'auto',
                      mr: open ? undefined : 'auto',
                      justifyContent: 'center',
                      color:
                        location.pathname === item.path ? '#ECF0F1' : '#BDC3C7', // Change icon color based on active state
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? undefined : 0,
                      '& .MuiTypography-root': {
                        fontWeight:
                          location.pathname === item.path ? 'bold' : 'normal',
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
