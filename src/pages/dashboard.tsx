import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Sample data for user and content analytics
const userAnalytics = [
  { title: 'New Users', value: 120, color: '#3f51b5' },
  { title: 'Concurrent Users', value: 75, color: '#4caf50' },
  { title: 'Avg Daily Users', value: 200, color: '#ff9800' },
  { title: 'Avg Monthly Users', value: 1500, color: '#f44336' },
];

const contentAnalytics = [
  { title: 'Total Posts', value: 350, color: '#2196f3' },
  { title: 'Comments Today', value: 45, color: '#9c27b0' },
  { title: 'Likes This Week', value: 1200, color: '#ff5722' },
  { title: 'Shares This Month', value: 300, color: '#ffc107' },
];

// Styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Analytics
      </Typography>
      <Grid container spacing={4}>
        {userAnalytics.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard sx={{ backgroundColor: data.color, color: 'white' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="h4" component="div">
                  {data.value}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Content Analytics
      </Typography>
      <Grid container spacing={4}>
        {contentAnalytics.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard sx={{ backgroundColor: data.color, color: 'white' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="h4" component="div">
                  {data.value}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
