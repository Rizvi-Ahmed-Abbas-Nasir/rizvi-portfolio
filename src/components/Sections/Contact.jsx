import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin, FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: FiGithub, label: "GitHub", value: "Rizvi-Ahmed-Abbas-Nasir", href: "https://github.com/Rizvi-Ahmed-Abbas-Nasir", external: true },
  { icon: FiLinkedin, label: "LinkedIn", value: "rizvi-ahmed-abbas-78b489222", href: "https://www.linkedin.com/in/rizvi-ahmed-abbas-78b489222/", external: true },
  { icon: FiPhone, label: "Phone", value: "+91 93728 24575", href: "tel:+919372824575", external: false },
  { icon: FiMapPin, label: "Location", value: "Mumbai, India", href: "https://maps.google.com/?q=Mumbai,India", external: true },
];

const EMAIL = "rizviahmedabbas313@gmail.com";

const slide = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

const Section = styled.section`
  position: relative;
  padding: clamp(2rem, 6vw, 4.5rem) 0 0;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Heading = styled.h2`
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.22em;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 800;
  font-size: clamp(3rem, 10.5vw, 9.5rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  span { display: inline-block; will-change: transform; }
  .gold { color: var(--accent-gold); }
`;

const Cols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  margin-top: clamp(1.5rem, 4vh, 3rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const ColSide = styled.div`
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.5rem);
  font-weight: 600;
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--text-primary);
  text-align: ${({ $right }) => ($right ? "right" : "left")};
  max-width: 280px;
  margin-left: ${({ $right }) => ($right ? "auto" : "0")};

  @media (max-width: 860px) { text-align: left; margin-left: 0; }
`;

const ColMid = styled.p`
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1vw, 0.88rem);
  letter-spacing: 1px;
  line-height: 1.55;
  text-transform: uppercase;
  text-align: justify;
  color: var(--text-secondary);
`;

const MailLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: clamp(2rem, 6vh, 4rem);
  padding: clamp(1.2rem, 3vw, 2.2rem) 0;
  border-top: 1px solid rgba(201, 168, 76, 0.3);
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
  color: var(--accent-gold);
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--accent-gold);
    transform: translateY(101%);
    transition: transform 0.6s var(--ease-out-expo);
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    flex-shrink: 0;
    transition: color 0.4s ease;
  }

  .value {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: clamp(1.4rem, 4.6vw, 4.2rem);
    line-height: 1;
    letter-spacing: -0.02em;
    word-break: break-all;
    transition: color 0.4s ease;
  }

  .arrow {
    font-size: clamp(1.6rem, 4vw, 3.2rem);
    flex-shrink: 0;
    transition: transform 0.5s var(--ease-out-expo), color 0.4s ease;
  }

  &:hover {
    &::before { transform: translateY(0); }
    .label, .value, .arrow { color: #1f1606; }
    .arrow { transform: translate(6px, -6px); }
  }
`;

const Rows = styled.div`
  margin-top: clamp(1.5rem, 4vh, 2.5rem);
`;

const Row = styled.a`
  position: relative;
  display: grid;
  grid-template-columns: 3rem 9rem 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: clamp(1rem, 2.2vw, 1.6rem) 0.2rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.18);
  color: var(--text-primary);
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--accent-gold);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.5s var(--ease-out-expo);
  }

  .num {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: var(--text-muted);
    padding-left: 0.6rem;
    transition: color 0.4s ease;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-gold);
    transition: color 0.4s ease;
  }

  .value {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 700;
    font-size: clamp(1.3rem, 3.2vw, 2.6rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    word-break: break-word;
    transition: color 0.4s ease, transform 0.5s var(--ease-out-expo);
  }

  .arrow {
    font-size: 1.5rem;
    padding-right: 0.6rem;
    color: var(--text-muted);
    transition: transform 0.5s var(--ease-out-expo), color 0.4s ease;
  }

  &:hover {
    &::before { transform: scaleY(1); }
    .num, .label, .value, .arrow { color: #1f1606; }
    .value { transform: translateX(10px); }
    .arrow { transform: translate(4px, -4px); }
  }

  @media (max-width: 700px) {
    grid-template-columns: 2.2rem 1fr auto;
    .label { grid-column: 2 / 4; }
    .value { grid-column: 2 / 3; }
    .arrow { grid-column: 3 / 4; grid-row: 2; }
  }
`;

const Band = styled.div`
  margin-top: clamp(2.5rem, 7vh, 4.5rem);
  background: var(--accent-gold);
  color: #1f1606;
  overflow: hidden;
  padding: 0.9rem 0;
`;

const BandTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${slide} 28s linear infinite;
  will-change: transform;

  .item {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 2vw, 2rem);
    padding-right: clamp(1rem, 2vw, 2rem);
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: clamp(1.6rem, 3.6vw, 3rem);
    line-height: 1.1;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .dot {
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    background: #1f1606;
    flex-shrink: 0;
  }
`;

const BAND_WORDS = ["Open to work", "Full stack", "AI / ML", "Automation", "Mumbai or remote", "Let's talk"];

const renderBand = (hidden) =>
  BAND_WORDS.map((w, i) => (
    <span className="item" key={`${hidden ? "b" : "a"}-${i}`} aria-hidden={hidden || undefined}>
      {w}
      <i className="dot" />
    </span>
  ));

const Contact = () => {
  const headRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const rowsRef = useRef([]);
  const mailRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: headRef.current, start: "top 90%", end: "top 35%", scrub: 0.6 };
      gsap.fromTo(leftRef.current, { xPercent: -45 }, { xPercent: 0, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(rightRef.current, { xPercent: 45 }, { xPercent: 0, ease: "none", scrollTrigger: trigger });

      [mailRef.current, ...rowsRef.current].forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Section id="contact">
      <Inner>
        <Heading ref={headRef}>
          <span ref={leftRef}>Let's Work</span>
          <span ref={rightRef} className="gold">Together</span>
        </Heading>

        <Cols>
          <ColSide $right>Got a project in mind?</ColSide>
          <ColMid>
            I'm open to new opportunities, collaborations and interesting projects. Reach out
            through any channel below and I'll get back to you.
          </ColMid>
          <ColSide>Let's talk.</ColSide>
        </Cols>

        <MailLink ref={mailRef} href={`mailto:${EMAIL}`}>
          <span className="label"><FiMail style={{ verticalAlign: "-2px", marginRight: "0.5rem" }} />Email</span>
          <span className="value">{EMAIL}</span>
          <FiArrowUpRight className="arrow" />
        </MailLink>

        <Rows>
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Row
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel="noopener noreferrer"
                ref={(el) => (rowsRef.current[i] = el)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="label"><Icon />{link.label}</span>
                <span className="value">{link.value}</span>
                <FiArrowUpRight className="arrow" />
              </Row>
            );
          })}
        </Rows>
      </Inner>

      <Band>
        <BandTrack>
          {renderBand(false)}
          {renderBand(true)}
        </BandTrack>
      </Band>
    </Section>
  );
};

export default Contact;
