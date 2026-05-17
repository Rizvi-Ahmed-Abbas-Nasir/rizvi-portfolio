import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useContextProvider } from '../../../utils/GlobleContextProvider';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Project image imports (from assets/projects) ── */
import cleverstudio1   from '../../../assets/projects/cleverstudio -1.png';
import dwarentacar1    from '../../../assets/projects/dwarentacar - 1.png';
import oaktree1        from '../../../assets/projects/oak free - 1.png';
import rikoAI          from '../../../assets/projects/AI RIKO.png';
import cesaCSI         from '../../../assets/projects/cesa csi.png';
import evoherbals      from '../../../assets/portfolio/evoherbals.png';
import milesIndia      from '../../../assets/projects/MILES INDAI.png';
import azzirevents     from '../../../assets/projects/AZZIR -1.png';
import meabmc          from '../../../assets/projects/imprtant mea bmc.png';
import aiDesktop       from '../../../assets/projects/AI Agent Linkedin Lead gen.png';
import oncology        from '../../../assets/projects/SEO Keyword Ranking Tracking.png';

/* ─────────────────── Styled Components ─────────────────── */

const Container = styled.div`
  padding: var(--section-padding) var(--container-padding);
  @media (max-width: 768px) { padding: 3rem 1.25rem; }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  overflow: hidden;
`;

/* Clip wrapper for the bottom-to-top reveal */
const TitleClip = styled.div`
  overflow: hidden;
  display: block;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -1px;
  line-height: 1;
  color: var(--text-primary);
  /* each .char will be clipped by its parent overflow:hidden wrapper */
  .char {
    display: inline-block;
    will-change: transform, opacity;
  }
  .italic { font-style: italic; color: var(--accent-gold); }
`;

/* ── Category filter tabs ── */
const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const FilterBtn = styled.button`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.45rem 1.1rem;
  border: 1px solid ${({ $active }) => $active ? 'var(--accent-gold)' : 'var(--border-glass)'};
  background: ${({ $active }) => $active ? 'rgba(201,168,76,0.12)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--accent-gold)' : 'var(--text-muted)'};
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
    background: rgba(201,168,76,0.06);
  }
`;

/* ── Masonry-style 2-col grid ── */
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ProjectCard = styled.div`
  position: relative;
  opacity: 0;
  cursor: pointer;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 12px;
  overflow: hidden;
  padding: 0.75rem 0.75rem 0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:nth-child(even) {
    margin-top: 4rem;
    @media (max-width: 768px) { margin-top: 0; }
  }

  &:hover {
    border-color: rgba(201,168,76,0.35);
    box-shadow: 0 12px 48px rgba(201,168,76,0.08);
  }

  &:hover .card-image img {
    transform: scale(1.04);
    filter: sepia(0.05) contrast(1.08) brightness(1.05);
  }
  &:hover .card-overlay { opacity: 1; }
  &:hover .card-meta {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(201,168,76,0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.6s var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1)),
                filter 0.4s ease;
    filter: sepia(0.06) contrast(1.03) brightness(0.96);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, rgba(8,7,5,0.92) 100%);
  opacity: 0.7;
  transition: opacity 0.4s ease;
  z-index: 1;
`;

const ViewPill = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-gold);
  color: #080705;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  z-index: 3;
  opacity: 0;
  transform: translateY(-6px);
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardMeta = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  z-index: 2;
  transform: translateY(8px);
  opacity: 0.85;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
`;

const CardCategory = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent-gold);
  display: block;
  margin-bottom: 0.35rem;
`;

const CardName = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: #f5f0e8;
  line-height: 1.2;
  margin-bottom: 0.6rem;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const TechTag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(201,168,76,0.6);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 0.15rem 0.45rem;
  background: rgba(8,7,5,0.6);
`;

const CardFooter = styled.div`
  padding: 0.9rem 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardInfo = styled.div``;

const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
`;

const CardYear = styled.span`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
`;

const CardMetric = styled.div`
  text-align: right;
  .val {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 800;
    font-style: italic;
    color: var(--accent-gold);
    line-height: 1;
  }
  .lbl {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
  }
`;

const OrnamentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--accent-gold);
  opacity: 0.25;
  font-size: 0.6rem;
  letter-spacing: 4px;
  margin: 3rem 0 0;
  font-family: var(--font-mono);
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--accent-gold);
    opacity: 0.4;
  }
`;

/* ─────────────────── Project Data ─────────────────── */
const allProjects = [
  {
    category: "Full Stack Web",
    name: "Clever Studio Agency",
    year: "2024",
    tech: ["Next.js", "React", "Node.js", "Tailwind"],
    metric: { val: "Live", lbl: "Production" },
    img: cleverstudio1,
    url: "https://cleverstudio.in/",
  },
  {
    category: "Full Stack Web",
    name: "Dwarentacar — Car Rental Platform",
    year: "2024",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    metric: { val: "UAE", lbl: "Market" },
    img: dwarentacar1,
    url: "https://www.dwarentacar.ae/",
  },
  {
    category: "Full Stack Web",
    name: "Oaktree — Premium Platform",
    year: "2024",
    tech: ["Next.js", "React", "MySQL"],
    metric: { val: "Live", lbl: "Production" },
    img: oaktree1,
    url: "https://www.oaktree.in/",
  },
  {
    category: "AI & RAG",
    name: "RIKO — AI-Powered Assistant",
    year: "2025",
    tech: ["Next.js", "OpenAI", "LangChain", "RAG"],
    metric: { val: "AI", lbl: "Powered" },
    img: rikoAI,
    url: "https://riko-ai-delta.vercel.app/",
  },
  {
    category: "Full Stack Web",
    name: "CESA-CSI Community Platform",
    year: "2024",
    tech: ["React", "Node.js", "MongoDB"],
    metric: { val: "2", lbl: "Dashboards" },
    img: cesaCSI,
    url: "https://cesa-csi-pvppcoe.vercel.app/",
  },
  {
    category: "Full Stack Web",
    name: "EvoHerbals — E-Commerce",
    year: "2023",
    tech: ["Next.js", "Shopify API", "Tailwind"],
    metric: { val: "Live", lbl: "Store" },
    img: evoherbals,
    url: "https://evoherbals.com/",
  },
  {
    category: "Full Stack Web",
    name: "Miles India — Travel Platform",
    year: "2024",
    tech: ["React", "Node.js", "MySQL", "AWS"],
    metric: { val: "Live", lbl: "Production" },
    img: milesIndia,
    url: "https://milesindia.in/",
  },
  {
    category: "Full Stack Web",
    name: "Azzirevents — Event Management",
    year: "2025",
    tech: ["Next.js", "Node.js", "Stripe", "MongoDB"],
    metric: { val: "Live", lbl: "Events" },
    img: azzirevents,
    url: "https://azzirevents.com/",
  },
  {
    category: "Full Stack Web",
    name: "MEA BMC — Government Dashboard",
    year: "2025",
    tech: ["Next.js", "Node.js", "MySQL", "JWT"],
    metric: { val: "Gov", lbl: "Prod" },
    img: meabmc,
    url: "https://meabmc.com/",
  },
  {
    category: "AI & RAG",
    name: "n8n AI Lead Generation Agent",
    year: "2025",
    tech: ["n8n", "AI/LLM", "Browser Agent", "Webhooks"],
    metric: { val: "100+", lbl: "Leads" },
    img: aiDesktop,
    url: null,
  },
  {
    category: "AI & RAG",
    name: "SEO Keyword Ranking Tracker",
    year: "2025",
    tech: ["n8n", "DataForSEO", "Google Sheets", "Automation"],
    metric: { val: "Auto", lbl: "Tracking" },
    img: oncology,
    url: null,
  },
];

const categories = ["All", "Full Stack Web", "AI & RAG", "Automation"];

/* ─────────────────── Component ─────────────────── */
const PortfolioSection = () => {
  const { setCursorSettings } = useContextProvider();
  const titleRef     = useRef(null);
  const cardsRef     = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  /* ── Bottom-to-top split-text animation ── */
  useEffect(() => {
    if (!titleRef.current) return;

    const split = SplitType.create(titleRef.current, { types: 'chars,words' });

    // Each char starts below its clip boundary and rises into view
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

    return () => {
      tween.kill();
      split.revert();
    };
  }, []);

  /* ── Cards scroll-in animation ── */
  useEffect(() => {
    const cleanups = [];
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 50 });
      const tween = gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.65,
        delay: (i % 2) * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
      cleanups.push(() => tween.kill());
    });
    return () => cleanups.forEach((fn) => fn());
  }, [filtered]);

  return (
    <Container id="projects">
      <Inner>
        <div className="section-label">Portfolio</div>
        <Header>
          {/* Clip wrapper provides the mask for bottom-to-top reveal */}
          <TitleClip>
            <Title ref={titleRef}>
              Featured <span className="italic">Projects</span>
            </Title>
          </TitleClip>
        </Header>

        <FilterRow>
          {categories.map((cat) => (
            <FilterBtn
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </FilterBtn>
          ))}
        </FilterRow>

        <ProjectGrid>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.name}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => project.url && window.open(project.url, '_blank')}
            >
              <CardImage className="card-image">
                <img src={project.img} alt={project.name} />
                <CardOverlay className="card-overlay" />
                <ViewPill>{project.url ? 'Visit →' : 'Preview'}</ViewPill>
                <CardMeta className="card-meta">
                  <CardCategory>{project.category}</CardCategory>
                  <CardName>{project.name}</CardName>
                  <TechRow>
                    {project.tech.map((t) => <TechTag key={t}>{t}</TechTag>)}
                  </TechRow>
                </CardMeta>
              </CardImage>

              <CardFooter>
                <CardInfo>
                  <CardTitle>{project.name}</CardTitle>
                  <CardYear>{project.year} · {project.category}</CardYear>
                </CardInfo>
                <CardMetric>
                  <div className="val">{project.metric.val}</div>
                  <div className="lbl">{project.metric.lbl}</div>
                </CardMetric>
              </CardFooter>
            </ProjectCard>
          ))}
        </ProjectGrid>

        <OrnamentRow>
          ✦ &nbsp; {filtered.length} Project{filtered.length !== 1 ? 's' : ''} &nbsp; ✦
        </OrnamentRow>
      </Inner>
    </Container>
  );
};

export default PortfolioSection;
