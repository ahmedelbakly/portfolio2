import React from "react";
import "./Services.css";
import { Row, Col, Card } from "react-bootstrap";
import wd from "../../assets/images/wd.png";
import singleApp from "../../assets/images/singleApp.jpeg";
import Commerce from "../../assets/images/Commerce.png";
import app from "../../assets/images/app.png";
const Services = () => {
  return (
    <div className="services-container py-5 m-0">
   <Row>   <h2 className="title">My Services to you</h2></Row>
      <Row className="px-3 py-5">
      <Col sm="6" md="4" lg="3">
      <Card className="bg-dark text-success pb-0">
      <Card.Img src={wd} alt="Card image" />
      <Card.ImgOverlay className="d-flex justify-content-center align align-items-center">
        <Card.Title className="card-title  text-white fs-4 py-2 w-100 rounded-0 ">Web Development</Card.Title> 
      </Card.ImgOverlay>
    </Card>
      </Col>
      <Col sm="6" md="4" lg="3">
      <Card className="bg-dark text-white">
      <Card.Img src={singleApp} alt="Card image" />
      <Card.ImgOverlay className="d-flex justify-content-center align align-items-center">
        <Card.Title className="card-title  text-white fs-4 py-2 w-100 rounded-0 ">Single Web Page App</Card.Title>
       
      </Card.ImgOverlay>
    </Card>
      </Col>
      <Col sm="6" md="4" lg="3">
      <Card className="bg-dark text-white">
      <Card.Img src={Commerce} alt="Card image" />
      <Card.ImgOverlay className="d-flex justify-content-center align align-items-center">
        <Card.Title className="card-title  text-white fs-4 py-2 w-100 rounded-0 "> Web E-Commerce</Card.Title>
      
      </Card.ImgOverlay>
    </Card>
      </Col>
      <Col sm="6" md="4" lg="3">
      <Card className="bg-dark text-white">
      <Card.Img src={app} alt="Card image" />
      <Card.ImgOverlay className="d-flex justify-content-center align align-items-center">
        <Card.Title className="card-title  text-white fs-4 py-2 w-100 rounded-0 ">Web App</Card.Title>
     
      </Card.ImgOverlay>
    </Card>
      </Col>
    
     
     
         
      </Row>
    </div>
  );
};

export default Services;
