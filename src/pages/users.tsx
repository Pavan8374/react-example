import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import PageBackground from '../components/PageBackground.tsx';
import { TrendingUp, TrendingDown, People, Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';

const Users = () => {
  const analyticsData = [
    { title: 'Total Users', value: 12420, change: '+14%', trend: 'up', color: 'primary.main' },
    { title: 'Active Users', value: 7580, change: '+7%', trend: 'up', color: 'success.main' },
    { title: 'New Signups', value: 890, change: '-2%', trend: 'down', color: 'warning.main' },
    { title: 'Premium Users', value: 2300, change: '+22%', trend: 'up', color: 'error.main' },
  ];

  const allUsers = [
    { name: 'Alex Thompson', email: 'alex.t@example.com', status: 'active', joinDate: '2024-01-18', planType: 'Premium' },
    { name: 'Sarah Chen', email: 'sarah.c@example.com', status: 'pending', joinDate: '2024-01-17', planType: 'Basic' },
    { name: 'John Doe', email: 'john.d@example.com', status: 'active', joinDate: '2024-01-15', planType: 'Premium' },
    { name: 'Jane Smith', email: 'jane.s@example.com', status: 'inactive', joinDate: '2024-01-14', planType: 'Standard' },
    { name: 'Emily Johnson', email: 'emily.j@example.com', status: 'active', joinDate: '2024-01-10', planType: 'Basic' },
    { name: 'Michael Brown', email: 'michael.b@example.com', status: 'inactive', joinDate: '2024-01-05', planType: 'Premium' },
  ];

  const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-4px)',
      //boxShadow: theme.shadows,
    },
  }));

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter state
  const [filterName, setFilterName] = useState('');
  const [filterPlan, setFilterPlan] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterName('');
    setFilterPlan('');
    setShowActiveOnly(false);
  };

  // Filtered users based on input and toggle
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (showActiveOnly ? user.status === 'active' : true) &&
      (filterPlan ? user.planType === filterPlan : true)
  );
  const theme = useTheme();

  return (
    <PageBackground variant="adminGeometric">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
         <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 3,
                    background: theme.palette.mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(18, 18, 18, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        User Analytics Dashboard
      </Typography>
      </Paper>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {analyticsData.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      {data.title}
                    </Typography>
                    {data.trend === 'up' ? (
                      <TrendingUp fontSize="large" sx={{ color: 'success.main' }} />
                    ) : (
                      <TrendingDown fontSize="large" sx={{ color: 'error.main' }} />
                    )}
                  </Box>
                  <Typography variant="h4" sx={{ color: data.color }} gutterBottom>
                    {data.value.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.change} from last month
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Filters and Table */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2} gap={2}>
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />

                <FormControl variant="outlined">
                  <InputLabel>Subscription Plan</InputLabel>
                  <Select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    label="Subscription Plan"
                  >
                    <MenuItem value="">All Plans</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="Standard">Standard</MenuItem>
                    <MenuItem value="Basic">Basic</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={showActiveOnly}
                      onChange={() => setShowActiveOnly(!showActiveOnly)}
                      color="primary"
                    />
                  }
                  label="Active Users Only"
                />

                <Button variant="outlined" color="secondary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </Box>

              <TableContainer component={Paper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Subscription Plan</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      (rowsPerPage > 0
                        ? filteredUsers.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredUsers
                      ).map((user) => (
                        <TableRow key={user.email} hover>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              {user.status === 'active' ? (
                                <CheckCircle sx={{ color: 'success.main' }} />
                              ) : (
                                <Cancel sx={{ color: 'error.main' }} />
                              )}
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Box>
                          </TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>{user.planType}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Edit">
                              <Button variant="contained" color="info" startIcon={<Edit />}>
                                Edit
                              </Button>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<Delete />}
                                sx={{ ml: 1 }}
                              >
                                Delete
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography>No users found matching the filters.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </PageBackground>
  );
};

export default Users;
