import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact, SiNodedotjs, SiMongodb, SiDocker, SiPython,
  SiJavascript, SiTypescript, SiGit, SiDjango, SiMysql,
  SiPostgresql, SiNextdotjs, SiExpress, SiBootstrap,
  SiTailwindcss, SiRedux, SiSpringboot, SiApachekafka, SiAngular, SiZapier,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscCircuitBoard } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  padding: var(--section-padding) 0;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 700;
  margin-bottom: 0;
  letter-spacing: -0.5px;
  .italic { font-style: italic; color: var(--accent-gold); }
`;

const Hint = styled.p`
  margin-top: 1rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const Marquee = styled.div`
  margin-top: clamp(2.5rem, 7vh, 4.5rem);
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  align-items: flex-start;
  gap: clamp(1rem, 2vw, 2rem);
  width: max-content;
  will-change: transform;
  padding-bottom: 6rem;
`;

const Item = styled.div`
  flex-shrink: 0;
  width: ${({ $v }) => $v.w};
  margin-top: ${({ $v }) => $v.mt};
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $v }) => $v.ratio};
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse at 50% 35%, rgba(201, 168, 76, 0.14), transparent 65%),
    var(--bg-card);
  border: 1px solid var(--border-glass);
  overflow: hidden;
  transition: border-color 0.4s ease, background 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(201, 168, 76, 0.07);
    pointer-events: none;
  }

  .index {
    position: absolute;
    top: 0.9rem;
    left: 1rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 2px;
    color: var(--text-muted);
  }

  .icon {
    font-size: clamp(3rem, 5.5vw, 5.5rem);
    color: rgba(201, 168, 76, 0.5);
    transition: color 0.4s ease, transform 0.5s var(--ease-out-expo);
  }

  &:hover {
    border-color: rgba(201, 168, 76, 0.45);
    .icon { color: var(--accent-gold); transform: scale(1.12) translateY(-4px); }
  }
`;

const Caption = styled.div`
  margin-top: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;

  span { color: var(--accent-gold); margin: 0 0.45rem; }
  em { font-style: normal; color: var(--text-muted); }
`;

/* Card sizes and vertical offsets cycle so the row has a staggered, gallery feel */
const VARIANTS = [
  { w: "clamp(190px, 17vw, 300px)", ratio: "3 / 4", mt: "0" },
  { w: "clamp(250px, 23vw, 380px)", ratio: "4 / 3", mt: "4rem" },
  { w: "clamp(210px, 19vw, 320px)", ratio: "1 / 1", mt: "1.2rem" },
  { w: "clamp(185px, 16vw, 280px)", ratio: "2 / 3", mt: "2.6rem" },
  { w: "clamp(240px, 21vw, 350px)", ratio: "5 / 4", mt: "5.5rem" },
];

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
    label: "DevOps & Automation",
    skills: [
      { name: "AWS EC2 / S3", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Git / CI-CD", icon: SiGit },
      { name: "Kafka", icon: SiApachekafka },
      { name: "n8n Workflows", icon: SiZapier },
    ],
  },
];

const SKILLS = skillCategories.flatMap((cat) =>
  cat.skills.map((s) => ({ ...s, category: cat.label }))
);

const renderSet = (hidden) =>
  SKILLS.map((skill, i) => {
    const Icon = skill.icon;
    return (
      <Item key={`${hidden ? "b" : "a"}-${skill.name}`} $v={VARIANTS[i % VARIANTS.length]} aria-hidden={hidden || undefined}>
        <Card $v={VARIANTS[i % VARIANTS.length]}>
          <span className="index">{String(i + 1).padStart(2, "0")}</span>
          <Icon className="icon" />
        </Card>
        <Caption>
          {skill.name}<span>●</span><em>{skill.category}</em>
        </Caption>
      </Item>
    );
  });

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    const t = gsap.to(titleRef.current, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, []);

  /* Endless marquee: drifts on its own, speeds up / reverses with scroll, eases off on hover */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let setW = 0;
    let x = 0;
    let boost = 0;
    let slow = 1;
    let slowTarget = 1;
    let visible = false;

    const measure = () => {
      const a = track.children[0];
      const b = track.children[SKILLS.length];
      setW = a && b ? b.offsetLeft - a.offsetLeft : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(sectionRef.current);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        boost = gsap.utils.clamp(-900, 900, v * 0.35);
      },
    });

    const onEnter = () => { slowTarget = 0.12; };
    const onLeave = () => { slowTarget = 1; };
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    const tick = (_, deltaMs) => {
      if (!visible || reduce || !setW) return;
      const dt = Math.min(deltaMs, 50) / 1000;
      slow += (slowTarget - slow) * 0.08;
      boost *= 0.94;
      x -= (60 * slow + boost) * dt;
      if (x <= -setW) x += setW;
      if (x > 0) x -= setW;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
      io.disconnect();
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Section id="skills" ref={sectionRef}>
      <Header>
        <div className="section-label">Skills &amp; Tools</div>
        <Title ref={titleRef}>
          My <span className="italic">Tech Arsenal</span>
        </Title>
        <Hint>{SKILLS.length} tools · scroll to speed it up</Hint>
      </Header>

      <Marquee>
        <Track ref={trackRef}>
          {renderSet(false)}
          {renderSet(true)}
        </Track>
      </Marquee>
    </Section>
  );
};

export default Skills;
