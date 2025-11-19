import { useState } from "react";
import Select from "react-select";
import { toastPromise } from "../utils/js/toastUtils";
import { createVideo } from "../../services/allRoutes";
import { toast } from "react-toastify";
import { COUNTRIES } from "../constants/countries";
import "./AddVideo.css";

const AddVideo = () => {
  const availableTags = [
    { value: 1, label: "Action" },
    { value: 2, label: "Drama" },
  ];

  const resolutions = [
    { value: "SD", label: "SD (480p)" },
    { value: "HD", label: "HD (720p)" },
    { value: "FullHD", label: "FullHD (1080p)" },
    { value: "4K", label: "4K (2160p)" },
  ];

  const video_format = [
    { value: "MP4", label: "MP4" },
    { value: "AVI", label: "AVI" },
    { value: "MKV", label: "MKV" },
  ];

  const license_type = [
    { value: "Standard", label: "Standard" },
    { value: "Creative Commons", label: "Creative Commons" },
    { value: "Royalty-Free", label: "Royalty-Free" },
  ];

  const access_levels = [
    { value: "Free", label: "Free" },
    { value: "Paid", label: "Paid" },
  ];

  const age_restriction_options = [
    { value: false, label: "No" },
    { value: true, label: "Yes" },
  ];

  // Convert COUNTRIES array to react-select format
  const countryOptions = COUNTRIES.map((country) => ({
    value: country,
    label: country,
  }));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "", // Primary video URL (will use selected resolution)
    thumbnail_url: "",
    duration: "",
    resolution: "FullHD", // Default resolution
    file_size: "",
    category: "",
    language: "",
    age_restriction: false,
    published: true,
    seo_title: "",
    seo_description: "",
    license_type: "",
    access_level: "Free",
    video_format: "",
    tags: [],
    gallery: [],
    countries: [],
    // Resolution-specific URLs
    video_urls: {
      SD: "",
      HD: "",
      FullHD: "",
      "4K": "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleResolutionUrlChange = (resolution, url) => {
    setFormData((prev) => ({
      ...prev,
      video_urls: {
        ...prev.video_urls,
        [resolution]: url,
      },
      // Update primary video_url if this is the selected resolution
      video_url: prev.resolution === resolution ? url : prev.video_url,
    }));
  };

  const handleResolutionChange = (selectedOption) => {
    const newResolution = selectedOption.value;
    setFormData((prev) => ({
      ...prev,
      resolution: newResolution,
      // Update primary video_url to match the selected resolution
      video_url: prev.video_urls[newResolution] || "",
    }));
  };

  const handleThumbnailUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target.result;
      setFormData((prev) => ({ ...prev, thumbnail_url: previewUrl }));
      const imgElement = document.getElementById("form__img");
      if (imgElement) {
        imgElement.src = previewUrl;
      }
    };
    reader.readAsDataURL(file);
    // TODO: Upload to Cloudinary and set thumbnail_url to the returned URL
  };

  const handleGalleryUpload = (files) => {
    const fileArray = Array.from(files);
    const galleryUrls = [];
    let loadedCount = 0;

    if (fileArray.length === 0) {
      setFormData((prev) => ({ ...prev, gallery: [] }));
      return;
    }

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        galleryUrls.push(e.target.result);
        loadedCount++;
        if (loadedCount === fileArray.length) {
          setFormData((prev) => ({ ...prev, gallery: galleryUrls }));
        }
      };
      reader.readAsDataURL(file);
    });

    const galleryLabel = document.getElementById("gallery1");
    if (galleryLabel) {
      if (fileArray.length > 1) {
        galleryLabel.textContent = `${fileArray.length} files selected`;
      } else {
        galleryLabel.textContent = fileArray[0].name;
      }
    }
    // TODO: Upload to Cloudinary and set gallery to array of URLs
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (name === "form__img-upload" && files && files[0]) {
      await handleThumbnailUpload(files[0]);
    } else if (name === "gallery" && files && files.length > 0) {
      handleGalleryUpload(files);
    }
  };

  const validateForm = () => {
    if (!formData.title) {
      toast.error("Title is required!");
      return false;
    }
    // Check if at least one resolution URL is provided
    const hasVideoUrl = Object.values(formData.video_urls).some(
      (url) => url && url.trim() !== ""
    );
    if (!hasVideoUrl && !formData.video_url) {
      toast.error("At least one video URL is required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Prepare data for API
      // Use the selected resolution URL as primary, or first available URL
      const primaryVideoUrl =
        formData.video_url ||
        Object.values(formData.video_urls).find(
          (url) => url && url.trim() !== ""
        ) ||
        "";

      const submitData = {
        title: formData.title,
        description: formData.description || undefined,
        video_url: primaryVideoUrl,
        thumbnail_url: formData.thumbnail_url || undefined,
        duration: formData.duration ? Number(formData.duration) : undefined,
        resolution: formData.resolution || "FullHD",
        file_size: formData.file_size ? Number(formData.file_size) : undefined,
        category: formData.category || undefined,
        language: formData.language || undefined,
        age_restriction: formData.age_restriction,
        published: formData.published,
        seo_title: formData.seo_title || undefined,
        seo_description: formData.seo_description || undefined,
        license_type: formData.license_type || undefined,
        access_level: formData.access_level || "Free",
        video_format: formData.video_format || undefined,
        tags:
          formData.tags.length > 0
            ? formData.tags.map((tag) => tag.value)
            : undefined,
        gallery: formData.gallery.length > 0 ? formData.gallery : undefined,
        // Store all resolution URLs and countries in custom_metadata
        custom_metadata: {
          video_urls: formData.video_urls,
          countries:
            formData.countries.length > 0
              ? formData.countries.map((country) => country.value)
              : undefined,
        },
      };

      const newVideo = await toastPromise(
        createVideo(submitData),
        "Creating video...",
        "Video created successfully!",
        "Failed to create video. Please try again."
      );
      console.log("New Video:", newVideo);

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        video_url: "",
        thumbnail_url: "",
        duration: "",
        resolution: "FullHD",
        file_size: "",
        category: "",
        language: "",
        age_restriction: false,
        published: true,
        seo_title: "",
        seo_description: "",
        license_type: "",
        access_level: "Free",
        video_format: "",
        tags: [],
        gallery: [],
        countries: [],
        video_urls: {
          SD: "",
          HD: "",
          FullHD: "",
          "4K": "",
        },
      });
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "40px",
      borderColor: state.isFocused ? "#2f55d4" : "#e0e0e0",
      boxShadow: state.isFocused
        ? "0 0 0 0.2rem rgba(47, 85, 212, 0.25)"
        : "none",
      "&:hover": {
        borderColor: "#2f55d4",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2f55d4"
        : state.isFocused
        ? "#f0f4ff"
        : "white",
      color: state.isSelected ? "white" : "#333",
      "&:active": {
        backgroundColor: "#2f55d4",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#e8ecff",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#2f55d4",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#2f55d4",
      "&:hover": {
        backgroundColor: "#2f55d4",
        color: "white",
      },
    }),
  };

  return (
    <>
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Add New Video</h2>
              </div>
            </div>

            <div className="col-12">
              <form onSubmit={handleSubmit} className="form add-video-form">
                <div className="row">
                  {/* Thumbnail Upload Section */}
                  <div className="col-12 col-md-5 form__cover">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label htmlFor="form__img-upload">
                            Upload cover (190 x 270)
                          </label>
                          <input
                            id="form__img-upload"
                            name="form__img-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                          />
                          <img
                            id="form__img"
                            src={formData.thumbnail_url || "#"}
                            alt="Thumbnail preview"
                            style={{
                              display: formData.thumbnail_url
                                ? "block"
                                : "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* Gallery Upload */}
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label id="gallery1" htmlFor="form__gallery-upload">
                            Upload photos
                          </label>
                          <input
                            data-name="#gallery1"
                            id="form__gallery-upload"
                            name="gallery"
                            className="form__gallery-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            multiple
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Form Content */}
                  <div className="col-12 col-md-7 form__content">
                    <div className="row">
                      {/* Title */}
                      <div className="col-12">
                        <div className="form__group">
                          <input
                            type="text"
                            name="title"
                            className="form__input"
                            required
                            placeholder="Enter video title"
                            value={formData.title}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="col-12">
                        <div className="form__group">
                          <textarea
                            name="description"
                            className="form__textarea"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                          ></textarea>
                        </div>
                      </div>

                      {/* Duration & File Size */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="number"
                            name="duration"
                            className="form__input"
                            placeholder="Duration (minutes)"
                            value={formData.duration}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="number"
                            name="file_size"
                            className="form__input"
                            placeholder="File size (MB)"
                            value={formData.file_size}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Resolution Select */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <Select
                            options={resolutions}
                            value={resolutions.find(
                              (r) => r.value === formData.resolution
                            )}
                            onChange={handleResolutionChange}
                            styles={selectStyles}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select resolution"
                          />
                        </div>
                      </div>

                      {/* Video Format */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <Select
                            options={video_format}
                            value={video_format.find(
                              (f) => f.value === formData.video_format
                            )}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                video_format: option ? option.value : "",
                              }))
                            }
                            styles={selectStyles}
                            isClearable
                            placeholder="Select format"
                          />
                        </div>
                      </div>

                      {/* License Type */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <Select
                            options={license_type}
                            value={license_type.find(
                              (l) => l.value === formData.license_type
                            )}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                license_type: option ? option.value : "",
                              }))
                            }
                            styles={selectStyles}
                            isClearable
                            placeholder="Select license"
                          />
                        </div>
                      </div>

                      {/* Access Level */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <Select
                            options={access_levels}
                            value={access_levels.find(
                              (a) => a.value === formData.access_level
                            )}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                access_level: option ? option.value : "Free",
                              }))
                            }
                            styles={selectStyles}
                            placeholder="Access level"
                          />
                        </div>
                      </div>

                      {/* Age Restriction */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <Select
                            options={age_restriction_options}
                            value={age_restriction_options.find(
                              (a) => a.value === formData.age_restriction
                            )}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                age_restriction: option ? option.value : false,
                              }))
                            }
                            styles={selectStyles}
                            placeholder="Age restriction"
                          />
                        </div>
                      </div>

                      {/* Category & Language */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            name="category"
                            placeholder="Enter category"
                            value={formData.category}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            name="language"
                            placeholder="Enter language"
                            value={formData.language}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Tags Multi-Select */}
                      <div className="col-12 col-lg-3">
                        <div className="form__group">
                          {/* <label className="form__label">Tags</label> */}
                          <Select
                            isMulti
                            options={availableTags}
                            value={formData.tags}
                            onChange={(selected) =>
                              setFormData((prev) => ({
                                ...prev,
                                tags: selected || [],
                              }))
                            }
                            styles={selectStyles}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select tags..."
                          />
                        </div>
                      </div>

                      {/* Countries Multi-Select */}
                      <div className="col-12 col-lg-6">
                        <div className="form__group">
                          {/* <label className="form__label">Countries</label> */}
                          <Select
                            isMulti
                            options={countryOptions}
                            value={formData.countries}
                            onChange={(selected) =>
                              setFormData((prev) => ({
                                ...prev,
                                countries: selected || [],
                              }))
                            }
                            styles={selectStyles}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select countries..."
                            isSearchable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resolution-Specific Video URLs */}
                  <div className="col-12">
                    <div className="form__section">
                      <h3 className="form__section-title">
                        Video URLs by Resolution
                      </h3>
                      <div className="row">
                        {resolutions.map((res) => (
                          <div
                            key={res.value}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <div className="form__group">
                              <label className="form__label">{res.label}</label>
                              <input
                                type="url"
                                className="form__input"
                                placeholder={`Enter ${res.label} URL`}
                                value={formData.video_urls[res.value]}
                                onChange={(e) =>
                                  handleResolutionUrlChange(
                                    res.value,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="form__info">
                        <small>
                          Primary URL (for {formData.resolution}):{" "}
                          <strong>{formData.video_url || "Not set"}</strong>
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* SEO Fields */}
                  <div className="col-12">
                    <div className="form__section">
                      <h3 className="form__section-title">SEO Settings</h3>
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <div className="form__group">
                            <input
                              type="text"
                              name="seo_title"
                              className="form__input"
                              placeholder="SEO Title"
                              value={formData.seo_title}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="form__group">
                            <textarea
                              name="seo_description"
                              className="form__textarea"
                              placeholder="SEO Description"
                              value={formData.seo_description}
                              onChange={handleInputChange}
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                        {/* Published Checkbox */}
                        <div className="col-12">
                          <div className="form__group">
                            <label className="form__checkbox-label">
                              <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    published: e.target.checked,
                                  }))
                                }
                              />
                              <span style={{ color: "#ffffff" }}>
                                Published
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12">
                          <button type="submit" className="form__btn">
                            Publish Video
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddVideo;
