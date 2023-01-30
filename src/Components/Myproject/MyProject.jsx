import React from "react";
import "./myProject.css";
import { Row, Col, Card } from "react-bootstrap";
import { myProject } from "../../myInfo";

const MyProject = () => {
  return (
    <div className="project-container">
      <Row>
        <h2 className="page-title">My Project</h2>
      </Row>
      <Row className="d-flex justify-content-sm-center justify-content-evenly">
        {myProject.map((project) => (
          <Col sm="12" md="6" lg="4" className="">
            <Card
              style={{ width: "18rem" }}
              className="mx-auto my-3 project-card"
            >
              <Card.Img variant="top cardImg" src={project.img} />
              <Card.Body>
                <Card.Title className="project-title fs-4">
                  {project.name}
                </Card.Title>
                <Card.Text></Card.Text>
                <a
                  className="project-link btn btn-primary"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  href={project.url}
                >
                  GitHup Link
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyProject;
