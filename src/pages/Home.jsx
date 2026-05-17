import React from "react";
import styled from "styled-components";

import Hero from "../components/Sections/Hero";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import PortfolioSection from "../components/Sections/home/PortfolioSection";
import HackathonSection from "../components/Sections/home/HackathonSection";
import Contact from "../components/Sections/Contact";
import Marquee from "../components/Marquee";

const Container = styled.div`
  background-color: var(--bg-primary);
`;

/* Ornamental section divider between major sections */
const SectionDivider = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.2;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
  }

  span {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 4px;
    color: var(--accent-gold);
    white-space: nowrap;
    text-transform: uppercase;
  }
`;

const Home = () => {
  return (
    <Container>
      <Hero />
      <Marquee />
      <About />
      <SectionDivider><span>✦</span></SectionDivider>
      <Experience />
      <SectionDivider><span>✦</span></SectionDivider>
      <Skills />
      <SectionDivider><span>✦</span></SectionDivider>
      <PortfolioSection />
      <SectionDivider><span>✦</span></SectionDivider>
      <HackathonSection />
      <SectionDivider><span>✦</span></SectionDivider>
      <Contact />
    </Container>
  );
};

export default Home;
