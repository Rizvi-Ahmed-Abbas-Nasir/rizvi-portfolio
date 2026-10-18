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

const achievements = [
  "Smart India Hackathon (SIH) 2026 — Top 3 Team (National)",
  "Oscillation Hackathon 2025 — 1st Place Winner",
  "Nextech Hackathon 2024 — 1st Place Winner",
  "Technothon 2023 — State Level Project Winner",
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1300px;

  @media (max-width: 860px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const NameOutlined = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 8.5vw, 7.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 0.95;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(245, 240, 232, 0.4);
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  margin-right: -2.5rem;

  @media (max-width: 860px) {
    margin-right: 0;
    -webkit-text-stroke: 1.2px rgba(245, 240, 232, 0.5);
  }
`;

const NameFilled = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 8.5vw, 7.5rem);
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.02em;
  line-height: 0.95;
  background: var(--accent-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  margin-left: -2.5rem;

  @media (max-width: 860px) {
    margin-left: 0;
  }
`;

/* The "video" frame — scales up as the page scrolls */
const FrameStage = styled.div`
  position: relative;
  z-index: 3;
  flex-shrink: 0;
  width: clamp(230px, 28vw, 380px);
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(201, 168, 76, 0.35);
  box-shadow: var(--accent-glow), 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  will-change: transform;
  transform-origin: center center;

  @media (max-width: 860px) {
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
  padding: 0 var(--container-padding) var(--section-padding);
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
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
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

const AchievementsBox = styled.div`
  border: 1px solid var(--border-glass);
  border-left: 2px solid var(--accent-gold);
  background: var(--bg-card);
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
`;

const AchievementsTitle = styled.h4`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 1rem;
`;

const AchievementItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 0.65rem;

  &:last-child { margin-bottom: 0; }

  &::before {
    content: '◈';
    color: var(--accent-gold);
    font-size: 0.65rem;
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
`;

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
const About = () => {
  const trackRef = useRef(null);
  const nameLeftRef = useRef(null);
  const nameRightRef = useRef(null);
  const frameRef = useRef(null);
  const tagRef = useRef(null);
  const pillsRef = useRef([]);
  const bioRef = useRef(null);
  const statsRef = useRef([]);
  const achieveRef = useRef(null);

  const [active, setActive] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  /* ── Cycle the reel like a playing clip ── */
  useEffect(() => {
    const id = setInterval(() => {
      setActive((c) => (c + 1) % REEL.length);
      setElapsed((e) => e + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const mm = elapsed % 60 < 10 ? `0${elapsed % 60}` : `${elapsed % 60}`;

  /* ── Scroll-scrub: reel grows, name peels apart ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mmGsap = gsap.matchMedia();

      mmGsap.add("(min-width: 861px)", () => {
        gsap.set(frameRef.current, { scale: 1, rotate: -5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        tl.to(frameRef.current, { scale: 2.7, rotate: 0, ease: "none" }, 0)
          .to(nameLeftRef.current, { xPercent: -60, opacity: 0, ease: "none" }, 0)
          .to(nameRightRef.current, { xPercent: 60, opacity: 0, ease: "none" }, 0)
          .to(tagRef.current, { opacity: 0, y: -20, ease: "none" }, 0);

        return () => tl.kill();
      });

      mmGsap.add("(max-width: 860px)", () => {
        gsap.set(frameRef.current, { scale: 1, rotate: -3 });
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  /* ── Achievements reveal ── */
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

    gsap.to(achieveRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: achieveRef.current, start: "top 88%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <Section id="about">
      <ShowcaseTrack ref={trackRef}>
        <Sticky>
          <Eyebrow>✦ The Builder Behind The Code</Eyebrow>

          <NameRow>
            <NameOutlined ref={nameLeftRef}>Rizvi</NameOutlined>

            <FrameStage ref={frameRef}>
              <FrameOrnament className="tl" />
              <FrameOrnament className="tr" />
              <FrameOrnament className="bl" />
              <FrameOrnament className="br" />

              {REEL.map((slide, i) => (
                <FrameSlide key={i} $active={i === active}>
                  <img src={slide.img} alt={slide.label} loading="lazy" />
                </FrameSlide>
              ))}

              <FrameTopBar>
                <RecDot>Rec</RecDot>
                <FrameClock>00:{mm}</FrameClock>
              </FrameTopBar>

              <FrameBottomBar>
                <ReelLabel>✦ Achievements Reel</ReelLabel>
                <ReelTitle>{REEL[active].label} — {REEL[active].title}</ReelTitle>
              </FrameBottomBar>
            </FrameStage>

            <NameFilled ref={nameRightRef}>Abbas</NameFilled>
          </NameRow>

          <TagLine ref={tagRef}>
            Full Stack Developer <span>·</span> AI / ML Engineer <span>·</span> Hackathon Winner
          </TagLine>
        </Sticky>
      </ShowcaseTrack>

      <AchievementsSection>
        <AchievementsInner>
          <PillsRow>
            {pills.map((p, i) => (
              <Pill key={p} ref={(el) => (pillsRef.current[i] = el)}>{p}</Pill>
            ))}
          </PillsRow>

          <Grid>
            <div>
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
            </div>

            <AchievementsBox ref={achieveRef}>
              <AchievementsTitle>✦ Key Achievements</AchievementsTitle>
              {achievements.map((ach, i) => (
                <AchievementItem key={i}>{ach}</AchievementItem>
              ))}
            </AchievementsBox>
          </Grid>
        </AchievementsInner>
      </AchievementsSection>
    </Section>
  );
};

export default About;
