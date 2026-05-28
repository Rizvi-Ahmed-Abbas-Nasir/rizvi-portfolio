import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useContextProvider } from "../utils/GlobleContextProvider";
import gsap from "gsap";

const Container = styled.div`
  position: fixed;
  z-index: 99999;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.75rem 3rem;
  @media (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;

const Logo = styled.a`
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 800;
  font-style: italic;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -0.5px;
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  opacity: 0; /* hidden at top — hero TopBar handles hero branding */
  transition: opacity 0.4s ease;

  .monogram {
    color: var(--accent-gold);
  }

  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: var(--accent-gold);
    border-radius: 50%;
    margin-left: 3px;
    margin-bottom: 3px;
    box-shadow: 0 0 8px rgba(201,168,76,0.5);
  }
`;

const MenuBtn = styled.div`
  height: 38px;
  width: 5.5rem;
  overflow: hidden;
  position: relative;
  top: 0;
  right: 0;
  z-index: 99999;
  cursor: pointer;
  border: 1px solid var(--border-glass);

  .menu_slider {
    position: relative;
    height: 100%;
    width: 100%;

    .btn {
      height: 100%;
      width: 100%;
      background: rgba(13, 11, 8, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      user-select: none;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 2px;
      font-weight: 400;
      color: var(--text-secondary);

      &:nth-of-type(2) {
        position: absolute;
        top: 100%;
        background: var(--accent-gold);
        color: #0d0b08;
      }
    }
  }
`;

const NavContainer = styled.div`
  position: absolute;
  background-color: rgba(13, 11, 8, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(201, 168, 76, 0.1);
  top: 0;
  right: 0;
  height: 38px;
  width: 5.5rem;
  margin: 1.75rem 3rem;
  z-index: 99998;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  opacity: 0;
  z-index: 9999;
`;

const Navlinks = styled.div`
  padding: 3rem;
  padding-top: 6rem;
  height: max-content;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      list-style: none;
      display: block;
      position: relative;
      width: fit-content;
      overflow: hidden;

      a {
        font-size: clamp(2rem, 4vw, 3.2rem);
        color: var(--text-primary);
        font-family: var(--font-display);
        font-weight: 700;
        font-style: italic;
        transition: color 0.3s ease;
        display: flex;
        align-items: baseline;
        gap: 0.5rem;

        .num {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 1px;
          color: var(--accent-gold);
          font-style: normal;
          opacity: 0.7;
          margin-bottom: 0.3rem;
        }

        &:hover {
          color: var(--accent-gold);
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    padding-top: 5rem;
  }
`;

const SocialLinks = styled.div`
  padding: 3rem;
  ul {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    li {
      list-style: none;
      a {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--text-muted);
        cursor: pointer;
        transition: color 0.3s ease;
        &:hover {
          color: var(--accent-gold);
        }
      }
    }
  }
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Links = [
  { title: "Home",       href: "#hero",       num: "01" },
  { title: "About",      href: "#about",      num: "02" },
  { title: "Experience", href: "#experience", num: "03" },
  { title: "Skills",     href: "#skills",     num: "04" },
  { title: "Projects",   href: "#projects",   num: "05" },
  { title: "Contact",    href: "#contact",    num: "06" },
];

const SocialLink = [
  { title: "GitHub",    href: "https://github.com/Rizvi-Ahmed-Abbas-Nasir" },
  { title: "LinkedIn",  href: "https://www.linkedin.com/in/rizvi-ahmed-abbas-78b489222/" },
  { title: "Email",     href: "mailto:rizviahmedabbas313@gmail.com" },
];

const Navbar = () => {
  const { setCursorSettings, locoScroll } = useContextProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const liRefs = useRef([]);
  const socialRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    isOpen && toggleMenu();
  }, [location]);

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen((prev) => !prev);
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (locoScroll) {
        locoScroll.scrollTo(href, { offset: -60 });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      if (isOpen) toggleMenu();
    }
  };

  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (context) => {
        let { isMobile } = context.conditions;
        const width = isOpen ? (isMobile ? "92vw" : "28vw") : "5.5rem";
        const top   = isOpen ? (isMobile ? "-10px" : "-20px") : "0";
        const right = isOpen ? (isMobile ? "-10px" : "-20px") : "0";

        gsap.to(menuRef.current, { y: isOpen ? "-100%" : "0" });

        gsap.to(containerRef.current, {
          height: isOpen ? "80vh" : "38px",
          width,
          top,
          right,
          delay: isOpen ? 0 : 0.4,
          duration: 0.6,
          ease: "power4.out",
          onComplete: () => setIsAnimating(false),
        });

        gsap.set(liRefs.current, { y: isOpen ? 60 : 0 });
        gsap.set(socialRefs.current, { y: isOpen ? 40 : 0 });

        gsap.to(liRefs.current, {
          opacity: isOpen ? 1 : 0,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          delay: isOpen ? 0.3 : 0,
          ease: "power3.out",
        });

        gsap.to(socialRefs.current, {
          opacity: isOpen ? 1 : 0,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          delay: 0.55,
          ease: "power3.out",
        });

        gsap.to(backdropRef.current, {
          opacity: isOpen ? 1 : 0,
          display: isOpen ? "block" : "none",
          delay: isOpen ? 0 : 0.3,
          duration: 0.5,
        });
      }
    );
  }, [isOpen]);

  useEffect(() => {
    // Show logo only after scrolling past the hero (approx 80vh)
    const toggleLogo = () => {
      const threshold = window.innerHeight * 0.8;
      gsap.to(".logo", {
        opacity: window.scrollY > threshold ? 1 : 0,
        duration: 0.4,
      });
    };
    toggleLogo(); // run once on mount
    window.addEventListener("scroll", toggleLogo);
    return () => window.removeEventListener("scroll", toggleLogo);
  }, []);

  return (
    <Container>
      <Nav>
        <Logo href="#hero" className="logo" onClick={(e) => handleNavClick(e, "#hero")}>
          <span className="monogram">R.</span>Abbas<span className="dot" />
        </Logo>

        <MenuBtn
          onClick={toggleMenu}
          onMouseEnter={() => setCursorSettings((p) => ({ ...p, size: 1.5 }))}
          onMouseLeave={() => setCursorSettings((p) => ({ ...p, size: 1 }))}
        >
          <div className="menu_slider" ref={menuRef}>
            <div className="btn"><p>Menu</p></div>
            <div className="btn"><p>Close</p></div>
          </div>
        </MenuBtn>

        <NavContainer ref={containerRef}>
          <Navlinks>
            <ul>
              {Links.map((link, index) => (
                <li key={index} ref={(el) => (liRefs.current[index] = el)}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                    <span className="num">{link.num}</span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </Navlinks>
          <SocialLinks>
            <ul>
              {SocialLink.map((link, index) => (
                <li key={index} ref={(el) => (socialRefs.current[index] = el)}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </SocialLinks>
        </NavContainer>
      </Nav>

      <Backdrop ref={backdropRef} onClick={() => isOpen && toggleMenu()} />
    </Container>
  );
};

export default Navbar;
