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
import { useSidebar } from '../context/SidebarContext.tsx';

const drawerWidth = 240;
const closedDrawerWidth = 65;

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  isLogout?: boolean;
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
    isLogout: true,
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false); // Changed to false for collapsed default state
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useAuth();
  const { isOpen, setIsOpen } = useSidebar();


  // const handleDrawerToggle1 = () => {
  //   setOpen(!open);
  // };

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
    setOpen(!open);

  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (item: SidebarItem) => {
    if (item.isLogout) {
      setLogoutDialogOpen(true);
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : closedDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : closedDrawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#2C3E50',
              color: '#ECF0F1',
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              overflowX: 'hidden', // Prevent horizontal scroll
            },
          }}
        >
          {/* Sidebar Header with Logo */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: theme.spacing(2),
            minHeight: '64px', // Fixed height for header
          }}>
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                width: open ? '40px' : '30px', 
                height: 'auto', 
                marginRight: open ? theme.spacing(1) : '0',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} 
              onClick={handleDrawerToggle}
            />
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                opacity: open ? 1 : 0,
                transition: 'opacity 0.3s ease',
                marginLeft: theme.spacing(1)
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
                    px: 2.5,
                    backgroundColor:
                      location.pathname === item.path
                        ? '#34495E'
                        : 'transparent',
                    '&:hover': {
                      backgroundColor:
                        location.pathname === item.path
                          ? '#5D6D7E'
                          : '#3B5998',
                    },
                  }}
                  onClick={() => handleNavigation(item)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color:
                        location.pathname === item.path ? '#ECF0F1' : '#BDC3C7',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      visibility: open ? 'visible' : 'hidden',
                      transition: 'all 0.3s ease',
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