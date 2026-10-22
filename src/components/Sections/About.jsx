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
  { number: "5+", label: "Years Experience" },
  { number: "15+", label: "Projects" },
  { number: "4", label: "Hackathon Wins" },
];

const PANELS = [
  {
    event: "Technothon", year: "2023", medal: "🏆", prize: "State Level Project Winner",
    desc: "Built and demoed a winning project against top college teams at state level.",
    chips: ["2023", "State Level", "Project Winner"],
    bg: "linear-gradient(160deg, #5c441c 0%, #7a5a1c 100%)", solid: "#3d2c10",
    fg: "#fff6dc", dim: "#f0d98a", img: hack1,
  },
  {
    event: "Nextech Hackathon", year: "2024", medal: "🥇", prize: "1st Place Winner",
    desc: "Shipped a working prototype inside the sprint window and took first place.",
    chips: ["2024", "1st Place", "Rapid Prototype"],
    bg: "linear-gradient(160deg, #8c6822 0%, #b0862e 100%)", solid: "#4a3512",
    fg: "#fbf3dc", dim: "#ffe9a8", img: hack2,
  },
  {
    event: "Oscillation Hackathon", year: "2025", medal: "🥇", prize: "1st Place Winner",
    desc: "Led the team to an end-to-end AI-powered build and a first place finish.",
    chips: ["2025", "1st Place", "AI / ML"],
    bg: "linear-gradient(160deg, #c9a84c 0%, #e0c06a 100%)", solid: "#fff3c9",
    fg: "#1f1606", dim: "#fff3c9", img: hack3,
  },
  {
    event: "Smart India Hackathon", year: "2026", medal: "🏅", prize: "Top 3 Team — National",
    desc: "Represented the team at the national finals and finished in the top three.",
    chips: ["2026", "National", "Top 3"],
    bg: "linear-gradient(160deg, #f0d98a 0%, #f8ecc0 100%)", solid: "#f2dd94",
    fg: "#1f1606", dim: "#7a5a14", img: hack4,
  },
];

/* ═══════════════════════════════════════════════════
   Styled Components
   ═══════════════════════════════════════════════════ */
const Section = styled.section`
  position: relative;
`;

/* Tall scroll track that drives the scrub timeline */
const ShowcaseTrack = styled.div`
  position: relative;
  height: 400vh;
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

const NameRow = styled.div`
  position: relative;
  z-index: 3;
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

/* Full-size layer behind the letters; scaled down into the slot, scaled up on scroll */
const FrameLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  transform-origin: center center;
  will-change: transform;

  @media (max-width: 860px) {
    position: relative;
    inset: auto;
    order: 2;
    width: min(90vw, 420px);
    aspect-ratio: 16 / 10;
    border-radius: 14px;
    will-change: auto;
  }
`;

/* Invisible marker for where the small frame sits beside the name */
const FrameSlot = styled.div`
  position: absolute;
  right: 14%;
  top: -6%;
  width: clamp(240px, 28vw, 440px);
  aspect-ratio: 16 / 10;
  pointer-events: none;
  @media (max-width: 860px) { display: none; }
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
  }
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
  padding: 2rem 2.4rem;
  background: linear-gradient(to bottom, rgba(4, 3, 2, 0.75), transparent);
`;

const RecDot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-mono);
  font-size: 1.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #f5f0e8;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent-rust);
    animation: pulse-glow 1.6s ease-in-out infinite;
  }
`;

const FrameClock = styled.span`
  font-family: var(--font-mono);
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: rgba(245, 240, 232, 0.7);
`;

const FrameBottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding: 4rem 2.4rem 2.2rem;
  background: linear-gradient(to top, rgba(4, 3, 2, 0.92), transparent);
`;

const ReelLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 1.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold);
  display: block;
  margin-bottom: 0.5rem;
`;

const ReelTitle = styled.span`
  font-family: var(--font-display);
  font-size: 3.2rem;
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
  position: relative;
  z-index: 3;

  @media (max-width: 860px) {
    margin-top: 0;
    order: 3;
  }
`;

/* ── Closing "My Work" section: words slide in from opposite edges ── */
const WorkSection = styled.div`
  position: relative;
  z-index: 3;
  background: #f5ecd2;
  color: #3d2c10;
  overflow: hidden;
  padding: clamp(5rem, 14vh, 10rem) 0 clamp(4rem, 12vh, 8rem);
  text-align: center;
`;

const WorkTitle = styled.h3`
  display: flex;
  justify-content: center;
  gap: 0.18em;
  white-space: nowrap;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 800;
  font-size: min(21vw, 34vh);
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  span { display: inline-block; will-change: transform; }
  span:last-child { color: #a67c2a; }
`;

const WorkSub = styled.p`
  margin: clamp(1.5rem, 4vh, 3rem) auto 0;
  max-width: 760px;
  padding: 0 var(--container-padding);
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 3.2vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  text-transform: uppercase;
`;

const WorkStats = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(1rem, 3vw, 3rem);
  margin-top: clamp(2.5rem, 7vh, 5rem);
  padding: 0 var(--container-padding);
`;

const WorkStat = styled.div`
  min-width: 190px;
  padding-top: 1rem;
  border-top: 2px solid #3d2c10;
  text-align: left;

  .number {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: clamp(3rem, 6.5vw, 5.5rem);
    line-height: 1;
    color: #3d2c10;
  }

  .label {
    margin-top: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #7a5a1c;
  }
`;

const Stack = styled.div`
  position: relative;
  z-index: 2;
  overflow-x: clip;
  @media (min-width: 861px) {
    margin-top: -200vh;
  }
`;

const IntroPanel = styled.div`
  position: sticky;
  top: 0;
  height: 80vh;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  @media (max-width: 860px) { position: relative; height: auto; }
`;

const IntroCard = styled.div`
  width: calc(100% + 4vw);
  margin-top: 0;
  min-height: 100vh;
  background: #f5ecd2;
  color: #3d2c10;
  border-radius: 0 56px 0 0;
  padding: 2.5rem clamp(1rem, 4vw, 3rem) calc(2.5rem + 20vh);
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
  font-size: min(9.6vw, 24vh);
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
  margin-left: ${({ $flip }) => ($flip ? '-6vw' : 'clamp(0.5rem, 3.5vw, 3.5rem)')};
  margin-right: ${({ $flip }) => ($flip ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : '-6vw')};
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border-radius: ${({ $flip }) => ($flip ? '0 56px 0 0' : '56px 0 0 0')};
  transform: rotate(${({ $flip }) => ($flip ? '1.4deg' : '-1.4deg')});
  transform-origin: ${({ $flip }) => ($flip ? '100% 0' : '0 0')};
  overflow: hidden;

  @media (max-width: 860px) {
    min-height: 0;
    margin-right: 0;
    transform: none;
    border-radius: 32px 0 0 0;
  }
`;

const PanelInner = styled.div`
  --pad: clamp(1.5rem, 4vw, 4rem);
  min-height: 100vh;
  padding: 7rem
    ${({ $flip }) => ($flip ? 'var(--pad)' : 'calc(6vw + var(--pad))')}
    4rem
    ${({ $flip }) => ($flip ? 'calc(6vw + var(--pad))' : 'var(--pad)')};
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: stretch;

  @media (max-width: 860px) {
    min-height: 0;
    grid-template-columns: 1fr;
    padding: 3rem var(--pad);
  }
`;

const PanelRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const PanelNum = styled.div`
  margin-top: auto;
  align-self: flex-end;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 800;
  font-size: clamp(8rem, 20vw, 20rem);
  line-height: 0.8;
  letter-spacing: -0.05em;
  color: ${({ $dim }) => $dim};
  opacity: 0.28;
  user-select: none;
  @media (max-width: 860px) { display: none; }
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
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  border: 4px solid ${({ $fg }) => $fg};

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
const Reel = () => {
  const [active, setActive] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((c) => (c + 1) % REEL.length);
      setElapsed((e) => e + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const sec = String(elapsed % 60).padStart(2, "0");

  return (
    <>
      {REEL.map((slide, i) => (
        <FrameSlide key={i} $active={i === active}>
          <img src={slide.img} alt={slide.label} decoding="async" />
        </FrameSlide>
      ))}

      <FrameTopBar className="frame-ui">
        <RecDot>Rec</RecDot>
        <FrameClock>00:{sec}</FrameClock>
      </FrameTopBar>

      <FrameBottomBar className="frame-ui">
        <ReelLabel>✦ Achievements Reel</ReelLabel>
        <ReelTitle>{REEL[active].label} — {REEL[active].title}</ReelTitle>
      </FrameBottomBar>
    </>
  );
};

const About = () => {
  const trackRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);
  const blockRef = useRef(null);
  const frameRef = useRef(null);
  const tagRef = useRef(null);
  const stackRef = useRef(null);
  const workRef = useRef(null);
  const workLeftRef = useRef(null);
  const workRightRef = useRef(null);
  const workSubRef = useRef(null);
  const workStatsRef = useRef([]);
  const slotRef = useRef(null);

  /* Scroll-scrub: frame moves to centre and fills the screen, letters slide away */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mq = gsap.matchMedia();

      mq.add("(min-width: 861px)", () => {
        const layer = frameRef.current;
        const slot = slotRef.current;
        const block = blockRef.current;
        const sticky = layer.parentElement;

        const geo = () => {
          const sw = sticky.offsetWidth;
          const sh = sticky.offsetHeight;
          const cx = block.offsetLeft + slot.offsetLeft + slot.offsetWidth / 2;
          const cy = block.offsetTop + slot.offsetTop + slot.offsetHeight / 2;
          return { s: slot.offsetWidth / sw, x: cx - sw / 2, y: cy - sh / 2 };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(layer,
          { x: () => geo().x, y: () => geo().y, scale: () => geo().s, rotate: -7, borderRadius: () => 14 / geo().s },
          { x: 0, y: 0, scale: 1, rotate: 0, borderRadius: 0, ease: "power1.inOut", duration: 1, immediateRender: true },
          0)
          .to(nameTopRef.current, { xPercent: -80, opacity: 0, ease: "power1.in", duration: 0.55 }, 0)
          .to(nameBottomRef.current, { xPercent: 80, opacity: 0, ease: "power1.in", duration: 0.55 }, 0)
          .to(tagRef.current, { opacity: 0, y: -20, ease: "none", duration: 0.3 }, 0)
          .to(layer.querySelectorAll(".frame-ui"), { opacity: 0, ease: "none", duration: 0.35 }, 0.2);
      });

      mq.add("(max-width: 860px)", () => {
        gsap.set(frameRef.current, { rotate: -3 });
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(workLeftRef.current, { xPercent: -70 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: workRef.current, start: "top 90%", end: "top 25%", scrub: 0.6 },
      });
      gsap.fromTo(workRightRef.current, { xPercent: 70 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: workRef.current, start: "top 90%", end: "top 25%", scrub: 0.6 },
      });
      gsap.from(workStatsRef.current, {
        y: 50, opacity: 0, stagger: 0.15, ease: "none",
        scrollTrigger: { trigger: workRef.current, start: "top 30%", end: "top -10%", scrub: 0.6 },
      });
      gsap.from(workSubRef.current, {
        y: 40, opacity: 0, ease: "none",
        scrollTrigger: { trigger: workRef.current, start: "top 45%", end: "top 10%", scrub: 0.6 },
      });
    }, workRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="about">
      <ShowcaseTrack ref={trackRef}>
        <Sticky>
          <FrameLayer ref={frameRef}>
            <Reel />
          </FrameLayer>

          <NameRow ref={blockRef}>
            <NameTop ref={nameTopRef}>Rizvi</NameTop>
            <FrameSlot ref={slotRef} />
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
          <Panel key={p.event} $i={i}>
            <Card $bg={p.bg} $fg={p.fg} $flip={i % 2 === 1}>
              <PanelInner $flip={i % 2 === 1}>
                <div>
                  <PanelIndex>0{i + 1} / 0{PANELS.length}</PanelIndex>
                  <PanelTitle $dim={p.dim}>
                    {p.event.split(" ")[0]}
                    <em>{p.event.split(" ").slice(1).join(" ") || p.year}</em>
                  </PanelTitle>
                  <PanelPhoto $fg={p.fg}>
                    <img src={p.img} alt={p.event} loading="lazy" decoding="async" />
                  </PanelPhoto>
                </div>
                <PanelRight>
                  <Chips>
                    {p.chips.map((c) => (
                      <Chip key={c} $solid={p.solid} $fg={p.fg}>{c}</Chip>
                    ))}
                  </Chips>
                  <PanelPrize>{p.medal} {p.prize}</PanelPrize>
                  <PanelDesc>{p.desc}</PanelDesc>
                  <PanelNum $dim={p.dim}>0{i + 1}</PanelNum>
                </PanelRight>
              </PanelInner>
            </Card>
          </Panel>
        ))}
      </Stack>

      <WorkSection ref={workRef}>
        <WorkTitle>
          <span ref={workLeftRef}>My</span>
          <span ref={workRightRef}>Work</span>
        </WorkTitle>
        <WorkSub ref={workSubRef}>Built with the best in AI, automation &amp; full stack.</WorkSub>
        <WorkStats>
          {stats.map((st, i) => (
            <WorkStat key={st.label} ref={(el) => (workStatsRef.current[i] = el)}>
              <div className="number">{st.number}</div>
              <div className="label">{st.label}</div>
            </WorkStat>
          ))}
        </WorkStats>
      </WorkSection>
    </Section>
  );
};

export default About;
