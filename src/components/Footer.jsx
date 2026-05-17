import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import styled from "styled-components";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

const Container = styled.div`
  height: 70vh;
  position: relative;
  background-color: #050403;
  overflow: hidden;

  .text {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 12%;
    user-select: none;
    span {
      font-size: 12vw;
      font-family: var(--font-display);
      font-weight: 800;
      font-style: italic;
      .line .word .char {
        color: transparent;
        -webkit-text-stroke: 1px rgba(201, 168, 76, 0.18);
      }
      .line .word:nth-child(2) { font-style: italic; }
    }
    @media (width <= 1280px) { bottom: 15%; }
    @media (width <= 900px)  { bottom: 18%; }
    @media (width <= 500px)  { bottom: 28%; }
  }

  .sticky {
    margin: 0;
    padding: 0 5rem;
    width: 100%;
    height: 16vh;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(201, 168, 76, 0.1);
    background-color: #050403;

    .links {
      width: 20%;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      a {
        width: fit-content;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        letter-spacing: 1px;
        color: var(--text-muted);
        transition: color 0.3s ease;
        &:hover { color: var(--accent-gold); }
      }
    }
    .socials {
      display: flex;
      gap: 1.25rem;
      a {
        color: var(--text-muted);
        transition: color 0.3s ease, transform 0.3s ease;
        &:hover { color: var(--accent-gold); transform: translateY(-2px); }
      }
    }
    .copyright {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 1px;
      color: var(--text-muted);
      text-align: right;
    }
    @media (width <= 900px) {
      flex-wrap: wrap;
      .copyright { width: 100%; text-align: center; }
    }
    @media (width < 500px) {
      align-items: center;
      padding: 1rem 2rem 0.5rem 2rem;
      .links { width: auto; }
    }
    @media (width < 368px) {
      .links { justify-content: center; flex-direction: row; width: 100%; }
      .socials { justify-content: center; width: 100%; }
    }
  }
  @media (width <= 500px) { height: 55vh; }
`;

const Content = styled.div`
  padding: 5rem 5rem 0 5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .items {
    ul {
      li {
        padding: 0.5rem 0;
        list-style: none;
        opacity: 1;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        a {
          font-family: var(--font-body);
          font-size: 1.2rem;
          text-decoration: none;
          color: var(--text-muted);
          transition: color 0.3s ease;
          &:hover { color: var(--accent-gold); }
        }
      }
      &:hover {
        li { &:is(:not(:hover)) { opacity: 0.4; } }
      }
    }
    &:nth-child(2) { text-align: right; }
  }

  @media (width < 500px) {
    padding: 2.5rem 2.5rem 0 2.5rem;
    .items { ul { li { a { font-size: 1rem; } } } }
  }
`;

const handleAnchorClick = (e, href) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

const Footer = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const splitType = SplitType.create(textRef.current, { tagName: "span" });
    gsap.fromTo(
      splitType.chars,
      { yPercent: 55 },
      {
        yPercent: 8,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: splitType.chars,
          start: "top bottom",
          end: "50% 93%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <Container ref={containerRef}>
      <Content>
        <div className="items">
          <ul>
            <li><a href="#hero"       onClick={(e) => handleAnchorClick(e, "#hero")}>Home</a></li>
            <li><a href="#about"      onClick={(e) => handleAnchorClick(e, "#about")}>About</a></li>
            <li><a href="#experience" onClick={(e) => handleAnchorClick(e, "#experience")}>Experience</a></li>
            <li><a href="#skills"     onClick={(e) => handleAnchorClick(e, "#skills")}>Skills</a></li>
            <li><a href="#projects"   onClick={(e) => handleAnchorClick(e, "#projects")}>Projects</a></li>
            <li><a href="#contact"    onClick={(e) => handleAnchorClick(e, "#contact")}>Contact</a></li>
          </ul>
        </div>
        <div className="items">
          <ul>
            <li><a href="https://github.com/Rizvi-Ahmed-Abbas-Nasir" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/rizvi-ahmed-abbas-78b489222/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:rizviahmedabbas313@gmail.com">Email</a></li>
          </ul>
        </div>
      </Content>

      <div className="text">
        <span ref={textRef}>Rizvi Abbas</span>
      </div>

      <div className="sticky">
        <div className="links">
          <a href="mailto:rizviahmedabbas313@gmail.com">rizviahmedabbas313@gmail.com</a>
          <a href="tel:+919372824575">+91 93728 24575</a>
        </div>
        <div className="socials">
          <a href="https://github.com/Rizvi-Ahmed-Abbas-Nasir" target="_blank" rel="noopener noreferrer">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/rizvi-ahmed-abbas-78b489222/" target="_blank" rel="noopener noreferrer">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:rizviahmedabbas313@gmail.com">
            <FiMail size={18} />
          </a>
          <a href="tel:+919372824575">
            <FiPhone size={18} />
          </a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Rizvi Ahmed Abbas.<br />
          All rights reserved.
        </div>
      </div>
    </Container>
  );
};

export default Footer;
