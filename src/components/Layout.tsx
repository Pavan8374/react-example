import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar.tsx';
import React from 'react';
import { useSidebar } from '../context/SidebarContext.tsx';
import { useTheme } from '@mui/material';

const drawerWidth = 240;
const closedDrawerWidth = 65;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { 
            sm: `calc(100% - ${isOpen ? drawerWidth : closedDrawerWidth}px)` 
          },
          ml: { 
            sm: `${isOpen ? drawerWidth : closedDrawerWidth}px` 
          },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;