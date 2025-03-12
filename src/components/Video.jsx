import React, { useEffect, useState } from 'react';
import { createClient } from 'pexels';

// this component is getting and playing the video for the Login page. Using an API key from pexels and the pexels library :
const PexelsVideoPlayer = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'hXzKnW38kY2Vze8RdG3gucHmly76L3M6bHzbIS0w1eWlxSl7yANi9m6h';  // PresentPals Pexels API Key

  useEffect(() => {
    if (!videoId) return;

    const client = createClient(API_KEY);

    const fetchVideo = async () => {
      try {
        const video = await client.videos.show({ id: videoId });
        

        // Extract relevant video details
        const videoTitle = video.title;
        const videoDuration = video.duration;
        const videoUrl = video.url;
        const videoFileLink = video.video_files[0]?.link;  // Get the first available video quality

        // Update the state with video data
        setVideoData({
          title: videoTitle,
          url: videoUrl,
          duration: videoDuration,
          videoFile: videoFileLink,
        });

      } catch (error) {
        console.error("Error fetching video:", error);
        setError('Failed to fetch video.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);  // Re-run effect when videoId changes

  // Show loading state while the video data is being fetched
  if (loading) {
    return <div>Loading video...</div>;
  }

  // Show error message if fetching fails
  if (error) {
    return <div>{error}</div>;
  }

  // Render the video player with fetched data
  if (videoData) {
    return (
      <div>
        <h3>{videoData.title}</h3>
        <p><a href={videoData.url} target="_blank" rel="noopener noreferrer"></a></p>
        
        {/* Render video player */}
        <video controls autoPlay muted loop width="100%">
          <source src={videoData.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br></br>
        
        <footer> &copy;2025. Video from Pexels.</footer>
      </div>
    );
  }

  return null;  // Return nothing if no video data is available yet
};

export default PexelsVideoPlayer;
