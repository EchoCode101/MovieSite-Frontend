import PropTypes from "prop-types";
import InputField from "../../components/EditUserComp/InputField";
import { useEffect, useState } from "react";
import { updateMemberById } from "../../../services/allRoutes";
// import { fetchMemberData } from "../../../redux/memberSlice";

const ProfileDetailsForm = ({ profileData = {}, onSave }) => {
  const [formData, setFormData] = useState({
    username: profileData.username || "",
    email: profileData.email || "",
    first_name: profileData.first_name || "",
    last_name: profileData.last_name || "",
    subscription_plan: profileData.subscription_plan || "Free",
    status: profileData.status || "Active",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    $("#subscription, #status").on("change", function () {
      const name = $(this).attr("name");
      const value = $(this).val();
      setFormData((prev) => ({ ...prev, [name]: value }));
    });
  }, []);

  const handleSave = async () => {
    console.log("Saving data:", formData); // Debugging log

    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== profileData[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      try {
        const updatedMember = await updateMemberById(
          profileData.member_id,
          updatedFields
        );
        console.log("Updated Member:", updatedMember);
        onSave(updatedMember);
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      console.log("No changes detected.");
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  // const handleSave = async () => {
  //   const updatedFields = {};
  //   for (const key in formData) {
  //     if (formData[key] !== profileData[key]) {
  //       updatedFields[key] = formData[key];
  //     }
  //   }

  //   if (Object.keys(updatedFields).length > 0) {
  //     try {
  //       const updatedMember = await updateMemberById(
  //         profileData.member_id,
  //         updatedFields
  //       );
  //       console.log("Updated Member:", updatedMember);
  //       onSave(updatedMember);
  //     } catch (error) {
  //       console.error("Error updating member:", error);
  //     }
  //   } else {
  //     console.log("No changes detected.");
  //   }
  // };

  // const handleSave = async () => {
  //   try {
  //     console.log("Form Data to Send:", formData); // Debugging log
  //     const updatedMember = await updateMemberById(
  //       profileData.member_id,
  //       formData
  //     );
  //     // fetchMemberData(profileData.member_id); // Refetch to ensure consistency
  //     console.log("Updated Member Response:", updatedMember);
  //     onSave(updatedMember); // Notify parent component of the updated data
  //   } catch (error) {
  //     console.error("Error updating member:", error);
  //   }
  // };

  return (
    <div className="sign__wrap">
      <div className="row">
        <div className="col-12 col-lg-6">
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
                    {/* <option value="Moderator">Moderator</option> */}
                    <option value="Inactive">Inactive</option>
                  </select>
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
