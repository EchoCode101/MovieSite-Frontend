import MovieTile from "../components/MovieTile";
import CardTile from "../components/CardTile";
import SubscriptionsMovieTile from "../components/SubscriptionsMovieTile";

const FreeUserMainPage = () => {
  const movieTileData = [
    {
      img: "/src/assets/img/home/1.jpg",
      title: "Money Plane",
      genre: "Action",
      tier: "Free",
      year: "2021",
      rating: "9.1",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/2.jpg",
      title: "The Art of Political",
      genre: "Documentary",
      tier: "Free",
      year: "2019",
      rating: "8.3",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/2.jpg",
      title: "Antebellum",
      genre: "Horror",
      tier: "Free",
      year: "2021",
      rating: "7.9",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/3.jpg",
      title: "Kids Next Door",
      genre: "Documentary",
      tier: "Free",
      year: "2017",
      rating: "8.4",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/4.jpg",
      title: "The Empty Man",
      genre: "Horror",
      tier: "Free",
      year: "2020",
      rating: "8.4",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/5.jpg",
      title: "Jungleland",
      genre: "Documentary",
      tier: "Free",
      year: "2020",
      rating: "9.1",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/6.jpg",
      title: "Bad Impulse",
      genre: "History",
      tier: "Free",
      year: "2017",
      rating: "8.8",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/home/7.jpg",
      title: "Tenet",
      genre: "Action",
      tier: "Free",
      year: "2021",
      rating: "7.6",
      link: "FreeUserVidPlayer",
    },
  ];
  const subscriptionTileData = [
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Sports broadcasts",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Psychological films",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Films about space",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Romantic movies",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Movies about the middle ages",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Fairy tales",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Best Movies",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "The best melodramas",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Horror movies",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Russian TV Shows",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Army films",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/11.png",
      subscription_category_title: "Cities of the world",
      detail: "More than 100 movies",
      link: "FreeUserVidPlayer",
    },
  ];
  const cardTileData = [
    {
      img: "/src/assets/img/card/1.png",
      title: "The Good Lord Bird",
      genre: "Action",
      tier: "Free",
      year: "2019",
      rating: "8.3",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/2.png",
      title: "The Art of Political",
      genre: "Comedy",
      tier: "Free",
      year: "2012",
      rating: "8.1",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/3.png",
      title: "12 Years a Slave",
      genre: "History",
      tier: "Free",
      year: "2013",
      rating: "7.9",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/4.png",
      title: "Get On Up",
      genre: "Biography",
      tier: "Free",
      year: "2014",
      rating: "8.8",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/5.png",
      title: "Interview With the Vampire",
      genre: "Horror",
      tier: "Free",
      year: "1994",
      rating: "7.1",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/6.png",
      title: "Pawn Sacrifice",
      genre: "History",
      tier: "Free",
      year: "2015",
      rating: "8.6",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/7.png",
      title: "Operation Finale",
      genre: "Drama",
      tier: "Free",
      year: "2017",
      rating: "7.0",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/8.png",
      title: "Denial",
      genre: "Drama",
      tier: "Free",
      year: "2016",
      rating: "7.6",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/8.png",
      title: "Denial",
      genre: "Drama",
      tier: "Free",
      year: "2016",
      rating: "7.6",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/8.png",
      title: "Denial",
      genre: "Drama",
      tier: "Free",
      year: "2016",
      rating: "7.6",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/8.png",
      title: "Denial",
      genre: "Drama",
      tier: "Free",
      year: "2016",
      rating: "7.6",
      link: "FreeUserVidPlayer",
    },
    {
      img: "/src/assets/img/card/8.png",
      title: "Denial",
      genre: "Drama",
      tier: "Free",
      year: "2016",
      rating: "7.6",
      link: "FreeUserVidPlayer",
    },
  ];
  return (
    <>
      <div className="home home--title">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">
                <b>Best Movies</b> of this season
              </h1>
            </div>
          </div>
        </div>

        <div className="home__carousel owl-carousel" id="flixtv-hero">
          {movieTileData.map((parameters, index) => (
            <MovieTile {...parameters} key={index} />
          ))}
        </div>

        <button
          className="home__nav home__nav--prev"
          data-nav="#flixtv-hero"
          type="button"
        ></button>
        <button
          className="home__nav home__nav--next"
          data-nav="#flixtv-hero"
          type="button"
        ></button>
      </div>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">
                <a href="category.html">Popular</a>
              </h2>
            </div>

            <div className="col-12">
              <div className="section__carousel-wrap">
                <div className="section__carousel owl-carousel" id="popular">
                  {cardTileData.map((parameters, index) => (
                    <CardTile {...parameters} key={index} />
                  ))}
                </div>

                <button
                  className="section__nav section__nav--cards section__nav--prev"
                  data-nav="#popular"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.25 7.72559L16.25 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.2998 1.70124L1.2498 7.72524L7.2998 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="section__nav section__nav--cards section__nav--next"
                  data-nav="#popular"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 7.72559L0.75 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.7002 1.70124L15.7502 7.72524L9.7002 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--pb0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">
                <a href="category.html">Cult classic movies</a>
              </h2>
            </div>

            <div className="col-12">
              <div className="section__carousel-wrap">
                <div className="section__carousel owl-carousel" id="classic">
                  {cardTileData.map((parameters, index) => (
                    <CardTile {...parameters} key={index} />
                  ))}
                </div>

                <button
                  className="section__nav section__nav--cards section__nav--prev"
                  data-nav="#classic"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.25 7.72559L16.25 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.2998 1.70124L1.2498 7.72524L7.2998 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="section__nav section__nav--cards section__nav--next"
                  data-nav="#classic"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 7.72559L0.75 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.7002 1.70124L15.7502 7.72524L9.7002 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--pb0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">
                <a href="category.html">&apos;80s Binge</a>
              </h2>
            </div>

            <div className="col-12">
              <div className="section__carousel-wrap">
                <div className="section__carousel owl-carousel" id="binge">
                  {cardTileData.map((parameters, index) => (
                    <CardTile {...parameters} key={index} />
                  ))}
                </div>

                <button
                  className="section__nav section__nav--cards section__nav--prev"
                  data-nav="#binge"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.25 7.72559L16.25 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.2998 1.70124L1.2498 7.72524L7.2998 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="section__nav section__nav--cards section__nav--next"
                  data-nav="#binge"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 7.72559L0.75 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.7002 1.70124L15.7502 7.72524L9.7002 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--pb0 section--gradient">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">
                <a href="#">Subscriptions</a>
              </h2>
            </div>

            <div className="col-12">
              <div className="section__carousel-wrap">
                <div
                  className="section__carousel owl-carousel"
                  id="subscriptions"
                >
                  {subscriptionTileData.map((parameters, index) => (
                    <SubscriptionsMovieTile {...parameters} key={index} />
                  ))}
                </div>

                <button
                  className="section__nav section__nav--cards section__nav--prev"
                  data-nav="#subscriptions"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.25 7.72559L16.25 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.2998 1.70124L1.2498 7.72524L7.2998 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="section__nav section__nav--cards section__nav--next"
                  data-nav="#subscriptions"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 7.72559L0.75 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.7002 1.70124L15.7502 7.72524L9.7002 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gradient">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title section__title--center">
                Select Your Plan
              </h2>
              <p className="section__text section__text--center">
                No hidden fees, equipment rentals, or installation appointments.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="plans">
                <div className="table-responsive">
                  <table className="plans__table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>
                          <div className="plans__head">
                            <b>REGULAR</b>
                            <p>$11.99</p>
                            <span>/ month</span>
                          </div>
                        </th>
                        <th>
                          <div className="plans__head">
                            <b>PREMIUM</b>
                            <p>$34.99</p>
                            <span>/ month</span>
                          </div>
                        </th>
                        <th>
                          <div className="plans__head">
                            <b>PREMIUM + TV channels</b>
                            <p>$49.99</p>
                            <span>/ month</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="plans__title">
                            {" "}
                            Punjabi Dub Originals
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="plans__title">
                            Get unlimited access to the largest streaming
                            library with no ads
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="plans__title">
                            Watch Live TV online and on supported devices
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="plans__title">
                            Switch plans or cancel anytime
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="plans__title">
                            Record live TV with 50 hours of Cloud DVR storage
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--red">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.596 1.59982L1.60938 17.5865"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.601 17.5961L1.60101 1.5928"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="plans__title">
                            Stream 65+ top Live
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--red">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.596 1.59982L1.60938 17.5865"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.601 17.5961L1.60101 1.5928"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr className="last">
                        <td>
                          <span className="plans__title">TV channels</span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--red">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.596 1.59982L1.60938 17.5865"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.601 17.5961L1.60101 1.5928"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--red">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.596 1.59982L1.60938 17.5865"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.601 17.5961L1.60101 1.5928"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                        <td>
                          <span className="plans__status plans__status--green">
                            <svg
                              width="19"
                              height="14"
                              viewBox="0 0 19 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <button className="plans__btn" type="button">
                            Select plan
                          </button>
                        </td>
                        <td>
                          <button className="plans__btn" type="button">
                            Select plan
                          </button>
                        </td>
                        <td>
                          <button className="plans__btn" type="button">
                            Select plan
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">
                <b>Punjabi</b>Dub Originals
              </h2>
              <p className="section__text">
                Celebrity interviews, trending entertainment stories, and expert
                analysis.
              </p>
            </div>

            <div className="col-12">
              <div className="section__carousel-wrap">
                <div className="section__interview owl-carousel" id="flixtv">
                  <div className="interview">
                    <a href="interview.html" className="interview__cover">
                      <img src="/src/assets/img/interview/1.jpg" alt="" />
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        5:33
                      </span>
                    </a>
                    <h3 className="interview__title">
                      <a href="interview.html">
                        What Was Ben Affleck Planning for His Unmade
                        &apos;Batman&apos; Film?
                      </a>
                    </h3>
                  </div>

                  <div className="interview">
                    <a href="interview.html" className="interview__cover">
                      <img src="/src/assets/img/interview/2.jpg" alt="" />
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        2:41
                      </span>
                    </a>
                    <h3 className="interview__title">
                      <a href="interview.html">
                        A Guide to the Work of Ryan Murphy
                      </a>
                    </h3>
                  </div>

                  <div className="interview">
                    <a href="interview.html" className="interview__cover">
                      <img src="/src/assets/img/interview/3.jpg" alt="" />
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        7:19
                      </span>
                    </a>
                    <h3 className="interview__title">
                      <a href="interview.html">
                        Gugu Mbatha-Raw Shares the Films That Give Her Hope
                      </a>
                    </h3>
                  </div>

                  <div className="interview">
                    <a href="interview.html" className="interview__cover">
                      <img src="/src/assets/img/interview/4.jpg" alt="" />
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        4:58
                      </span>
                    </a>
                    <h3 className="interview__title">
                      <a href="interview.html">
                        Best of 2020: Top Trending Moments
                      </a>
                    </h3>
                  </div>

                  <div className="interview">
                    <a href="interview.html" className="interview__cover">
                      <img src="/src/assets/img/interview/5.jpg" alt="" />
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        3:52
                      </span>
                    </a>
                    <h3 className="interview__title">
                      <a href="interview.html">
                        How Movies and TV Shaped Our Perception of HIV/AIDS
                      </a>
                    </h3>
                  </div>

                  <div className="interview">
                    <a href="interview.html" className="interview__cover">
                      <img src="/src/assets/img/interview/6.jpg" alt="" />
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        3:52
                      </span>
                    </a>
                    <h3 className="interview__title">
                      <a href="interview.html">American Gods</a>
                    </h3>
                  </div>
                </div>

                <button
                  className="section__nav section__nav--interview section__nav--prev"
                  data-nav="#flixtv"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.25 7.72559L16.25 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.2998 1.70124L1.2498 7.72524L7.2998 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="section__nav section__nav--interview section__nav--next"
                  data-nav="#flixtv"
                  type="button"
                >
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 7.72559L0.75 7.72559"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.7002 1.70124L15.7502 7.72524L9.7002 13.7502"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FreeUserMainPage;
