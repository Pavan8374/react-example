// pages/contents/index.tsx
import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService.ts'; // Import contentService
import Spinner from '../components/Spinner.tsx'; // Import Spinner component
import PageBackground from '../components/PageBackground.tsx';
import '../styles/contents.css';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { Box, styled } from '@mui/system';
const ITEMS_PER_PAGE = 10;

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows,
  },
}));

const VideoModeration: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const videoData = await contentService.fetchVideos(currentPage, ITEMS_PER_PAGE);
        setVideos(videoData);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage]);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Moderation Queue</Typography>
      <Grid container spacing={2}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleVideoClick(video)}>
            <StyledCard>

              <CardContent>
                <img
                  src={video.profilePicture || "https://i.ibb.co/2ZSPrY9/anime-8788959-1280.jpg"}
                  alt={video.userName}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <Typography variant="h6" noWrap>{video.userName || "Unknown Business"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description || "No description available."}
                </Typography>
              </CardContent>
              </StyledCard>

            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedVideo && (
        <div className="video-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseVideo}>&times;</span>
            <Typography variant="h6">{selectedVideo.userName || "Unknown Business"}</Typography>
            <video controls>
              <source src={selectedVideo.mediaURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Typography>{selectedVideo.description}</Typography>
          </div>
        </div>
      )}

      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <Typography>Page {currentPage} of {totalPages}</Typography>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </Box>
    </div>
  );
};

const ContentsAnalytics: React.FC = () => {
  const analyticsData = [
    { title: 'Total Videos', value: 1240, change: '+12%', trend: 'up' },
    { title: 'Approved Videos', value: 980, change: '+8%', trend: 'up' },
    { title: 'Pending Moderation', value: 240, change: '-5%', trend: 'down' },
    { title: 'Rejected Videos', value: 20, change: '+1%', trend: 'up' },
  ];

  return (
    <Grid container spacing={3} mb={4}>
      {analyticsData.map((data, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" color="text.secondary">
                  {data.title}
                </Typography>
                {data.trend === 'up' ? (
                  <TrendingUp color="success" />
                ) : (
                  <TrendingDown color="error" />
                )}
              </Box>
              <Typography variant="h5">{data.value.toLocaleString()}</Typography>
              <Typography color={data.trend === 'up' ? 'success.main' : 'error.main'}>
                {data.change} from last month
              </Typography>
            </CardContent>
            </StyledCard>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const Contents: React.FC = () => {
  return (
    <PageBackground variant="adminGeometric">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Content Moderation Dashboard</Typography>
        <ContentsAnalytics />
        <VideoModeration />
      </Container>
    </PageBackground>
  );
};

export default Contents;
