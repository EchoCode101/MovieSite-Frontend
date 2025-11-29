import PropTypes from "prop-types";
import InputField from "../../components/EditUserComp/InputField";
import { useState, useEffect } from "react";
import { updateMemberById } from "../../../services/allRoutes";
import { showWarningToast, toastPromise } from "../../utils/js/toastUtils";
import { getImageWithFallback } from "../../utils/imageUtils";

const ProfileDetailsForm = ({ profileData = {}, onSave }) => {
  const [formData, setFormData] = useState({
    username: profileData.username || "",
    email: profileData.email || "",
    first_name: profileData.first_name || "",
    last_name: profileData.last_name || "",
    subscription_plan: profileData.subscription_plan || "Free",
    status: profileData.status || "Active",
    profile_pic: profileData.profile_pic || "",
  });

  // Update formData when profileData changes
  useEffect(() => {
    setFormData({
      username: profileData.username || "",
      email: profileData.email || "",
      first_name: profileData.first_name || "",
      last_name: profileData.last_name || "",
      subscription_plan: profileData.subscription_plan || "Free",
      status: profileData.status || "Active",
      profile_pic: profileData.profile_pic || "",
    });
  }, [profileData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showWarningToast("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showWarningToast("Image size should be less than 5MB.");
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const previewUrl = event.target.result;
      setFormData((prev) => ({ ...prev, profile_pic: previewUrl }));
    };
    reader.readAsDataURL(file);
    // TODO: Upload to Cloudinary and set profile_pic to the returned URL
  };

  const handleSave = async () => {
    console.log("Saving data:", formData); // Debugging log

    const updatedFields = {};
    for (const key in formData) {
      // Skip email if it's empty or unchanged (email is disabled and shouldn't be updated)
      if (key === "email") {
        continue;
      }
      if (formData[key] !== profileData[key]) {
        // Skip empty strings for optional fields (except profile_pic which can be empty)
        if (formData[key] === "" && key !== "profile_pic") {
          continue;
        }
        updatedFields[key] = formData[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      try {
        // Use _id from profileData or fallback to member_id
        const memberId = profileData._id || profileData.member_id;
        if (!memberId) {
          showWarningToast("Member ID not found. Cannot update.");
          return;
        }
        const updatedMember = await toastPromise(
          updateMemberById(memberId, updatedFields), // Pass the promise directly
          "Updating user...", // Pending message
          "User updated successfully!", // Success message
          "Failed to update user. Please try again.", // Error message // Error message
          {
            pendingIcon: "🔄", // Custom icon for pending state
            successIcon: "🎉", // Custom icon for success state
            errorIcon: "🚫", // Custom icon for error state
            position: "bottom-right", // Position for all toasts
            autoClose: 5000, // Auto-close time in milliseconds
            pendingOptions: {
              className: "toast-pending", // Custom CSS class for pending
            },
            successOptions: {
              className: "toast-success", // Custom CSS class for success
            },
            errorOptions: {
              className: "toast-error", // Custom CSS class for error
            },
          }
        );

        console.log("Updated Member:", updatedMember);
        // Update was successful, just notify parent to refresh
        // Don't pass the full object as it contains fields like _id, password that shouldn't be sent again
        onSave();
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      console.log("No changes detected.");
      showWarningToast("No changes detected."); // Warn if no changes
    }
  };

  return (
    <div className="sign__wrap">
      <div className="row">
        {/* Profile Picture Upload */}
        <div className="col-12 col-md-5">
          <div
            className="form__img"
            style={{ marginBottom: "2rem", height: "100%" }}
          >
            <label htmlFor="profile-pic-upload">Upload Profile Picture</label>
            <input
              id="profile-pic-upload"
              name="profile-pic-upload"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleProfilePicUpload}
            />
            <img
              src={getImageWithFallback(formData.profile_pic, "user")}
              alt="Profile preview"
              style={{
                display: "block",
                marginTop: "1rem",
              }}
            />
          </div>
        </div>

        <div className="col-12 col-md-7">
          <form className="sign__form sign__form--profile sign__form--first">
            <div className="row">
              <div className="col-12">
                <h4 className="sign__title">
                  Profile Details ~ {formData.email} ~
                </h4>
              </div>
              <InputField
                key="username"
                htmlFor_id="username"
                type="text"
                name="username"
                placeholder="User123"
                inputTitle="Login"
                value={formData.username}
                onChange={handleInputChange}
              />
              <InputField
                key="email"
                htmlFor_id="email"
                type="text"
                name="email"
                placeholder="Can not Change"
                inputTitle="Email"
                value={formData.email}
                disabled={true}
              />
              <InputField
                key="firstname"
                htmlFor_id="firstname"
                type="text"
                name="first_name"
                placeholder="John"
                inputTitle="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <InputField
                key="lastname"
                htmlFor_id="lastname"
                type="text"
                name="last_name"
                placeholder="Doe"
                inputTitle="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
              />

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="sign__group">
                  <label className="sign__label" htmlFor="subscription">
                    Subscription
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      className="sign__input"
                      id="subscription"
                      name="subscription_plan"
                      value={formData.subscription_plan}
                      onChange={handleInputChange}
                      style={{
                        paddingRight: "40px",
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                    >
                      <option value="Free">Free</option>
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Ultimate">Ultimate</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "16px",
                        height: "16px",
                        pointerEvents: "none",
                        fill: "#e0e0e0",
                      }}
                    >
                      <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="sign__group">
                  <label className="sign__label" htmlFor="status">
                    Status
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      className="sign__input"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      style={{
                        paddingRight: "40px",
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "16px",
                        height: "16px",
                        pointerEvents: "none",
                        fill: "#e0e0e0",
                      }}
                    >
                      <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="sign__btn"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ProfileDetailsForm.propTypes = {
  profileData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProfileDetailsForm;
