import Contact from "./pages/contact";
import Footer from "./pages/footer";
import Hero from "./pages/hero";
import Projects from "./pages/projects";
import Skills from "./pages/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
