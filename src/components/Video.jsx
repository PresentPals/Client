import React, { useEffect, useState } from 'react';


const PexelsVideoPlayer = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'hXzKnW38kY2Vze8RdG3gucHmly76L3M6bHzbIS0w1eWlxSl7yANi9m6h';  // PresentPals Pexels API Key

  useEffect(() => {
    if (!videoId) return;

    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://api.pexels.com/videos/videos/${videoId}`, {
          headers: {
            Authorization: API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const video = await response.json();

        // Extract video details
        const videoTitle = video?.title || "Pexels Video";
        const videoUrl = video?.url;
        const videoFileLink = video?.video_files?.find(file => file.quality === 'hd')?.link || video?.video_files?.[0]?.link;

        if (!videoFileLink) {
          throw new Error('No video file available');
        }

        setVideoData({
          title: videoTitle,
          url: videoUrl,
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
  }, [videoId]);

  if (loading) return <div>Loading video...</div>;
  if (error) return <div>{error}</div>;

  return videoData ? (
    <div className='mt-5'>

      {/* Render video player */}
      <video controls autoPlay muted loop width="100%">
        <source src={videoData.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <footer> &copy;2025. Video from Pexels.</footer>
    </div>
  ) : null;
};

export default PexelsVideoPlayer;
