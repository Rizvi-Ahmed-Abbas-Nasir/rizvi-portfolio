import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  padding: var(--section-padding) var(--container-padding);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 5rem;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.5px;
  .italic { font-style: italic; color: var(--accent-gold); }
`;

const Timeline = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(201,168,76,0.5) 10%,
      rgba(201,168,76,0.3) 80%,
      transparent
    );
  }
  @media (max-width: 768px) {
    &::before { left: 0; }
  }
`;

const TimelineEntry = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 3rem;
  padding: 0 0 4.5rem 2.5rem;
  position: relative;
  opacity: 0;

  &::before {
    content: '◈';
    position: absolute;
    left: -0.55rem;
    top: 0.1rem;
    color: var(--accent-gold);
    font-size: 1rem;
    line-height: 1;
    background: var(--bg-primary);
    padding: 0 2px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding-left: 2rem;
  }
`;

const Meta = styled.div`
  padding-top: 0.15rem;
`;

const DateRange = styled.div`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 0.5rem;
`;

const Company = styled.div`
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const Location = styled.div`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 1px;
  color: var(--text-muted);
  text-transform: uppercase;
`;

const Content = styled.div``;

const Role = styled.h3`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  letter-spacing: -0.3px;
`;

const Achievements = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Achievement = styled.li`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-secondary);

  &::before {
    content: '—';
    color: var(--accent-gold);
    opacity: 0.6;
    flex-shrink: 0;
    margin-top: 0.05rem;
  }

  strong {
    color: var(--text-primary);
    font-weight: 700;
  }
`;

const Divider = styled.div`
  width: 3rem;
  height: 1px;
  background: linear-gradient(90deg, var(--accent-gold), transparent);
  margin: 1.25rem 0;
  opacity: 0.4;
`;

const experiences = [
  {
    company: "Thinkbar",
    role: "Full Stack AI Engineer",
    dateRange: "Jan 2026 — Present",
    location: "Mumbai Central · Onsite",
    achievements: [
      "Built <strong>SEO automation</strong> using n8n and AI tools, reducing manual work from <strong>3 days to 2 hours</strong>.",
      "Developed lead generation automation pipelines, generating <strong>100+ leads</strong> with 2 direct conversions.",
      "Collaborated in <strong>Agile sprints</strong> to ship production-ready features, meeting 100% of sprint deadlines.",
      "Integrated AI-driven features and intelligent workflows, reducing manual processing by <strong>~30%</strong>.",
    ],
  },
  {
    company: "CleverStudio",
    role: "MERN Stack Developer",
    dateRange: "May 2023 — Dec 2025",
    location: "Mumbai · Hybrid",
    achievements: [
      "Delivered <strong>10+ client applications</strong> with scalable backends and optimised frontends.",
      "Deployed <strong>AWS REST APIs</strong> on EC2 and S3 for reliable cloud integrations.",
      "Built modular backend services using <strong>Flask</strong> and <strong>Express.js</strong>.",
      "Optimised API workflows and database queries for stable, high-performance systems.",
    ],
  },
  {
    company: "Perulima Motors",
    role: "Full Stack Developer",
    dateRange: "May 2022 — Apr 2023",
    location: "Mumbai · Onsite",
    achievements: [
      "Built a <strong>React landing page</strong> with dynamic animations and a user-friendly interface.",
      "Implemented a <strong>Django-based backend</strong> with Google OAuth, secure session handling, and authentication.",
      "Implemented <strong>REST APIs</strong>, database integration, and role-based user management.",
    ],
  },
];

const Experience = () => {
  const titleRef = useRef(null);
  const entriesRef = useRef([]);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    gsap.to(titleRef.current, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 82%", toggleActions: "play none none reverse" },
    });

    entriesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.set(el, { y: 30 });
    });
  }, []);

  return (
    <Section id="experience">
      <Container>
        <Header>
          <div className="section-label">Career</div>
          <Title ref={titleRef}>
            Professional <span className="italic">Experience</span>
          </Title>
        </Header>
        <Timeline>
          {experiences.map((exp, i) => (
            <TimelineEntry
              key={exp.company}
              ref={(el) => (entriesRef.current[i] = el)}
            >
              <Meta>
                <DateRange>{exp.dateRange}</DateRange>
                <Company>{exp.company}</Company>
                <Location>{exp.location}</Location>
              </Meta>
              <Content>
                <Role>{exp.role}</Role>
                <Achievements>
                  {exp.achievements.map((ach, j) => (
                    <Achievement
                      key={j}
                      dangerouslySetInnerHTML={{ __html: ach }}
                    />
                  ))}
                </Achievements>
                {i < experiences.length - 1 && <Divider />}
              </Content>
            </TimelineEntry>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default Experience;
