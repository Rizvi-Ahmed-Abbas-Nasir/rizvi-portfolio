import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Achievement photos, used as the "reel" in place of a real video ── */
import hack1 from "../../assets/hackathon/1681584613607.jpeg";
import hack2 from "../../assets/hackathon/1697276669473.jpeg";
import hack3 from "../../assets/hackathon/IMG-20240910-WA0010.jpg";
import hack4 from "../../assets/hackathon/IMG-20251207-WA0094.jpg";
import hack5 from "../../assets/hackathon/IMG-20251207-WA0095.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   Reel data — one frame per hackathon win
   ═══════════════════════════════════════════════════ */
const REEL = [
  { img: hack1, label: "Technothon 2023", title: "State Level Winner" },
  { img: hack2, label: "Nextech Hackathon 2024", title: "1st Place Winner" },
  { img: hack3, label: "Oscillation Hackathon 2025", title: "1st Place Winner" },
  { img: hack4, label: "Smart India Hackathon 2026", title: "Top 3 — National" },
  { img: hack5, label: "Smart India Hackathon 2026", title: "Top 3 — National" },
];

const stats = [
  { number: "3+", label: "Years Exp." },
  { number: "10+", label: "Projects" },
  { number: "4", label: "Hackathon Wins" },
];

const PANELS = [
  {
    event: "Technothon", year: "2023", medal: "🏆", prize: "State Level Project Winner",
    desc: "Built and demoed a winning project against top college teams at state level.",
    chips: ["2023", "State Level", "Project Winner"],
    bg: "linear-gradient(160deg, rgba(92,68,28,0.94) 0%, rgba(122,90,28,0.9) 100%)", solid: "#3d2c10",
    fg: "#fff6dc", dim: "#f0d98a", img: hack1,
  },
  {
    event: "Nextech Hackathon", year: "2024", medal: "🥇", prize: "1st Place Winner",
    desc: "Shipped a working prototype inside the sprint window and took first place.",
    chips: ["2024", "1st Place", "Rapid Prototype"],
    bg: "linear-gradient(160deg, rgba(140,104,34,0.94) 0%, rgba(176,134,46,0.9) 100%)", solid: "#4a3512",
    fg: "#fbf3dc", dim: "#ffe9a8", img: hack2,
  },
  {
    event: "Oscillation Hackathon", year: "2025", medal: "🥇", prize: "1st Place Winner",
    desc: "Led the team to an end-to-end AI-powered build and a first place finish.",
    chips: ["2025", "1st Place", "AI / ML"],
    bg: "linear-gradient(160deg, rgba(201,168,76,0.95) 0%, rgba(224,192,106,0.92) 100%)", solid: "#3a2a0a",
    fg: "#1f1606", dim: "#fff3c9", img: hack3,
  },
  {
    event: "Smart India Hackathon", year: "2026", medal: "🏅", prize: "Top 3 Team — National",
    desc: "Represented the team at the national finals and finished in the top three.",
    chips: ["2026", "National", "Top 3"],
    bg: "linear-gradient(160deg, rgba(240,217,138,0.96) 0%, rgba(248,236,192,0.94) 100%)", solid: "#f2dd94",
    fg: "#1f1606", dim: "#7a5a14", img: hack4,
  },
];

const pills = ["React.js", "Django", "AI / ML", "AWS", "Automation", "Hackathon Winner"];

/* ═══════════════════════════════════════════════════
   Styled Components
   ═══════════════════════════════════════════════════ */
const Section = styled.section`
  position: relative;
`;

/* Tall scroll track that drives the scrub timeline */
const ShowcaseTrack = styled.div`
  position: relative;
  height: 300vh;
  @media (max-width: 860px) {
    height: auto;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 var(--container-padding);

  @media (max-width: 860px) {
    position: relative;
    height: auto;
    padding: 4rem var(--container-padding) 3rem;
    gap: 2rem;
  }
`;

const Eyebrow = styled.div`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const NameRow = styled.div`
  position: relative;
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;

  @media (max-width: 860px) {
    align-items: center;
    gap: 1.5rem;
  }
`;

const nameBase = `
  font-family: var(--font-display);
  font-size: min(17vw, 29vh);
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.03em;
  line-height: 0.8;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  z-index: 3;
`;

const NameTop = styled.h2`
  ${nameBase}
  color: var(--text-primary);
  align-self: flex-start;
  @media (max-width: 860px) { align-self: center; font-size: clamp(3.5rem, 20vw, 6rem); }
`;

const NameBottom = styled.h2`
  ${nameBase}
  color: #b8963f;
  align-self: flex-start;
  margin-left: 22%;
  margin-top: -0.06em;
  @media (max-width: 860px) { align-self: center; font-size: clamp(3.5rem, 20vw, 6rem); }
`;

/* The "video" frame sits BEHIND the letters and scales up on scroll */
const FrameStage = styled.div`
  position: absolute;
  z-index: 1;
  right: 14%;
  top: -6%;
  width: clamp(240px, 28vw, 440px);
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  will-change: transform;
  transform-origin: center center;

  @media (max-width: 860px) {
    position: relative;
    right: auto;
    top: auto;
    width: min(90vw, 420px);
  }
`;

const FrameOrnament = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--accent-gold);
  border-style: solid;
  opacity: 0.6;
  z-index: 4;
  pointer-events: none;

  &.tl { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
  &.tr { top: 6px; right: 6px; border-width: 1px 1px 0 0; }
  &.bl { bottom: 6px; left: 6px; border-width: 0 0 1px 1px; }
  &.br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }
`;

const FrameSlide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.9s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: sepia(0.15) contrast(1.08) brightness(0.88);
  }
`;

const FrameVeil = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(92, 68, 28, 0.85) 0%, rgba(92, 68, 28, 0.35) 45%, rgba(4, 3, 2, 0.25) 100%);
`;

const FrameTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  background: linear-gradient(to bottom, rgba(4, 3, 2, 0.75), transparent);
`;

const RecDot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #f5f0e8;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-rust);
    animation: pulse-glow 1.6s ease-in-out infinite;
  }
`;

const FrameClock = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 1px;
  color: rgba(245, 240, 232, 0.7);
`;

const FrameBottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding: 1.2rem 0.9rem 0.8rem;
  background: linear-gradient(to top, rgba(4, 3, 2, 0.92), transparent);
`;

const ReelLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-gold);
  display: block;
  margin-bottom: 0.2rem;
`;

const ReelTitle = styled.span`
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: #f5f0e8;
`;

const TagLine = styled.p`
  font-family: var(--font-mono);
  font-size: clamp(0.65rem, 1.1vw, 0.78rem);
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 2.5rem;
  text-align: center;

  span { color: var(--accent-gold); }

  @media (max-width: 860px) {
    margin-top: 0;
  }
`;

/* ── Achievements, revealed once the reel has grown ── */
const AchievementsSection = styled.div`
  position: relative;
  z-index: 2;
  background: var(--bg-primary);
  padding: var(--section-padding) var(--container-padding);
`;

const AchievementsInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const PillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
`;

const Pill = styled.span`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  border: 1px solid rgba(201, 168, 76, 0.22);
  background: rgba(201, 168, 76, 0.04);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  opacity: 0;
  transform: translateY(14px);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 760px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Bio = styled.p`
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.9;
  color: var(--text-secondary);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  padding: 1.3rem 1rem;
  text-align: center;
  transition: all 0.4s var(--ease-out-expo);
  position: relative;
  opacity: 0;
  transform: translateY(24px);

  &:hover {
    background: var(--bg-card-hover);
    border-color: rgba(201, 168, 76, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(201, 168, 76, 0.08);
  }

  .number {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 800;
    font-style: italic;
    background: var(--accent-gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 0.2rem;
  }
`;

/* ── Colourful diagonal panels that stack over each other ── */
const Stack = styled.div`
  position: relative;
  z-index: 2;
  overflow-x: clip;
  @media (min-width: 861px) {
    margin-top: -100vh;
  }
`;

const IntroPanel = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  @media (max-width: 860px) { position: relative; height: auto; }
`;

const IntroCard = styled.div`
  width: 86%;
  margin-top: 24vh;
  min-height: 62vh;
  background: rgba(245, 236, 210, 0.95);
  color: #3d2c10;
  border-radius: 0 56px 0 0;
  padding: 2.5rem clamp(1rem, 4vw, 3rem);
  display: flex;
  align-items: center;
  gap: clamp(1rem, 4vw, 4rem);
  transform: rotate(-0.8deg);
  transform-origin: 0 100%;

  @media (max-width: 860px) {
    width: 100%;
    margin-top: 0;
    min-height: 0;
    transform: none;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 0 32px 0 0;
  }
`;

const IntroLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  line-height: 1.5;
  flex-shrink: 0;
  max-width: 140px;
`;

const IntroTitle = styled.h3`
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 800;
  font-size: min(10vw, 20vh);
  line-height: 0.85;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #3d2c10;
  @media (max-width: 860px) { font-size: 12vw; }
`;

const Panel = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: ${({ $i }) => $i + 2};

  @media (max-width: 860px) {
    position: relative;
    height: auto;
  }
`;

const Card = styled.div`
  position: relative;
  min-height: 114vh;
  margin-left: clamp(0.5rem, 3.5vw, 3.5rem);
  margin-right: -6vw;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border-radius: 56px 0 0 0;
  transform: rotate(-1.4deg);
  transform-origin: 0 0;
  overflow: hidden;

  @media (max-width: 860px) {
    min-height: 0;
    margin-right: 0;
    transform: none;
    border-radius: 32px 0 0 0;
  }
`;

const PanelInner = styled.div`
  padding: clamp(2.5rem, 7vh, 5rem) clamp(1.5rem, 4vw, 4rem) 2rem;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: start;
  will-change: transform;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

const PanelTitle = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6.2vw, 6rem);
  font-weight: 800;
  font-style: italic;
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  em { display: block; color: ${({ $dim }) => $dim}; }
`;

const PanelIndex = styled.div`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.75;
  margin-bottom: 1rem;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 2rem;
`;

const Chip = styled.span`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  background: ${({ $fg }) => $fg};
  color: ${({ $solid }) => $solid};
`;

const PanelPrize = styled.div`
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.4vw, 3.2rem);
  font-weight: 700;
  font-style: italic;
  line-height: 1.12;
  margin-bottom: 1.6rem;
`;

const PanelDesc = styled.p`
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.3vw, 1.2rem);
  line-height: 1.6;
  max-width: 480px;
`;

const PanelPhoto = styled.div`
  margin-top: 2rem;
  width: min(100%, 360px);
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  transform: rotate(3deg);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
  border: 4px solid ${({ $fg }) => $fg};

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
const About = () => {
  const trackRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);
  const blockRef = useRef(null);
  const frameRef = useRef(null);
  const tagRef = useRef(null);
  const stackRef = useRef(null);
  const panelRefs = useRef([]);
  const innerRefs = useRef([]);
  const pillsRef = useRef([]);
  const bioRef = useRef(null);
  const statsRef = useRef([]);

  const [active, setActive] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((c) => (c + 1) % REEL.length);
      setElapsed((e) => e + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const mm = elapsed % 60 < 10 ? `0${elapsed % 60}` : `${elapsed % 60}`;

  /* Scroll-scrub: frame moves to centre and fills the screen, letters slide away */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mq = gsap.matchMedia();

      mq.add("(min-width: 861px)", () => {
        const frame = frameRef.current;
        const block = blockRef.current;
        gsap.set(frame, { rotate: -7 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.to(frame, {
          rotate: 0,
          borderRadius: 0,
          x: () => block.offsetWidth / 2 - (frame.offsetLeft + frame.offsetWidth / 2),
          y: () => block.offsetHeight / 2 - (frame.offsetTop + frame.offsetHeight / 2),
          scale: () => Math.max(window.innerWidth / frame.offsetWidth, window.innerHeight / frame.offsetHeight) * 1.02,
          ease: "power1.inOut",
          duration: 1,
        }, 0)
          .to(nameTopRef.current, { xPercent: -80, opacity: 0, ease: "power1.in", duration: 0.55 }, 0)
          .to(nameBottomRef.current, { xPercent: 80, opacity: 0, ease: "power1.in", duration: 0.55 }, 0)
          .to(tagRef.current, { opacity: 0, y: -20, ease: "none", duration: 0.3 }, 0)
          .to(frame.querySelectorAll(".frame-ui"), { opacity: 0, ease: "none", duration: 0.35 }, 0.2)
          .to(frame.querySelector(".frame-veil"), { opacity: 1, ease: "none", duration: 0.5 }, 0.5);
      });

      mq.add("(max-width: 860px)", () => {
        gsap.set(frameRef.current, { rotate: -3 });
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  /* Panels: content rises in, previous panel recedes as the next slides over */
  useEffect(() => {
    const ctx = gsap.context(() => {
      innerRefs.current.forEach((inner, i) => {
        if (!inner) return;
        gsap.from(inner, {
          y: 60, opacity: 0, ease: "none",
          scrollTrigger: { trigger: panelRefs.current[i], start: "top 95%", end: "top 40%", scrub: 0.6 },
        });
      });
    }, stackRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.to(pillsRef.current, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: pillsRef.current[0], start: "top 90%", toggleActions: "play none none reverse" },
    });

    gsap.set(bioRef.current, { opacity: 0, y: 24 });
    gsap.to(bioRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: bioRef.current, start: "top 88%", toggleActions: "play none none reverse" },
    });

    statsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
      });
    });
  }, []);

  return (
    <Section id="about">
      <ShowcaseTrack ref={trackRef}>
        <Sticky>
          <Eyebrow>✦ The Builder Behind The Code</Eyebrow>

          <NameRow ref={blockRef}>
            <NameTop ref={nameTopRef}>Rizvi</NameTop>

            <FrameStage ref={frameRef}>
              {REEL.map((slide, i) => (
                <FrameSlide key={i} $active={i === active}>
                  <img src={slide.img} alt={slide.label} loading="lazy" />
                </FrameSlide>
              ))}

              <FrameVeil className="frame-veil" />

              <FrameTopBar className="frame-ui">
                <RecDot>Rec</RecDot>
                <FrameClock>00:{mm}</FrameClock>
              </FrameTopBar>

              <FrameBottomBar className="frame-ui">
                <ReelLabel>✦ Achievements Reel</ReelLabel>
                <ReelTitle>{REEL[active].label} — {REEL[active].title}</ReelTitle>
              </FrameBottomBar>
            </FrameStage>

            <NameBottom ref={nameBottomRef}>Abbas</NameBottom>
          </NameRow>

          <TagLine ref={tagRef}>
            Full Stack Developer <span>·</span> AI / ML Engineer <span>·</span> Hackathon Winner
          </TagLine>
        </Sticky>
      </ShowcaseTrack>

      <Stack ref={stackRef}>
        <IntroPanel>
          <IntroCard>
            <IntroLabel>What I've<br />Won</IntroLabel>
            <IntroTitle>Achievements</IntroTitle>
          </IntroCard>
        </IntroPanel>

        {PANELS.map((p, i) => (
          <Panel key={p.event} $i={i} ref={(el) => (panelRefs.current[i] = el)}>
            <Card $bg={p.bg} $fg={p.fg}>
              <PanelInner ref={(el) => (innerRefs.current[i] = el)}>
                <div>
                  <PanelIndex>0{i + 1} / 0{PANELS.length}</PanelIndex>
                  <PanelTitle $dim={p.dim}>
                    {p.event.split(" ")[0]}
                    <em>{p.event.split(" ").slice(1).join(" ") || p.year}</em>
                  </PanelTitle>
                  <PanelPhoto $fg={p.fg}>
                    <img src={p.img} alt={p.event} loading="lazy" />
                  </PanelPhoto>
                </div>
                <div>
                  <Chips>
                    {p.chips.map((c) => (
                      <Chip key={c} $solid={p.solid} $fg={p.fg}>{c}</Chip>
                    ))}
                  </Chips>
                  <PanelPrize>{p.medal} {p.prize}</PanelPrize>
                  <PanelDesc>{p.desc}</PanelDesc>
                </div>
              </PanelInner>
            </Card>
          </Panel>
        ))}
      </Stack>

      <AchievementsSection>
        <AchievementsInner>
          <PillsRow>
            {pills.map((p, i) => (
              <Pill key={p} ref={(el) => (pillsRef.current[i] = el)}>{p}</Pill>
            ))}
          </PillsRow>

          <Grid>
            <Bio ref={bioRef}>
              I'm Rizvi Ahmed Abbas, a passionate software engineer with a solid background
              in AI/ML, automation, and a proven track record of winning hackathons. With
              expertise in Django frameworks, cloud platforms (AWS EC2, S3), and database
              management, I enjoy building scalable applications that drive user satisfaction
              and measurable results.
            </Bio>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard key={stat.label} ref={(el) => (statsRef.current[index] = el)}>
                  <div className="number">{stat.number}</div>
                  <div className="label">{stat.label}</div>
                </StatCard>
              ))}
            </StatsGrid>
          </Grid>
        </AchievementsInner>
      </AchievementsSection>
    </Section>
  );
};

export default About;
