import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import SplitType from "split-type";

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
  line-height: 1.15;
  max-width: 700px;
  letter-spacing: -0.5px;
  margin-bottom: 0;
  .italic {
    font-style: italic;
    color: var(--accent-gold);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
  margin-top: 4rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid var(--border-ornament);

  &::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(201, 168, 76, 0.1);
    z-index: 2;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(201,168,76,0.08) 0%,
      rgba(168,72,50,0.05) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: sepia(0.2) contrast(1.05);
  }
`;

const OrnamentCorner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--accent-gold);
  border-style: solid;
  opacity: 0.4;
  z-index: 3;

  &.tl { top: 4px; left: 4px; border-width: 1px 0 0 1px; }
  &.tr { top: 4px; right: 4px; border-width: 1px 1px 0 0; }
  &.bl { bottom: 4px; left: 4px; border-width: 0 0 1px 1px; }
  &.br { bottom: 4px; right: 4px; border-width: 0 1px 1px 0; }
`;

const TextColumn = styled.div``;

const Bio = styled.p`
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.9;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  padding: 1.3rem 1rem;
  text-align: center;
  transition: all 0.4s var(--ease-out-expo);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(201, 168, 76, 0.06);
    pointer-events: none;
  }

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
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  margin-top: 2rem;
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

const stats = [
  { number: "3+", label: "Years Exp." },
  { number: "10+", label: "Projects" },
  { number: "2", label: "Hackathon Wins" },
];

const achievements = [
  "Oscillation Hackathon Winner — Best Project Award",
  "State Level Project Winner — Diploma in Computer Engineering",
  "SIH Grand Finalist & CESA / CSI Tech Head",
];

const About = () => {
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef([]);
  const achieveRef = useRef(null);

  useEffect(() => {
    const titleSplit = SplitType.create(titleRef.current, { types: "words" });
    gsap.set(titleSplit.words, { opacity: 0, y: 50, filter: "blur(4px)" });
    gsap.set(bioRef.current, { opacity: 0, y: 30 });
    gsap.set(imageRef.current, { opacity: 0, scale: 0.96 });
    gsap.set(achieveRef.current, { opacity: 0, y: 20 });

    gsap.to(titleSplit.words, {
      opacity: 1, y: 0, filter: "blur(0px)",
      stagger: 0.05, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 82%", toggleActions: "play none none reverse" },
    });

    gsap.to(bioRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: bioRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });

    gsap.to(imageRef.current, {
      opacity: 1, scale: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: imageRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });

    statsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 30 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
      });
    });

    gsap.to(achieveRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: achieveRef.current, start: "top 88%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <Section id="about">
      <Container>
        <div className="section-label">About Me</div>
        <Title ref={titleRef}>
          A builder turning{" "}
          <span className="italic">ideas into scalable systems</span>
        </Title>
        <Grid>
          <ImageWrapper ref={imageRef}>
            <OrnamentCorner className="tl" />
            <OrnamentCorner className="tr" />
            <OrnamentCorner className="bl" />
            <OrnamentCorner className="br" />
            <img src="https://res.cloudinary.com/dtnotszn5/image/upload/v1740779173/Rizvi_r06umi.png" alt="Rizvi Ahmed Abbas" />
          </ImageWrapper>
          <TextColumn>
            <Bio ref={bioRef}>
              I'm Rizvi Ahmed Abbas — a passionate software engineer with a solid background
              in AI/ML, Automations, and a proven track record of winning hackathons. With
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
            <AchievementsBox ref={achieveRef}>
              <AchievementsTitle>✦ Key Achievements</AchievementsTitle>
              {achievements.map((ach, i) => (
                <AchievementItem key={i}>{ach}</AchievementItem>
              ))}
            </AchievementsBox>
          </TextColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default About;
