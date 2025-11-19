import { useState } from "react";
import { uploadVideoToCloudinary } from "../../services/allRoutes";
import { toast } from "react-toastify";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      toast.error("Please select a video file.");
      return;
    }

    try {
      setProgress(0);
      // Note: Progress tracking would need to be implemented in the API client
      // For now, we'll use the standardized upload function
      const data = await uploadVideoToCloudinary(videoFile);

      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setProgress(100);
        toast.success(data.message || "Video uploaded successfully!");
      } else {
        toast.error(data.message || "Video upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error.message || "An error occurred while uploading the video."
      );
      setProgress(0);
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
