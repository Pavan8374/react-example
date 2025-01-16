// src/components/Layout.tsx
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar.tsx';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;