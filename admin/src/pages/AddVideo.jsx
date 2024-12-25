import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import PropTypes from "prop-types";

const AddItem = ({ headerImage }) => {
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
                  <h2>Add New Video</h2>
                </div>
              </div>

              <div className="col-12">
                <form action="#" className="form">
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
                              placeholder="Title"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form__group">
                            <textarea
                              id="text"
                              name="text"
                              className="form__textarea"
                              placeholder="Description"
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
                            >
                              <option value="FullHD">FullHD</option>
                              <option value="HD">HD</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                          <div className="form__group">
                            <input
                              type="text"
                              className="form__input"
                              placeholder="Age"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="form__group">
                            {/* countries */}
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="form__group">
                            <select
                              className="js-example-basic-multiple"
                              id="genre"
                              multiple="multiple"
                            >
                              <option value="Action">Action</option>
                              <option value="Animation">Animation</option>
                              <option value="Comedy">Comedy</option>
                              <option value="Crime">Crime</option>
                              <option value="Drama">Drama</option>
                              <option value="Fantasy">Fantasy</option>
                              <option value="Historical">Historical</option>
                              <option value="Horror">Horror</option>
                              <option value="Romance">Romance</option>
                              <option value="Science-fiction">
                                Science-fiction
                              </option>
                              <option value="Thriller">Thriller</option>
                              <option value="Western">Western</option>
                              <option value="Otheer">Otheer</option>
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
                          <input
                            id="type1"
                            type="radio"
                            name="type"
                            checked=""
                          />
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
                        <div className="col-12 col-lg-6">
                          <div className="form__video">
                            <label id="movie1" htmlFor="form__video-upload">
                              Upload video
                            </label>
                            <input
                              data-name="#movie1"
                              id="form__video-upload"
                              name="movie"
                              className="form__video-upload"
                              type="file"
                              accept="video/mp4,video/x-m4v,video/*"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="form__group form__group--link">
                            <input
                              type="text"
                              className="form__input"
                              placeholder="or add a link"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="button" className="form__btn">
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
AddItem.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default AddItem; // Use default export
