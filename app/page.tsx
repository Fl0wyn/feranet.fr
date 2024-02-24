import Contact from "./contact";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";
import Projects from "./projects";
import Skills from "./skills";

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
