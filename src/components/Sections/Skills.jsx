import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import {
  SiReact, SiNodedotjs, SiMongodb, SiDocker, SiPython,
  SiJavascript, SiTypescript, SiGit, SiDjango, SiMysql,
  SiPostgresql, SiNextdotjs, SiExpress, SiBootstrap,
  SiTailwindcss, SiRedux, SiSpringboot, SiApachekafka, SiAngular, SiZapier,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscCircuitBoard } from "react-icons/vsc";

const Section = styled.section`
  padding: var(--section-padding) var(--container-padding);
  position: relative;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 700;
  margin-bottom: 0;
  letter-spacing: -0.5px;
  .italic { font-style: italic; color: var(--accent-gold); }
`;

const CategoryBlock = styled.div`
  margin-top: 3rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryLabel = styled.h3`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold);
  white-space: nowrap;
`;

const CategoryLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent);
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const SkillCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  transition: all 0.35s var(--ease-out-expo);
  cursor: default;
  opacity: 0;
  position: relative;
  overflow: hidden;

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

  .icon {
    font-size: 1.1rem;
    color: var(--text-muted);
    transition: color 0.3s ease;
    flex-shrink: 0;
  }

  .name {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 1px;
    color: var(--text-muted);
    text-transform: uppercase;
    white-space: nowrap;
    transition: color 0.3s ease;
  }

  &:hover {
    background: var(--bg-card-hover);
    border-color: rgba(201, 168, 76, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(201, 168, 76, 0.08);

    &::before { transform: scaleY(1); }
    .icon { color: var(--accent-gold); }
    .name { color: var(--text-primary); }
  }
`;

const skillCategories = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "SQL", icon: VscCircuitBoard },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Angular", icon: SiAngular },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Django", icon: SiDjango },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    label: "DevOps, Cloud & Automation",
    skills: [
      { name: "AWS EC2 / S3", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Git / CI-CD", icon: SiGit },
      { name: "Kafka", icon: SiApachekafka },
      { name: "n8n Workflows", icon: SiZapier },
    ],
  },
];

const Skills = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    gsap.to(titleRef.current, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.5, delay: i * 0.04, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 93%", toggleActions: "play none none reverse" },
      });
    });
  }, []);

  let cardIndex = 0;

  return (
    <Section id="skills">
      <Container>
        <div className="section-label">Skills &amp; Tools</div>
        <Title ref={titleRef}>
          My <span className="italic">Tech Arsenal</span>
        </Title>
        {skillCategories.map((cat) => (
          <CategoryBlock key={cat.label}>
            <CategoryHeader>
              <CategoryLabel>{cat.label}</CategoryLabel>
              <CategoryLine />
            </CategoryHeader>
            <SkillsGrid>
              {cat.skills.map((skill) => {
                const idx = cardIndex++;
                const Icon = skill.icon;
                return (
                  <SkillCard
                    key={skill.name}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    style={{ opacity: 0, transform: "translateY(20px)" }}
                  >
                    <Icon className="icon" />
                    <span className="name">{skill.name}</span>
                  </SkillCard>
                );
              })}
            </SkillsGrid>
          </CategoryBlock>
        ))}
      </Container>
    </Section>
  );
};

export default Skills;
