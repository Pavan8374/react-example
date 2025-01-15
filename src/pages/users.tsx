import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Sample data for the analytics
const analyticsData = [
  { title: 'New Users', value: 120, color: '#3f51b5' },
  { title: 'Concurrent Users', value: 75, color: '#4caf50' },
  { title: 'Avg Daily Users', value: 200, color: '#ff9800' },
  { title: 'Avg Monthly Users', value: 1500, color: '#f44336' },
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
      <Grid container spacing={4}>
        {analyticsData.map((data, index) => (
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
