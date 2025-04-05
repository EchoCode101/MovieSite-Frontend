import { Link } from "react-router-dom";

const Fof = () => {
  return (
    <>
      <div className="page-404 section--bg" data-bg="/src/assets/img/bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="page-404__wrap">
                <div className="page-404__content">
                  <h1 className="page-404__title">404</h1>
                  <p className="page-404__text">
                    The page you are looking for not available!
                  </p>
                  <Link to="/dashboard" className="page-404__btn a-tag">
                    go back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Fof;
