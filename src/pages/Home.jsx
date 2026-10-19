import React from "react";
import styled from "styled-components";

import Hero from "../components/Sections/Hero";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import PortfolioSection from "../components/Sections/home/PortfolioSection";
import Contact from "../components/Sections/Contact";
import Marquee from "../components/Marquee";

const Container = styled.div`
  background-color: var(--bg-primary);
`;

const Home = () => {
  return (
    <Container>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <PortfolioSection />
      <Contact />
    </Container>
  );
};

export default Home;
