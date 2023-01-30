import React from 'react'
import {Row, Navbar, Container, Nav} from 'react-bootstrap'
import "./Navbar.css";
import {Link,useLocation}  from "react-router-dom"



const NavBar = () => {
  
   const pathname = useLocation().pathname;
console.log(pathname);
 
  return (
    <Row>
    
    <Navbar bg="" variant='dark' expand="lg" className="navbar px-5 pt-3 sticky-top">
    <Container fluid>
      <Link className={`logo bg-danger px-4 py-2`} to="/portfolio/"> Elbakly dev</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto pt-sm-3 pt-lg-0 ps-lg-5">
          <Link to="/portfolio/" className={`nav-link  ${pathname==="/"? "active":""}`}>Home</Link>
          <Link to="/aboutMe" className={`nav-link  ${pathname==="/aboutMe"? "active":""}`}>About Me</Link>
          <Link to="/services" className={`nav-link  ${pathname==="/services"? "active":""}`}>Services</Link>
          <Link to="/myProject" className={`nav-link  ${pathname==="/myProject"? "active":""}`}>MyProject</Link>
          <Link to="/contactMe" className={`nav-link  ${pathname==="/contactMe"? "active":""}`}>Contact Me</Link>
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </Row>
  )
}

export default NavBar