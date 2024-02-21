import React from "react";
import ReactDOM from "react-dom/client";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import Projects from "./Projects";
import Skills from "./Skills";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Nav />
    <Header />
    <Skills />
    <Projects />
    <Contact />
    <Footer />
  </React.StrictMode>
);
