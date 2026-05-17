import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Hackathon photo imports ── */
import hack1  from '../../../assets/hackathon/1681584613607.jpeg';
import hack2  from '../../../assets/hackathon/1683313473259.jpeg';
import hack3  from '../../../assets/hackathon/1683313473361.jpeg';
import hack4  from '../../../assets/hackathon/1683313473397.jpeg';
import hack5  from '../../../assets/hackathon/1697276669473.jpeg';
import hack6  from '../../../assets/hackathon/1697276669656.jpeg';
import hack7  from '../../../assets/hackathon/1697276678205.jpeg';
import hack8  from '../../../assets/hackathon/1712396633389.jpeg';
import hack9  from '../../../assets/hackathon/IMG-20240905-WA0001.jpg';
import hack10 from '../../../assets/hackathon/IMG-20240905-WA0012.jpg';
import hack11 from '../../../assets/hackathon/IMG-20240910-WA0010.jpg';
import hack12 from '../../../assets/hackathon/IMG-20240910-WA0018.jpg';
import hack13 from '../../../assets/hackathon/20251208_194443.jpg';
import hack14 from '../../../assets/hackathon/IMG-20251207-WA0094.jpg';
import hack15 from '../../../assets/hackathon/IMG-20251207-WA0095.jpg';
import hack16 from '../../../assets/hackathon/IMG-20251209-WA0009.jpeg';
import hack17 from '../../../assets/hackathon/IMG-20251210-WA0003.jpg';
import hack18 from '../../../assets/hackathon/IMG-20251217-WA0006.jpg';
import hack19 from '../../../assets/hackathon/Screenshot_20251217_234954_LinkedIn.jpg';
import hack20 from '../../../assets/hackathon/Screenshot_20251217_235006_LinkedIn.jpg';

/* ──────────── Keyframes ──────────── */
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

/* ──────────── Styled Components ──────────── */
const Section = styled.section`
  padding: var(--section-padding) var(--container-padding);
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const TitleClip = styled.div`
  overflow: hidden;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -1px;
  line-height: 1;
  color: var(--text-primary);
  .char { display: inline-block; will-change: transform, opacity; }
  .italic { font-style: italic; color: var(--accent-gold); }
`;

const Subtitle = styled.p`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 1rem;
`;

/* ── 4 Win Badges ── */
const WinsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3.5rem;
`;

const WinBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(201,168,76,0.2);
  background: rgba(201,168,76,0.04);
  flex: 1;
  min-width: 220px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(201,168,76,0.06) 50%,
      transparent
    );
    background-size: 400px 100%;
    animation: ${shimmer} 3s ease infinite;
    animation-delay: ${({ $delay }) => $delay || '0s'};
  }

  .medal {
    font-size: 1.8rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .info { flex: 1; }

  .event {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
  }

  .prize {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent-gold);
  }

  .year-tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 2px;
    color: var(--text-muted);
    border: 1px solid var(--border-glass);
    padding: 0.2rem 0.5rem;
    flex-shrink: 0;
  }
`;

/* ── Slideshow ── */
const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(201,168,76,0.1);
`;

const SlideTrack = styled.div`
  display: flex;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateX(${({ $index }) => -$index * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: sepia(0.08) contrast(1.05) brightness(0.92);
    transition: filter 0.5s ease;
  }

  &:hover img {
    filter: sepia(0) contrast(1.08) brightness(1.02);
  }
`;

const SlideCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 2rem 1.5rem;
  background: linear-gradient(to top, rgba(8,7,5,0.92) 0%, transparent 100%);
  z-index: 2;
  animation: ${slideIn} 0.5s ease;
`;

const CaptionLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent-gold);
  display: block;
  margin-bottom: 0.3rem;
`;

const CaptionTitle = styled.h4`
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 700;
  color: #f5f0e8;
`;

/* Slide counter */
const SlideCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '2rem' : '0.45rem')};
  height: 0.45rem;
  border-radius: 99px;
  background: ${({ $active }) => ($active ? 'var(--accent-gold)' : 'rgba(201,168,76,0.25)')};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
`;

const NavBtns = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(201,168,76,0.3);
  background: transparent;
  color: var(--accent-gold);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(201,168,76,0.1);
    border-color: var(--accent-gold);
  }
`;

const CountText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
`;

/* ──────────── Data ──────────── */
const WINS = [
  { medal: '🥇', event: 'Smart India Hackathon',   prize: '1st Place — National',    year: '2023' },
  { medal: '🏆', event: 'VPPCOE Tech Fest Hack',   prize: 'Winner — Best Innovation', year: '2024' },
  { medal: '🥇', event: 'IEEE APSIT Hackathon',     prize: '1st Place — Regional',    year: '2024' },
  { medal: '🏅', event: 'Hack-the-Future Summit',  prize: 'Top 3 — AI Track',        year: '2025' },
];

/* Each "slide" groups photos by event */
const SLIDES = [
  { label: 'Smart India Hackathon 2023', title: '🥇 National Level — 1st Place',   imgs: [hack1, hack2, hack3, hack4] },
  { label: 'VPPCOE Tech Fest 2024',      title: '🏆 Best Innovation Award',          imgs: [hack5, hack6, hack7, hack8] },
  { label: 'IEEE APSIT Hackathon 2024',  title: '🥇 Regional Level — 1st Place',   imgs: [hack9, hack10, hack11, hack12] },
  { label: 'Hack-the-Future Summit 2025',title: '🏅 AI Track — Top 3 Finish',       imgs: [hack13, hack14, hack15, hack16] },
];

/* Flatten: one slide per image but grouped captions */
const ALL_SLIDES = SLIDES.flatMap(({ label, title, imgs }) =>
  imgs.map((img) => ({ label, title, img }))
);

/* ──────────── Component ──────────── */
const HackathonSection = () => {
  const titleRef   = useRef(null);
  const badgesRef  = useRef([]);
  const sectionRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const total = ALL_SLIDES.length;

  /* auto-play */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
    return () => clearInterval(id);
  }, [total]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total),         [total]);

  /* ── Bottom-to-top split-text title ── */
  useEffect(() => {
    if (!titleRef.current) return;
    const split = SplitType.create(titleRef.current, { types: 'chars,words' });
    gsap.set(split.chars, { yPercent: 110, opacity: 0 });
    const tween = gsap.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.028,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
    return () => { tween.kill(); split.revert(); };
  }, []);

  /* ── Win badge reveal ── */
  useEffect(() => {
    badgesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  return (
    <Section id="hackathons" ref={sectionRef}>
      <Inner>
        <div className="section-label">Extra Activity</div>
        <Header>
          <TitleClip>
            <Title ref={titleRef}>
              Hackathon <span className="italic">Wins</span>
            </Title>
          </TitleClip>
          <Subtitle>4 Competitions · 4 Victories</Subtitle>
        </Header>

        {/* ── Win Badges ── */}
        <WinsRow>
          {WINS.map((w, i) => (
            <WinBadge
              key={i}
              $delay={`${i * 0.4}s`}
              ref={(el) => (badgesRef.current[i] = el)}
            >
              <div className="medal">{w.medal}</div>
              <div className="info">
                <div className="event">{w.event}</div>
                <div className="prize">{w.prize}</div>
              </div>
              <div className="year-tag">{w.year}</div>
            </WinBadge>
          ))}
        </WinsRow>

        {/* ── Slideshow ── */}
        <SlideWrapper>
          <SlideTrack $index={current}>
            {ALL_SLIDES.map((s, i) => (
              <Slide key={i}>
                <img src={s.img} alt={s.label} loading="lazy" />
                {i === current && (
                  <SlideCaption key={current}>
                    <CaptionLabel>{s.label}</CaptionLabel>
                    <CaptionTitle>{s.title}</CaptionTitle>
                  </SlideCaption>
                )}
              </Slide>
            ))}
          </SlideTrack>
        </SlideWrapper>

        {/* ── Controls ── */}
        <SlideCounter>
          <Dots>
            {ALL_SLIDES.map((_, i) => (
              <Dot
                key={i}
                $active={i === current}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </Dots>
          <CountText>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </CountText>
          <NavBtns>
            <NavBtn onClick={prev} aria-label="Previous">←</NavBtn>
            <NavBtn onClick={next} aria-label="Next">→</NavBtn>
          </NavBtns>
        </SlideCounter>
      </Inner>
    </Section>
  );
};

export default HackathonSection;
