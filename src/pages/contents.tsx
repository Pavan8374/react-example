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
  Checkbox,
  useTheme,
  Paper,
} from '@mui/material';
import {TrendingUp, TrendingDown, Close as CloseIcon } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Types
interface Video {
  id: any;
  userName: string;
  description: string;
  profilePicture: string;
  mediaUrl: string;
  contentStatus: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
}
interface VideoSelection {
  contentId: string;
  newStatus: number;
  originalStatus: number;
  isSelected: boolean;
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
  isSelected: boolean;
  onSelectVideo: (contentId: string, isSelected: boolean) => void;
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
  currentStatus, 
  isSelected,
  onSelectVideo
}) => {

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleCardClick = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.controls-area')) {
      onVideoClick(video);
    }
  };
  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click when clicking checkbox
  };

  return (
    <StyledCard>
      <CardContent>
        <Box 
          className="controls-area"
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={2}
        >
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelectVideo(video.id, e.target.checked)}
            color="primary"
            onClick={(e) => e.stopPropagation()}
          />
          <Typography variant="subtitle2">
            Status: {getStatusLabel(video.contentStatus)}
          </Typography>
        </Box>
        
        <Box onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
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
        
        <Box display="flex" gap={2} alignItems="center" className="controls-area">
          <StyledSelect
            value={currentStatus}
            onChange={(e) => onStatusChange(video.id, e.target.value as number)}
            fullWidth
            disabled={!isSelected}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem value={0}>Published</MenuItem>
            <MenuItem value={1}>Under Review</MenuItem>
            <MenuItem value={2}>Archived</MenuItem>
            <MenuItem value={3}>Rejected</MenuItem>
          </StyledSelect>
          <StyledButton
            startIcon={<SaveIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onSaveStatus(video.id);
            }}
            disabled={!isSelected || currentStatus === video.contentStatus}
            sx={{ minWidth: '100px' }}
          >
            Save
          </StyledButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0:
      return 'Published';
    case 1:
      return 'Under Review';
    case 2:
      return 'Archived';
    case 3:
      return 'Rejected';
    default:
      return 'Unknown';
  }
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
  const [selectedVideos, setSelectedVideos] = useState<{ [key: string]: VideoSelection }>({});
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

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

  useEffect(() => {
    fetchVideos();
  }, [currentPage, contentStatus]);

  const handleFilterChange = (newStatus: number) => {
    setContentStatus(newStatus);
    setCurrentPage(1); // Reset to first page when filter changes
    setSelectedVideos({}); // Clear selections when filter changes
  };

  const handleSelectVideo = (id: string, isSelected: boolean) => {
    setSelectedVideos(prev => {
      if (isSelected) {
        const video = videos.find(v => v.id === id);
        if (!video) return prev;
        
        return {
          ...prev,
          [id]: {
            contentId: id,
            newStatus: video.contentStatus,
            originalStatus: video.contentStatus,
            isSelected
          }
        };
      } else {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleStatusChange = (contentId: string, newStatus: number) => {
    setSelectedVideos(prev => {
      const currentSelection = prev[contentId];
      if (!currentSelection) return prev;

      return {
        ...prev,
        [contentId]: {
          ...currentSelection,
          newStatus
        }
      };
    });
  };

  const handleSaveStatus = async (contentId: string) => {
    const videoSelection = selectedVideos[contentId];
    if (!videoSelection || videoSelection.newStatus === videoSelection.originalStatus) {
      return;
    }

    try {
      setLoading(true);
      await contentService.manageVideo(contentId, videoSelection.newStatus);
      await fetchVideos();
      
      setSelectedVideos(prev => {
        const { [contentId]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error('Error saving content status:', error);
    } finally {
      setLoading(false);
    }
  };

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
          onChange={(e) => handleFilterChange(e.target.value as number)}
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
        {videos.map((video) => {
          const selection = selectedVideos[video.id];
          debugger;
          return (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <VideoCard
                video={video}
                currentStatus={selection?.newStatus ?? video.contentStatus}
                isSelected={!!selection?.isSelected}
                onVideoClick={setSelectedVideo}
                onStatusChange={handleStatusChange}
                onSaveStatus={handleSaveStatus}
                onSelectVideo={handleSelectVideo}
              />
            </Grid>
          );
        })}
      </Grid>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <StyledButton
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </StyledButton>
        <Typography>
          Page {currentPage}
        </Typography>
        <StyledButton
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={videos.length < ITEMS_PER_PAGE}
        >
          Next
        </StyledButton>
      </Box>
    </div>
  );
};


const Contents: React.FC = () => {
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
      <Typography variant="h4" gutterBottom>
        Content Moderation Dashboard
      </Typography>
      </Paper>
        <ContentsAnalytics />
        <VideoModeration />
      </Container>
    </PageBackground>
  );
};

export default Contents;