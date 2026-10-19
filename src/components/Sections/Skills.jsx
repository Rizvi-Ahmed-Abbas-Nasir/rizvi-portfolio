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

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */
const skillCategories = [
  {
    label: "Languages",
    line: "Five languages I think in.",
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
    line: "Interfaces that feel instant.",
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
    line: "APIs that don't break at 2 a.m.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Django", icon: SiDjango },
    ],
  },
  {
    label: "Databases",
    line: "Data that stays consistent.",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    label: "DevOps & Automation",
    line: "Shipped, containerised, automated.",
    skills: [
      { name: "AWS EC2 / S3", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Git / CI-CD", icon: SiGit },
      { name: "Kafka", icon: SiApachekafka },
      { name: "n8n Workflows", icon: SiZapier },
    ],
  },
];

/* Cards: sizes and heights cycle so the row has a staggered gallery feel */
const VARIANTS = [
  { w: "clamp(190px, 17vw, 300px)", ratio: "3 / 4", mt: "0" },
  { w: "clamp(250px, 23vw, 380px)", ratio: "4 / 3", mt: "4rem" },
  { w: "clamp(210px, 19vw, 320px)", ratio: "1 / 1", mt: "1.2rem" },
  { w: "clamp(185px, 16vw, 280px)", ratio: "2 / 3", mt: "2.6rem" },
  { w: "clamp(240px, 21vw, 350px)", ratio: "5 / 4", mt: "5.5rem" },
];

const NOTE_OFFSETS = ["3rem", "0.5rem", "6rem", "1.5rem", "4.5rem"];

const ALL_SKILLS = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.label })));

/* Row items: a small text note opens each category, followed by its cards */
let cardCounter = 0;
const ROW = skillCategories.flatMap((cat, ci) => {
  const note = { type: "note", cat, ci };
  const cards = cat.skills.map((s) => ({ type: "card", skill: s, category: cat.label, n: cardCounter++ }));
  return [note, ...cards];
});

/* ═══════════════════════════════════════════════════
   Styled components
   ═══════════════════════════════════════════════════ */
const Section = styled.section`
  padding: clamp(2rem, 6vw, 4.5rem) 0;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
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
  font-size: clamp(3rem, 9.5vw, 8.5rem);
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

const Marquee = styled.div`
  margin-top: clamp(2rem, 5vh, 3.5rem);
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  align-items: flex-start;
  gap: clamp(1rem, 2vw, 2rem);
  width: max-content;
  will-change: transform;
  padding-bottom: 1rem;
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
  transition: border-color 0.4s ease;

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

const Note = styled.div`
  flex-shrink: 0;
  width: clamp(190px, 15vw, 250px);
  margin-top: ${({ $mt }) => $mt};
  padding-left: 1rem;
  border-left: 1px solid rgba(201, 168, 76, 0.35);

  .count {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .label {
    margin: 0.5rem 0;
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 700;
    font-size: clamp(1.5rem, 2.2vw, 2.1rem);
    line-height: 1.05;
    color: var(--accent-gold);
  }

  .line {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 1px;
    line-height: 1.5;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
`;

const Ticker = styled.div`
  margin-top: clamp(1.5rem, 4vh, 2.5rem);
  overflow: hidden;
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
  padding: 0.6rem 0;
`;

const TickerTop = styled(Ticker)`
  margin-top: clamp(1.8rem, 4vh, 2.8rem);
`;

const TickerTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  will-change: transform;

  .word {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: clamp(2.2rem, 5vw, 4.2rem);
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(201, 168, 76, 0.55);
    white-space: nowrap;
    padding: 0 clamp(1rem, 2vw, 2rem);
  }

  .sep {
    color: var(--accent-gold);
    font-size: 1.1rem;
  }
`;

const Footer = styled.div`
  max-width: 1300px;
  margin: clamp(1.5rem, 4vh, 2.5rem) auto 0;
  padding: 0 var(--container-padding);
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-gold);
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .tag::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent-gold);
  }

  .text {
    font-family: var(--font-mono);
    font-size: clamp(0.72rem, 1vw, 0.88rem);
    letter-spacing: 1px;
    line-height: 1.55;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .script {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1.1rem, 1.6vw, 1.5rem);
    color: var(--text-primary);
    text-align: right;
    @media (max-width: 860px) { text-align: left; }
  }
`;

/* ═══════════════════════════════════════════════════
   Endless marquee: drifts on its own, scroll speeds it up / reverses it
   ═══════════════════════════════════════════════════ */
const useMarquee = (sectionRef, trackRef, { base, dir = 1, count, hoverSlow = false }) => {
  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let period = 0;
    let x = 0;
    let boost = 0;
    let slow = 1;
    let slowTarget = 1;
    let visible = false;

    const measure = () => {
      const a = track.children[0];
      const b = track.children[count];
      period = a && b ? b.offsetLeft - a.offsetLeft : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(section);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => { boost = gsap.utils.clamp(-1600, 1600, self.getVelocity() * 0.5); },
    });

    const onEnter = () => { slowTarget = 0.12; };
    const onLeave = () => { slowTarget = 1; };
    if (hoverSlow) {
      track.addEventListener("mouseenter", onEnter);
      track.addEventListener("mouseleave", onLeave);
    }

    const tick = (_, deltaMs) => {
      if (!visible || reduce || !period) return;
      const dt = Math.min(deltaMs, 50) / 1000;
      slow += (slowTarget - slow) * 0.08;
      boost *= 0.94;
      x -= dir * (base * slow + boost) * dt;
      if (x <= -period) x += period;
      if (x > 0) x -= period;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
      io.disconnect();
      if (hoverSlow) {
        track.removeEventListener("mouseenter", onEnter);
        track.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [sectionRef, trackRef, base, dir, count, hoverSlow]);
};

const renderRow = (hidden) =>
  ROW.map((item, idx) => {
    const key = `${hidden ? "b" : "a"}-${idx}`;
    if (item.type === "note") {
      return (
        <Note key={key} $mt={NOTE_OFFSETS[item.ci % NOTE_OFFSETS.length]} aria-hidden={hidden || undefined}>
          <div className="count">{String(item.ci + 1).padStart(2, "0")} · {item.cat.skills.length} tools</div>
          <div className="label">{item.cat.label}</div>
          <div className="line">{item.cat.line}</div>
        </Note>
      );
    }
    const v = VARIANTS[item.n % VARIANTS.length];
    const Icon = item.skill.icon;
    return (
      <Item key={key} $v={v} aria-hidden={hidden || undefined}>
        <Card $v={v}>
          <span className="index">{String(item.n + 1).padStart(2, "0")}</span>
          <Icon className="icon" />
        </Card>
        <Caption>
          {item.skill.name}<span>●</span><em>{item.category}</em>
        </Caption>
      </Item>
    );
  });

const renderTicker = (hidden) =>
  ALL_SKILLS.flatMap((s, i) => [
    <span className="word" key={`${hidden ? "b" : "a"}-w-${i}`} aria-hidden={hidden || undefined}>{s.name}</span>,
    <span className="sep" key={`${hidden ? "b" : "a"}-s-${i}`} aria-hidden="true">✦</span>,
  ]);

const Skills = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const trackRef = useRef(null);
  const tickerRef = useRef(null);
  const tickerTopRef = useRef(null);

  useMarquee(sectionRef, trackRef, { base: 150, dir: 1, count: ROW.length, hoverSlow: true });
  useMarquee(sectionRef, tickerRef, { base: 90, dir: -1, count: ALL_SKILLS.length * 2 });
  useMarquee(sectionRef, tickerTopRef, { base: 90, dir: 1, count: ALL_SKILLS.length * 2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: headRef.current, start: "top 90%", end: "top 35%", scrub: 0.6 };
      gsap.fromTo(leftRef.current, { xPercent: -45 }, { xPercent: 0, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(rightRef.current, { xPercent: 45 }, { xPercent: 0, ease: "none", scrollTrigger: trigger });
    }, headRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="skills" ref={sectionRef}>
      <Header>
        <Heading ref={headRef}>
          <span ref={leftRef}>My Tech</span>
          <span ref={rightRef} className="gold">Arsenal</span>
        </Heading>

        <Cols>
          <ColSide $right>Everything a product needs</ColSide>
          <ColMid>
            I'm a full stack engineer building AI pipelines, web apps and automation workflows
            from the ground up, then shipping them to production. These are the tools I reach
            for every day.
          </ColMid>
          <ColSide>Shipped right.</ColSide>
        </Cols>
      </Header>

      <TickerTop>
        <TickerTrack ref={tickerTopRef}>
          {renderTicker(false)}
          {renderTicker(true)}
        </TickerTrack>
      </TickerTop>

      <Marquee>
        <Track ref={trackRef}>
          {renderRow(false)}
          {renderRow(true)}
        </Track>
      </Marquee>

      <Ticker>
        <TickerTrack ref={tickerRef}>
          {renderTicker(false)}
          {renderTicker(true)}
        </TickerTrack>
      </Ticker>

      <Footer>
        <div className="tag">Currently exploring</div>
        <div className="text">
          LLM agents · RAG pipelines · n8n automations · cloud-native AWS · and whatever ships
          the next idea faster.
        </div>
        <div className="script">always learning, always building</div>
      </Footer>
    </Section>
  );
};

export default Skills;
