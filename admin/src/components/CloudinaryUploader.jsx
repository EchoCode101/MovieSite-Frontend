import { useState } from "react";

const CloudinaryUploader = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Pre-configured in Cloudinary
    formData.append("folder", "videos"); // Optional folder in Cloudinary

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setVideoUrl(data.secure_url); // Store uploaded video's URL
    console.log("Uploaded Video URL:", data.secure_url);
  };

  return (
    <>
      <input
        data-name="#movie1"
        id="form__video-upload"
        name="movie"
        className="form__video-upload"
        type="file"
        accept="video/*"
        onChange={(e) => handleUpload(e.target.files[0])}
      />
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default CloudinaryUploader;
