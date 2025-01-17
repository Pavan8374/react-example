// pages/contents/index.tsx
import React, { useState, useEffect } from 'react';
import '../styles/contents.css';
import { contentService } from '../services/contentService.ts'; // Import contentService
import Spinner from '../components/Spinner.tsx'; // Import Spinner component

const ITEMS_PER_PAGE = 10;

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
    <div className="video-moderation">
      <h1>Video Moderation</h1>
      <div className="video-list">
        {videos.map((video, index) => (
          <div key={index} className="video-card" onClick={() => handleVideoClick(video)}>
            <img
              src={video.profilePicture || "https://i.ibb.co/2ZSPrY9/anime-8788959-1280.jpg"}
              alt={video.userName}
              className="video-thumbnail"
            />
            <h2>{video.userName || "Unknown Business"}</h2>
            <p>{video.description || "No description available."}</p>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="video-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseVideo}>&times;</span>
            <h2>{selectedVideo.userName || "Unknown Business"}</h2>
            <video controls>
              <source src={selectedVideo.mediaURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{selectedVideo.description}</p>
          </div>
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

const Contents: React.FC = () => {
  return (
    <div className="index-page">
      <VideoModeration />
    </div>
  );
};

export default Contents;
