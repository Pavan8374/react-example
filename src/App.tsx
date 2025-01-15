import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar.tsx';
import React from 'react';
import Contents from './pages/contents.tsx';
import Login from './pages/login.tsx';
import Users from './pages/users.tsx';
import Dashboard from './pages/dashboard.tsx';


const styles = {
  root: {
    padding: "10px"
  }
};
const App = () => {
  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contents" element={<Contents />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;