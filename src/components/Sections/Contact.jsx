import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin } from "react-icons/fi";

const Section = styled.section`
  padding: var(--section-padding) var(--container-padding);
  position: relative;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 0.75rem;
  .italic { font-style: italic; color: var(--accent-gold); }
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 460px;
  line-height: 1.8;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.a`
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.4s var(--ease-out-expo);
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--accent-gold);
    transform: scaleY(0);
    transition: transform 0.3s ease;
    transform-origin: bottom;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(201,168,76,0.04), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .icon-wrapper {
    width: 46px;
    height: 46px;
    border: 1px solid var(--border-glass);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s var(--ease-out-expo);
    flex-shrink: 0;
    background: var(--bg-secondary);
    position: relative;
    z-index: 1;

    svg {
      font-size: 1.1rem;
      color: var(--text-muted);
      transition: color 0.3s;
    }
  }

  .info {
    position: relative;
    z-index: 1;
    .label {
      font-family: var(--font-mono);
      font-size: 0.62rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }
    .value {
      font-family: var(--font-body);
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--text-primary);
      word-break: break-all;
    }
  }

  &:hover {
    background: var(--bg-card-hover);
    border-color: rgba(201, 168, 76, 0.25);
    transform: translateX(4px);

    &::before { transform: scaleY(1); }
    &::after { opacity: 1; }

    .icon-wrapper {
      background: var(--accent-gold);
      border-color: var(--accent-gold);
      svg { color: #0d0b08; }
    }
  }
`;

const OrnamentDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  color: var(--accent-gold);
  opacity: 0.3;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 4px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--accent-gold);
    opacity: 0.4;
  }
`;

const OpenToWork = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  padding: 1.25rem 1.75rem;
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-left: 2px solid var(--accent-gold);
  background: rgba(201, 168, 76, 0.03);
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-gold);
    flex-shrink: 0;
    box-shadow: 0 0 8px rgba(201,168,76,0.5);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  strong {
    color: var(--accent-gold);
  }
`;

const contactLinks = [
  {
    icon: FiMail,
    label: "Email",
    value: "rizviahmedabbas313@gmail.com",
    href: "mailto:rizviahmedabbas313@gmail.com",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "Rizvi-Ahmed-Abbas-Nasir",
    href: "https://github.com/Rizvi-Ahmed-Abbas-Nasir",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "rizvi-ahmed-abbas-78b489222",
    href: "https://www.linkedin.com/in/rizvi-ahmed-abbas-78b489222/",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 93728 24575",
    href: "tel:+919372824575",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Mumbai, India",
    href: "https://maps.google.com/?q=Mumbai,India",
  },
];

const Contact = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.set(headerRef.current, { opacity: 0, y: 30 });
    gsap.to(headerRef.current, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
      });
    });
  }, []);

  return (
    <Section id="contact">
      <Container>
        <div className="section-label">Get In Touch</div>
        <Header ref={headerRef}>
          <Title>
            Let's <span className="italic">Work Together</span>
          </Title>
          <Subtitle>
            Open to new opportunities, collaborations, and interesting projects.
            Reach out through any channel below.
          </Subtitle>
        </Header>

        <OrnamentDivider>✦ &nbsp; Contact Channels &nbsp; ✦</OrnamentDivider>

        <Grid>
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Card
                key={link.label}
                href={link.href}
                target={link.label !== "Email" && link.label !== "Phone" ? "_blank" : undefined}
                rel="noopener noreferrer"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{ transform: "translateY(20px)" }}
              >
                <div className="icon-wrapper">
                  <Icon />
                </div>
                <div className="info">
                  <div className="label">{link.label}</div>
                  <div className="value">{link.value}</div>
                </div>
              </Card>
            );
          })}
        </Grid>

        <OpenToWork>
          <span className="dot" />
          <span>
            <strong>Open to Work</strong> — Currently available for Full Stack, AI/ML,
            or Automation roles in Mumbai or remote.
          </span>
        </OpenToWork>
      </Container>
    </Section>
  );
};

export default Contact;
