import Breadcrumb from "../components/Breadcrumb";
import FeatureCard from "../components/FeatureCard";
import PlanCard from "../components/PlanCard";
import PartnersCarousel from "../components/PartnersCarousel";

const About = () => {
  const breadcrumbItems = [
    { label: "Home", link: "index.html" },
    { label: "Contacts", link: null },
  ];

  const features = [
    {
      iconPath:
        "M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z",
      title: "Choose your Plan",
      text: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining.",
    },
    {
      iconPath:
        "M9,10a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V11A1,1,0,0,0,9,10Zm12,1a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H3A1,1,0,0,0,2,6v4a1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V14a1,1,0,0,0-1-1,1,1,0,0,1,0-2ZM20,9.18a3,3,0,0,0,0,5.64V17H10a1,1,0,0,0-2,0H4V14.82A3,3,0,0,0,4,9.18V7H8a1,1,0,0,0,2,0H20Z",
      title: "Create an account",
      text: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first",
    },
    {
      iconPath:
        "M20,2H10A3,3,0,0,0,7,5v7a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V5A3,3,0,0,0,20,2Zm1,10a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1H20a1,1,0,0,1,1,1ZM17.5,8a1.49,1.49,0,0,0-1,.39,1.5,1.5,0,1,0,0,2.22A1.5,1.5,0,1,0,17.5,8ZM16,17a1,1,0,0,0-1,1v1a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V15H4a1,1,0,0,0,0-2H3V12a1,1,0,0,1,1-1A1,1,0,0,0,4,9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H14a3,3,0,0,0,3-3V18A1,1,0,0,0,16,17ZM6,18H7a1,1,0,0,0,0-2H6a1,1,0,0,0,0,2Z",
      title: "Enjoy Punjabi Dub",
      text: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
    },
  ];

  const plans = [
    {
      title: "Regular",
      price: "$11.99",
      features: [
        { text: "Punjabi Dub Originals", isAvailable: true },
        { text: "Switch plans or cancel anytime", isAvailable: true },
        { text: "Stream 65+ top Live", isAvailable: false },
        { text: "TV channels", isAvailable: false },
      ],
    },
    {
      title: "Premium",
      price: "$34.99",
      features: [
        { text: "Punjabi Dub Originals", isAvailable: true },
        { text: "Switch plans or cancel anytime", isAvailable: true },
        { text: "Stream 65+ top Live", isAvailable: true },
        { text: "TV channels", isAvailable: false },
      ],
    },
    {
      title: "Premium + TV channels",
      price: "$49.99",
      features: [
        { text: "Punjabi Dub Originals", isAvailable: true },
        { text: "Switch plans or cancel anytime", isAvailable: true },
        { text: "Stream 65+ top Live", isAvailable: true },
        { text: "TV channels", isAvailable: true },
      ],
    },
  ];

  const partnerLogos = [
    "/src/assets/img/partners/3docean-light-background.png",
    "/src/assets/img/partners/activeden-light-background.png",
    "/src/assets/img/partners/audiojungle-light-background.png",
    "/src/assets/img/partners/codecanyon-light-background.png",
    "/src/assets/img/partners/photodune-light-background.png",
    "/src/assets/img/partners/themeforest-light-background.png",
  ];

  return (
    <>
      <section className="section section--head section--head-fixed">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-6">
              <h1 className="section__title section__title--head">
                Punjabi Dub – Best place for Punjabi Movies movies
              </h1>
            </div>
            <div className="col-12 col-xl-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--pb0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="section__text section__text--small">
                Many desktop publishing packages and
                <a href="#"> web page</a> editors now use Lorem Ipsum as their
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
          </div>

          <div className="row row--grid">
            {features.map((feature, index) => (
              <div className="col-12 col-lg-4" key={index}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">Select Your Plan</h2>
              <p className="section__text">
                No hidden fees, equipment rentals, or installation appointments.
              </p>
            </div>
          </div>

          <div className="row">
            {plans.map((plan, index) => (
              <div
                className={`col-12 col-md-6 col-xl-4 ${
                  index === 1 ? "order-md-1 order-xl-2" : ""
                }`}
                key={index}
              >
                <PlanCard {...plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section section--pb0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PartnersCarousel logos={partnerLogos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
