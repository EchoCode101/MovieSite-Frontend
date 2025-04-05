import Footer from "../components/Footer";
import Header from "../components/Header";
import PropTypes from "prop-types";

const Privacy = ({ headerImage }) => {
  return (
    <>
      <Header headerImage={headerImage} />
      <section className="section section--head section--head-fixed">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-6">
              <h1 className="section__title section__title--head">
                Privacy policy
              </h1>
            </div>

            <div className="col-12 col-xl-6">
              <ul className="breadcrumb">
                <li className="breadcrumb__item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb__item breadcrumb__item--active">
                  Privacy policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--pb0 section--gradient">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="section__text section__text--small">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using
                &apos;Content here, content here&apos;, making it look like
                readable English.
              </p>

              <p className="section__text section__text--small">
                Many desktop publishing packages and
                <a href="#">web page</a> editors now use Lorem Ipsum as their
                default model text, and a search for &apos;lorem ipsum&apos;
                will uncover many web sites still in their infancy. Various
                versions have evolved over the years, sometimes by accident,
                sometimes on purpose (injected humour and the like).
              </p>

              <p className="section__text section__text--small">
                All the Lorem Ipsum generators on the <b>Internet</b> tend to
                repeat predefined chunks as necessary, making this the first
                true generator on the Internet. It uses a dictionary of over 200
                Latin words, combined with a handful of model sentence
                structures, to generate Lorem Ipsum which looks reasonable. The
                generated Lorem Ipsum is therefore always free from repetition,
                injected humour, or non-characteristic words etc.
              </p>
            </div>

            <div className="col-12">
              <div className="section__list">
                <ol>
                  <li>
                    <h4>Determination of personal information of users</h4>
                    <ol>
                      <li>
                        If you are going to use a passage of Lorem Ipsum:
                        <ol>
                          <li>
                            All the Lorem Ipsum generators on the Internet tend
                            to repeat predefined chunks as necessary, making
                            this the first true generator on the Internet.
                          </li>
                          <li>
                            It uses a dictionary of over 200 Latin words,
                            combined with a handful of model sentence
                            structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore
                            always free from repetition, injected humour, or
                            non-characteristic words etc.
                          </li>
                        </ol>
                      </li>
                      <li>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don&apos;t look even slightly believable.
                      </li>
                      <li>
                        Many desktop publishing packages and web page editors
                        now use Lorem Ipsum as their default model text, and a
                        search for &apos;lorem ipsum&apos; will uncover many web
                        sites still in their infancy. Various versions have
                        evolved over the years, sometimes by accident, sometimes
                        on purpose (injected humour and the like).
                      </li>
                    </ol>
                  </li>

                  <li>
                    <h4>
                      Reasons for collecting and processing user personal
                      information
                    </h4>
                    <ol>
                      <li>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters.
                      </li>
                      <li>
                        All the Lorem Ipsum generators on the Internet tend to
                        repeat predefined chunks as necessary, making this the
                        first true generator on the Internet:
                        <ol>
                          <li>
                            It has survived not only five centuries, but also
                            the leap into electronic typesetting, remaining
                            essentially unchanged;
                          </li>
                          <li>
                            It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages;
                          </li>
                          <li>
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like);
                          </li>
                          <li>
                            Many desktop publishing packages and web page
                            editors now use Lorem Ipsum as their default model
                            text;
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
            </div>

            <div className="col-12">
              <p className="section__text section__text--small">
                All the Lorem Ipsum generators on the Internet tend to repeat
                predefined chunks as necessary, making this the first true
                generator on the Internet. It uses a dictionary of over 200
                Latin words, combined with a handful of model sentence
                structures, to generate Lorem Ipsum which looks reasonable. The
                generated Lorem Ipsum is therefore always free from repetition,
                injected humour, or non-characteristic words etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section" hidden>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="partners owl-carousel">
                <a href="#" className="partners__img">
                  <img
                    src="/src/assets/img/partners/3docean-light-background.png"
                    alt=""
                  />
                </a>

                <a href="#" className="partners__img">
                  <img
                    src="/src/assets/img/partners/activeden-light-background.png"
                    alt=""
                  />
                </a>

                <a href="#" className="partners__img">
                  <img
                    src="/src/assets/img/partners/audiojungle-light-background.png"
                    alt=""
                  />
                </a>

                <a href="#" className="partners__img">
                  <img
                    src="/src/assets/img/partners/codecanyon-light-background.png"
                    alt=""
                  />
                </a>

                <a href="#" className="partners__img">
                  <img
                    src="/src/assets/img/partners/photodune-light-background.png"
                    alt=""
                  />
                </a>

                <a href="#" className="partners__img">
                  <img
                    src="/src/assets/img/partners/themeforest-light-background.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer headerImage={headerImage} />
    </>
  );
};
Privacy.propTypes = {
  headerImage: PropTypes.string.isRequired,
};

export default Privacy;
