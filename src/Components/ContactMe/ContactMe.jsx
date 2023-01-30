import React from "react";
import "./ContactMe.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const ContactMe = () => {
  return (
    <Row className="contact-container justify-content-center px-5 py-5">
      <Col
        sm={12}
        md={6}
        lg={6}
        className="d-flex justify-content-center align-items-center pb-5 px-5"
      >
        <div className="call mb-5 d-flex justify-content-center align-items-center rounded-4 pt-5" title="+201092487660">
          <p className="text fw-bold fs-3">
            <a href="tel:+201092487662">Call Me</a>{" "}
          </p>
          <i class="fa-solid fa-phone icon"></i>
        </div>
      </Col>
      <Col
        sm={12}
        md={6}
        lg={6}
        className="d-flex justify-content-center align-items-center pb-5"
      >
        <div className="call mb-5 d-flex justify-content-center align-items-center rounded-4 pt-5 " >
          <p className="text fw-bold fs-3">
            <Link to="/emailMe">Email Me</Link>{" "}
          </p>
          <i class="fa-solid fa-envelope icon-email icon"></i>
        </div>
      </Col>
    </Row>
  );
};

export default ContactMe;
