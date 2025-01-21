// pages/contents.tsx
import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService.ts';
import Spinner from '../components/Spinner.tsx';
import PageBackground from '../components/PageBackground.tsx';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  styled,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
} from '@mui/material';
import {TrendingUp, TrendingDown, Close as CloseIcon } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Types
interface Video {
  contentId: string;
  userName: string;
  description: string;
  profilePicture: string;
  mediaUrl: string;
  contentStatus: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
}

interface StatusChanges {
  [key: string]: number;
}

interface VideoCardProps {
  video: Video;
  onVideoClick: (video: Video) => void;
  onStatusChange: (contentId: string, status: number) => void;
  onSaveStatus: (contentId: string) => void;
  currentStatus: number;
}

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

// Constants
const ITEMS_PER_PAGE = 10;

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const EngagementMetric = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: theme.palette.text.secondary,
  '& svg': {
    fontSize: '1.2rem',
  },
}));

const MetricsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '12px 0',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  marginBottom: '16px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '8px 20px',
  borderRadius: '8px',
  fontWeight: 600,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    maxWidth: '700px', // Reduced from 900px
    width: '85%', // Reduced from 90%
  },
}));

// Components
const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <StyledDialog open={Boolean(video)} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {video.userName || "Unknown Business"}
          </Typography>
          <IconButton onClick={onClose} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '12px',
            }}
            controls
          >
            <source src={video.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {video.description || "No description available."}
        </Typography>
      </DialogContent>
    </StyledDialog>
  );
};

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  onVideoClick, 
  onStatusChange, 
  onSaveStatus, 
  currentStatus 
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <StyledCard>
      <CardContent>
        <Box onClick={() => onVideoClick(video)} sx={{ cursor: 'pointer' }}>
          <img
            src={video.profilePicture || "https://i.ibb.co/2ZSPrY9/anime-8788959-1280.jpg"}
            alt={video.userName}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '12px',
            }}
          />
          <Typography variant="h6" noWrap sx={{ mb: 1 }}>
            {video.userName || "Unknown Business"}
          </Typography>
          
          <MetricsContainer>
            <Tooltip title="Views">
              <EngagementMetric>
                <VisibilityIcon sx={{ color: 'primary.main' }} />
                <Typography variant="body2">
                  {formatNumber(video.viewCount)}
                </Typography>
              </EngagementMetric>
            </Tooltip>
            
            <Tooltip title="Likes">
              <EngagementMetric>
                <LikeIcon sx={{ color: 'error.main' }} />
                <Typography variant="body2">
                  {formatNumber(video.likeCount)}
                </Typography>
              </EngagementMetric>
            </Tooltip>
            
            <Tooltip title="Shares">
              <EngagementMetric>
                <ShareIcon sx={{ color: 'success.main' }} />
                <Typography variant="body2">
                  {formatNumber(video.shareCount)}
                </Typography>
              </EngagementMetric>
            </Tooltip>
          </MetricsContainer>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.description || "No description available."}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" gap={2} alignItems="center">
          <StyledSelect
            value={currentStatus}
            onChange={(e) => onStatusChange(video.contentId, e.target.value as number)}
            fullWidth
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: '8px',
                  marginTop: '8px',
                },
              },
            }}
          >
            <MenuItem value={0}>Published</MenuItem>
            <MenuItem value={1}>Under Review</MenuItem>
            <MenuItem value={2}>Archived</MenuItem>
            <MenuItem value={3}>Rejected</MenuItem>
          </StyledSelect>
          <StyledButton
            startIcon={<SaveIcon />}
            onClick={() => onSaveStatus(video.contentId)}
            sx={{ minWidth: '100px' }}
          >
            Save
          </StyledButton>
        </Box>
      </CardContent>
    </StyledCard>
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
        </Grid>
      ))}
    </Grid>
  );
};

const VideoModeration: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentStatus, setContentStatus] = useState<number>(1);
  const [statusChanges, setStatusChanges] = useState<StatusChanges>({});
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const videoData = await contentService.fetchVideos(currentPage, ITEMS_PER_PAGE, contentStatus);
        setVideos(videoData);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage, contentStatus]);

  const handleStatusChange = (contentId: string, newStatus: number) => {
    setStatusChanges((prev) => ({
      ...prev,
      [contentId]: newStatus,
    }));
  };

  const handleSaveStatus = async (contentId: string) => {
    try {
      setLoading(true);
      if (statusChanges[contentId] !== undefined) {
        await contentService.manageVideo(contentId, statusChanges[contentId]);
        setVideos((prev) =>
          prev.map((video) =>
            video.contentId === contentId
              ? { ...video, contentStatus: statusChanges[contentId] }
              : video
          )
        );
  
        setStatusChanges((prev) => {
          const { [contentId]: _, ...remainingChanges } = prev;
          return remainingChanges;
        });
      }
    } catch (error) {
      console.error('Error saving content status:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Moderation Queue</Typography>

      <Box mb={3}>
        <StyledSelect
          value={contentStatus}
          onChange={(e) => setContentStatus(e.target.value as number)}
          displayEmpty
          fullWidth
          sx={{ maxWidth: '200px' }}
        >
          <MenuItem value={0}>Published</MenuItem>
          <MenuItem value={1}>Under Review</MenuItem>
          <MenuItem value={2}>Archived</MenuItem>
          <MenuItem value={3}>Rejected</MenuItem>
        </StyledSelect>
      </Box>

      <Grid container spacing={3}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <VideoCard
              video={video}
              onVideoClick={setSelectedVideo}
              onStatusChange={handleStatusChange}
              onSaveStatus={handleSaveStatus}
              currentStatus={statusChanges[video.contentId] ?? video.contentStatus}
            />
          </Grid>
        ))}
      </Grid>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <Box mt={3} display="flex" justifyContent="center" alignItems="center" className="pagination">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <Typography>Page {currentPage} of {totalPages}</Typography>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </Box>
    </div>
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