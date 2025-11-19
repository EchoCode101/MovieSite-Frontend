import { useState } from "react";
import PropTypes from "prop-types";
import { createMember } from "../../services/allRoutes";
import { toastPromise } from "../utils/js/toastUtils";
import InputField from "../components/EditUserComp/InputField";
import { getImageWithFallback } from "../utils/imageUtils";
import { toast } from "react-toastify";
import {
  validatePassword,
  validateEmail,
  validateUsername,
} from "../utils/validationUtils";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    subscription_plan: "Free",
    role: "user",
    profile_pic: "",
    first_name: "",
    last_name: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
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
  const validateForm = () => {
    // Basic validation logic
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      toast.error(usernameValidation.error);
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Valid email is required!");
      return false;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Skip API call if validation fails

    setLoading(true);
    try {
      // Remove empty optional fields before sending to API
      const dataToSend = { ...formData };
      if (!dataToSend.profile_pic) delete dataToSend.profile_pic;
      if (!dataToSend.first_name) delete dataToSend.first_name;
      if (!dataToSend.last_name) delete dataToSend.last_name;

      const newUser = await toastPromise(
        createMember(dataToSend),
        "Creating user...",
        "User created successfully!",
        "Failed to create user. Please try again."
      );
      // Clear the form after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
        subscription_plan: "Free",
        role: "user",
        profile_pic: "",
        first_name: "",
        last_name: "",
        status: "Active",
      });
      // User created successfully
    } catch (error) {
      // Error handling is done by toastPromise
    } finally {
      setLoading(false); // Remove loading spinner
    }
  };

  return (
    <>
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Add User</h2>
              </div>
            </div>
            <div className="sign__wrap">
              <div className="row">
                {/* Profile Picture Upload */}
                <div className="col-12 col-md-5">
                  <div className="form__img" style={{ marginBottom: "2rem" }}>
                    <label htmlFor="profile-pic-upload">
                      Upload Profile Picture
                    </label>
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
                  <form
                    className="sign__form sign__form--profile sign__form--first"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-12">
                        <h4 className="sign__title">
                          Profile Details
                          {formData.email && ` ~ ${formData.email} ~`}
                          {!formData.email &&
                            !formData.username &&
                            " ~ New User ~"}
                          {!formData.email &&
                            formData.username &&
                            ` ~ ${formData.username} ~`}
                        </h4>
                      </div>

                      <InputField
                        key="email"
                        htmlFor_id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        inputTitle="Login Email"
                        required={true}
                      />
                      <InputField
                        key="username"
                        htmlFor_id="username"
                        type="text"
                        name="username"
                        placeholder="User123"
                        inputTitle="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required={true}
                      />
                      <InputField
                        key="password"
                        htmlFor_id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="********"
                        inputTitle="Password"
                        required={true}
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
                            Subscription Plan
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
                          disabled={loading} // Disable button during loading
                          type="submit"
                        >
                          {loading ? "Adding User..." : "Add User"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
AddUser.propTypes = {
  onUserAdded: PropTypes.func,
};

export default AddUser;
