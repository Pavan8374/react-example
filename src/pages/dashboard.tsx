import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  useTheme,
  Paper,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/system';
import PageBackground from '../components/PageBackground.tsx';
import {
  Person,
  Group,
  Timeline,
  CalendarMonth,
  Article,
  Comment,
  Favorite,
  Share,
  MoreVert,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';

// Sample data with enhanced metrics
const userAnalytics = [
  { 
    title: 'New Users', 
    value: 120, 
    change: +12,
    icon: <Person />,
    color: '#3f51b5',
    progress: 75
  },
  { 
    title: 'Concurrent Users', 
    value: 75, 
    change: -5,
    icon: <Group />,
    color: '#4caf50',
    progress: 62
  },
  { 
    title: 'Avg Daily Users', 
    value: 200, 
    change: +25,
    icon: <Timeline />,
    color: '#ff9800',
    progress: 88
  },
  { 
    title: 'Avg Monthly Users', 
    value: 1500, 
    change: +150,
    icon: <CalendarMonth />,
    color: '#f44336',
    progress: 92
  },
];

const contentAnalytics = [
  { 
    title: 'Total Posts', 
    value: 350, 
    change: +45,
    icon: <Article />,
    color: '#2196f3',
    progress: 78
  },
  { 
    title: 'Comments Today', 
    value: 45, 
    change: -8,
    icon: <Comment />,
    color: '#9c27b0',
    progress: 55
  },
  { 
    title: 'Likes This Week', 
    value: 1200, 
    change: +180,
    icon: <Favorite />,
    color: '#ff5722',
    progress: 85
  },
  { 
    title: 'Shares This Month', 
    value: 300, 
    change: +42,
    icon: <Share />,
    color: '#ffc107',
    progress: 68
  },
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'visible',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -20,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const MetricCard = ({ data }) => {
  const theme = useTheme();
  
  return (
    <StyledCard>
      <IconWrapper sx={{ backgroundColor: data.color }}>
        <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {data.icon}
        </Box>
      </IconWrapper>
      
      <CardContent sx={{ pt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" component="div" fontWeight="500">
              {data.title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold" sx={{ my: 1 }}>
              {data.value.toLocaleString()}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Progress
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ ml: 'auto' }}>
              {data.progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={data.progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: `${data.color}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: data.color,
              }
            }} 
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {data.change > 0 ? (
            <TrendingUp sx={{ color: theme.palette.success.main, mr: 1 }} />
          ) : (
            <TrendingDown sx={{ color: theme.palette.error.main, mr: 1 }} />
          )}
          <Typography 
            variant="body2" 
            color={data.change > 0 ? 'success.main' : 'error.main'}
          >
            {Math.abs(data.change)}
            {' '}
            {data.change > 0 ? 'increase' : 'decrease'}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

function Dashboard() {
  const theme = useTheme();

  return (
    <PageBackground variant="adminDark">
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome back! Here's what's happening with your platform today.
          </Typography>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mb: 4 }} fontWeight="500">
          User Analytics
        </Typography>
        <Grid container spacing={4}>
          {userAnalytics.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MetricCard data={data} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 4 }} fontWeight="500">
          Content Analytics
        </Typography>
        <Grid container spacing={4}>
          {contentAnalytics.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MetricCard data={data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageBackground>
  );
}

export default Dashboard;