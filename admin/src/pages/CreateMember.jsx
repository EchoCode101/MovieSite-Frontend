import { useState } from "react";
import PropTypes from "prop-types";
import { createMember } from "../../services/allRoutes";
import { toastPromise } from "../utils/js/toastUtils";
import InputField from "../components/EditUserComp/InputField";
import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import { toast } from "react-toastify";

const AddUserForm = ({ headerImage }) => {
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
  const validateForm = () => {
    // Basic validation logic
    if (!formData.username) {
      toast.error("Username is required!");
      return false;
    }
    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Valid email is required!");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Skip API call if validation fails

    setLoading(true);
    try {
      const newUser = await toastPromise(
        createMember(formData),
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
      console.log("New User Created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false); // Remove loading spinner
    }
  };

  return (
    <>
      <Header headerImage={headerImage} />

      <DashboardSideBar
        headerImage={headerImage}
        activeLink="sidebar__nav-link--active"
      />

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
                <div className="col-12 col-lg-6">
                  <form
                    className="sign__form sign__form--profile sign__form--first"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-12">
                        <h4 className="sign__title">
                          Profile Details ~ {formData.email || "N/A"} ~
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
                        required={true}
                      />
                      <InputField
                        key="email"
                        htmlFor_id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        inputTitle="Email"
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
                          <select
                            className="js-example-basic-single"
                            id="subscription"
                            name="subscription_plan"
                            value={formData.subscription_plan}
                            onChange={handleInputChange}
                          >
                            <option value="Free">Free</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Ultiamte">Ultiamte</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                        <div className="sign__group">
                          <label className="sign__label" htmlFor="status">
                            Status
                          </label>
                          <select
                            className="js-example-basic-single"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="sign__btn"
                          disabled={loading} // Disable button during loading
                          type="submit"
                          // onClick={handleSave}
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
AddUserForm.propTypes = {
  onUserAdded: PropTypes.func,
  headerImage: PropTypes.string.isRequired,
};

export default AddUserForm;
