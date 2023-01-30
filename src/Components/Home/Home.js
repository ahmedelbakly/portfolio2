import React from "react";
import "./Home.css";
import Typical from "react-typical";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import myPhoto from "../../assets/images/myPhoto.jpg";
import MyCv from "../../assets/files/MyCv.pdf";

const Home = () => {
  return (
    <Row className="prof-container d-flex align-items-center justify-content-around">
      <Col sm={12} md={6} className="pt-5">
        <div className="coze">
          <a href="https://www.linkedin.com/in/ahmed-gamal-elbakly/">
            {" "}
            <i className="fa-brands fa-linkedin "></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100002722284644">
            {" "}
            <i className="fa-brands fa-facebook text-info"></i>
          </a>

          <a href="https://github.com/ahmedelbakly">
            {" "}
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCCjCyLxIq8Nu1vO82m3ycKw">
            {" "}
            <i className="fa-brands fa-youtube text-danger"></i>
          </a>
        </div>
        <div className="prof-details-name text-center">
          <span className="primary-text text-white h1">
            Hello, I am <span className="highlight-text text-info"> ahmed</span>
          </span>
        </div>
        <div className="prof-details-role text-white text-center">
          <span className="primary-text">
            <h1 className="role text-danger">
              <Typical
                steps={[
                  "Full stack Dev 👨‍💻",
                  3000,
                  "MERN stack dev 💻",
                  3000,
                  "React Dev ⌨",
                  3000,
                ]}
                loop={Infinity}
                wrapper="p"
              />
            </h1>
            <span className="prof-role-tagline text-center py-5 fs-5">
              I can building application with frontend and backend operations!
            </span>
          </span>
          <div className="btn-box d-flex justify-content-center align-align-items-center p-5 ">
            <Link
              className="download btn - btn-danger mx-4 rounded-5 px-4"
              to="/emailMe"
            >
              Hire Me
            </Link>
            <a
              className="download btn - btn-primary mx-4 rounded-5"
              href={MyCv}
              download="my.cv"
            >
              Get Resume
            </a>
          </div>
        </div>
      </Col>
      <Col sm={12} md={6} className=" img-container">
        <img src={myPhoto} alt="" />
      </Col>
    </Row>
  );
};

export default Home;
// <Row className="prof-parent d-flex justify-content-evenly align-items-center bg-dark ps-5">
// <Col sm={12} md={6} className="prof-details text-center pt-5  h-100 ">
//
// </Col>
// <Col sm={12} md={6} className="img-container h-100 ">
//
// </Col>
// </Row>
