import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutMe from "./Components/AboutMe/AboutMe";
import ContactMe from "./Components/ContactMe/ContactMe";
import Home from "./Components/Home/Home";
import NavBar from "./Components/Navbar/NavBar";
import Services from "./Components/Srevices/Services";
import {Container} from 'react-bootstrap'
import { SendEmail } from "./Components/ContactMe/SendEmail";
import MyProject from "./Components/Myproject/MyProject";
import PageNotFound from "./Components/PageNotFound/PageNotFound";



function App() {
  return (
    <div className="App ">
      <BrowserRouter>
      <Container fluid>
      <NavBar />
      <Routes>
        <Route path="/portfolio/" element={<Home />} />
        <Route path="/aboutMe" element={<AboutMe />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactMe" element={<ContactMe />} />
        <Route path="/emailMe" element={<SendEmail />} />
        <Route path="/myProject" element={<MyProject />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Container>
       
      </BrowserRouter>
      
    </div>
  );
}

export default App;
