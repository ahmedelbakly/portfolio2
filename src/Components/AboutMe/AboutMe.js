import React, { useEffect, useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import "./AboutMe.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { myInfo } from "../../myInfo";
import myImg2 from "../../assets/images/myImg2.jpg";


const AboutMe = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const [btnGroup, setBtnGroup] = useState("skills");
  console.log(btnGroup);
  return (
    <section>
      <Row className="about-container d-flex justify-content-between pt-5 pb-3 px-3 justify-content-sm-center">
        <Col
          sm={8}
          md={6}
          lg={4}
          className="mb-4 align-items-center justify-content-center  "
        >
          <div className="img-box  ">
            <img
              src={myImg2}
              alt=""
              className={`w-100  rounded-5 ${
                btnGroup === "education" ? "img-edu" : "img-base"
              }`}
            />
          </div>
        </Col>
        <Col
          sm={12}
          lg={8}
          className=" d-flex justify-content-start flex-column align-items-lg-center  align-items-sm-center ps-4 align-items-lg-start ps-lg-5 "
        >
          <div className="btn-box ">
            <ButtonGroup className="btn-group">
              <Button
                className="px-lg-5 px-sm-3 fs-6 text-dark fw-bold btn btn-info"
                onClick={() => setBtnGroup("skills")}
              >
                Skills
              </Button>
              <Button
                className="px-lg-5 px-sm-3 fs-6 text-dark fw-bold btn btn-info"
                onClick={() => setBtnGroup("education")}
              >
                Education
              </Button>
             
            </ButtonGroup>
          </div>

          <div className="box-content text-white mt-5 pb-4 ">
            {btnGroup === "skills" ? (
              <ul className=" skills text-dark skills-box d-flex flex-wrap justify-content-center text-center align-items-center">
                {myInfo.skills.map((skill, index) => (
                  <li
                    className={``}
                    key={index}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
            {btnGroup === "education" ? (
              <ul className="education-box">
                {myInfo.educations.map((edu, index) => (
                  <li
                    className={`${index % 2 === 0 ? "moveRight" : "moveLeft"}`}
                    key={index}
                  >
                    {edu}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
            
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default AboutMe;
