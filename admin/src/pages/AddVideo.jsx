import { useState } from "react";
import { toastPromise } from "../utils/js/toastUtils";
import { createVideo } from "../../services/allRoutes";
import { toast } from "react-toastify";
import CloudinaryUploader from "../components/CloudinaryUploader";

const AddVideo = () => {
  const availableTags = [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
  ];
  const resolutions = [
    { id: "FullHD", name: "FullHD" },
    { id: "HD", name: "HD" },
  ];
  const video_format = [
    { id: "MP4", name: "MP4" },
    { id: "AVI", name: "AVI" },
    { id: "MKV", name: "MKV" },
  ];
  const license_type = [
    { id: "Standard", name: "Standard" },
    { id: "Creative Commons", name: "Creative Commons" },
    { id: "Royalty-Free", name: "Royalty-Free" },
  ];
  const [formData, setFormData] = useState({
    title: "", // Required
    description: "", // Optional
    video_url: "", // URL or file upload
    thumbnail_url: "", // URL or file upload
    duration: "", // Optional
    resolution: "FullHD", // Default value
    file_size: "", // Optional
    category: "", // Optional
    language: "", // Optional
    age_restriction: false, // Boolean, default false
    published: true, // Boolean, default true
    seo_title: "", // Optional
    seo_description: "", // Optional
    license_type: "", // Optional
    access_level: "Free", // Default value
    video_format: "", // Optional
    tags: [], // Will hold selected tag IDs
    custom_metadata: {}, // Optional for flexibility
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("video", file); // Match backend's multer field name

    const response = await fetch("http://localhost:7100/api/upload-video", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    // setVideoUrl(data.videoUrl);
    console.log("Uploaded Video URL:", data.videoUrl);
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const fileUrl = await handleUpload(files[0]);
    setFormData((prev) => ({ ...prev, [name]: fileUrl }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.video_url) {
      toast.error("Title and video URL are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newVideo = await toastPromise(
        createVideo(formData),
        "Creating video...",
        "Video created successfully!",
        "Failed to create video. Please try again."
      );
      console.log("New Video:", newVideo);
    } catch (error) {
      console.error("Error creating video:", error);
    }
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
              <form onSubmit={handleSubmit} className="form">
                <div className="row">
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
                            value={formData.thumbnail_url}
                            onChange={handleFileChange}
                          />
                          <img id="form__img" src="#" alt=" " />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-7 form__content">
                    <div className="row">
                      <div className="col-12">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            required
                            placeholder="Enter video title"
                            value={formData.title}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form__group">
                          <textarea
                            id="text"
                            name="description"
                            className="form__textarea"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Release year"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Running timed in minutes"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <select
                            className="js-example-basic-single"
                            id="quality"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                resolution: Array.from(
                                  e.target.selectedOptions
                                ).map((option) => option.value),
                              })
                            }
                          >
                            {resolutions.map((tag) => (
                              <option key={tag.id} value={tag.id}>
                                {tag.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <select
                            className="js-example-basic-single"
                            id="video_format"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                resolution: Array.from(
                                  e.target.selectedOptions
                                ).map((option) => option.value),
                              })
                            }
                          >
                            {video_format.map((tag) => (
                              <option key={tag.id} value={tag.id}>
                                {tag.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <select
                            className="js-example-basic-single"
                            id="license_type"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                resolution: Array.from(
                                  e.target.selectedOptions
                                ).map((option) => option.value),
                              })
                            }
                          >
                            {license_type.map((tag) => (
                              <option key={tag.id} value={tag.id}>
                                {tag.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <select
                            className="js-example-basic-multiple"
                            id="age_restriction"
                            value={formData.age_restriction}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                age_restriction: e.target.value === "true",
                              })
                            }
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-lg-6">
                        <div className="form__group">
                          <select
                            className="js-example-basic-multiple"
                            id="country"
                            multiple="multiple"
                          >
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">
                              Cote D&apos;ivoire
                            </option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea">Korea</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">
                              Lao People&apos;s Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">
                              Libyan Arab Jamahiriya
                            </option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">
                              Russian Federation
                            </option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">
                              Syrian Arab Republic
                            </option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-lg-6">
                        <div className="form__group">
                          <select
                            className="js-example-basic-multiple"
                            id="tags"
                            multiple="multiple"
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                tags: Array.from(e.target.selectedOptions).map(
                                  (option) => option.value
                                ),
                              }))
                            }
                          >
                            {availableTags.map((tag) => (
                              <option key={tag.id} value={tag.id}>
                                {tag.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form__gallery">
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <ul className="form__radio">
                      <li>
                        <span>Item type:</span>
                      </li>
                      <li>
                        <input id="type1" type="radio" name="type" checked="" />
                        <label htmlFor="type1">Movie</label>
                      </li>
                      <li>
                        <input id="type2" type="radio" name="type" />
                        <label htmlFor="type2">TV Show</label>
                      </li>
                    </ul>
                  </div>

                  <div className="col-12">
                    <div className="row">
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
                      <div className="col-12 col-lg-3">
                        <div className="form__video">
                          <label id="movie1" htmlFor="form__video-upload">
                            Upload video
                          </label>
                          <CloudinaryUploader />
                          {/* <input
                            data-name="#movie1"
                            id="form__video-upload"
                            name="movie"
                            className="form__video-upload"
                            type="file"
                            accept="video/mp4,video/x-m4v,video/*"
                            onChange={handleFileChange}
                          /> */}
                        </div>
                      </div>
                      <div className="col-12 col-lg-3">
                        <div className="form__group form__group--link">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="or add a link"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-3">
                        <div className="form__group">
                          <label>
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
                            Published
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="form__btn">
                          publish
                        </button>
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

export default AddVideo; // Use default export
