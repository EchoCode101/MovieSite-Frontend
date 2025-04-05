import { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", "Sample Video"); // Add required metadata
    formData.append("description", "This is a sample video."); // Add required metadata

    try {
      const response = await axios.post(
        "http://localhost:7100/api/videos/uploadVideoToCloudinary",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      if (response.data.success) {
        setVideoUrl(response.data.videoUrl);
        alert("Video uploaded successfully!");
      } else {
        alert(response.data.message || "Video upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the video.");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
      {videoUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            View Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
