import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useContextProvider } from '../../../utils/GlobleContextProvider';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Multi-image imports per project ── */

// MEA BMC
import meabmc1  from '../../../assets/projects/imprtant mea bmc.png';
import meabmc2  from '../../../assets/projects/mea bmc- 2.png';
import meabmc3  from '../../../assets/projects/mea bmc- 2 (2).png';
import meabmc4  from '../../../assets/projects/mea bmc- 2 (3).png';

// CleverStudio
import clever1  from '../../../assets/projects/cleverstudio -1.png';
import clever2  from '../../../assets/projects/cleverstudio - 2.png';
import clever3  from '../../../assets/projects/cleverstudio - 3.png';
import clever4  from '../../../assets/projects/cleverstudio - 4.png';
import clever5  from '../../../assets/projects/cleverstudio - 5.png';
import clever6  from '../../../assets/projects/cleverstudio - 6.png';
import clever7  from '../../../assets/projects/cleverstudio - 7.png';

// Dware Rent a Car
import dware1   from '../../../assets/projects/dwarentacar - 1.png';
import dware2   from '../../../assets/projects/dwarentacar - 2.png';
import dware3   from '../../../assets/projects/dwarentacar - 3.png';
import dware4   from '../../../assets/projects/dwarentacar - 4.png';
import dware5   from '../../../assets/projects/dwarentacar - 5.png';
import dware6   from '../../../assets/projects/dwarentacar - 6.png';
import dware7   from '../../../assets/projects/dwarentacar - 7.png';
import dware8   from '../../../assets/projects/dwarentacar - 8.png';
import dware9   from '../../../assets/projects/dwarentacar - 9.png';
import dware10  from '../../../assets/projects/dwarentacar 10.png';

// Miles India
import miles1   from '../../../assets/projects/MILES INDAI.png';
import miles2   from '../../../assets/projects/MILES INDAI -2.png';
import miles3   from '../../../assets/projects/MILES INDAI -3.png';
import miles4   from '../../../assets/projects/miles inda 3.png';
import miles5   from '../../../assets/projects/miles indai 4.png';

// Thinkbar
import thinkbar1 from '../../../assets/projects/thinkbar 1.png';
import thinkbar2 from '../../../assets/projects/thinkbar 2.png';
import thinkbar3 from '../../../assets/projects/thinkbar 3.png';
import thinkbar4 from '../../../assets/projects/thinkbar 4.png';
import thinkbar7 from '../../../assets/projects/thinkbar 7.png';
import thinkbar9 from '../../../assets/projects/thinkbar 9.png';

// RIKO AI
import rikoAI1  from '../../../assets/projects/AI RIKO.png';
import rikoAI2  from '../../../assets/projects/AI RIKO -2.png';

// CESA CSI
import cesa1    from '../../../assets/projects/cesa csi.png';
import cesa2    from '../../../assets/projects/CESA CSI -2.png';
import cesa3    from '../../../assets/projects/CESA CSI -3.png';
import cesa4    from '../../../assets/projects/CESA CSI - 4.png';
import cesa5    from '../../../assets/projects/CESA CSI COMMUNITE -1.png';

// Azzirevents
import azzir1   from '../../../assets/projects/AZZIR -1.png';
import azzir2   from '../../../assets/projects/AZZIR -2.png';
import azzir3   from '../../../assets/projects/AZZIR -3.png';
import azzir4   from '../../../assets/projects/AZZIR -4.png';

// Oaktree
import oak1     from '../../../assets/projects/oak free - 1.png';
import oak2     from '../../../assets/projects/oaktree - 2.png';
import oak3     from '../../../assets/projects/oaktree - 3.png';

// EvoHerbals
import evoherbals from '../../../assets/portfolio/evoherbals.png';

// Automation
import aiLinkedin  from '../../../assets/projects/AI Agent Linkedin Lead gen.png';
import seoTracking from '../../../assets/projects/SEO Keyword Ranking Tracking.png';
import redditAuto  from '../../../assets/projects/reddit autotmation lead gen.png';
import upworkLead  from '../../../assets/projects/upwork lead gen.png';
import linkedLead  from '../../../assets/projects/linked lead gen.png';

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
  .char {
    display: inline-block;
    will-change: transform, opacity;
  }
  .italic { font-style: italic; color: var(--accent-gold); }
`;

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

  &:hover .card-overlay { opacity: 1; }
  &:hover .card-meta {
    transform: translateY(0);
    opacity: 1;
  }
`;

/* Image wrapper with cross-fade layers */
const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(201,168,76,0.08);
`;

/* Each image layer sits absolutely */
const ImgLayer = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  filter: sepia(0.06) contrast(1.03) brightness(0.96);
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: ${({ $active }) => $active ? 'scale(1.0)' : 'scale(1.04)'};
  will-change: opacity, transform;

  /* Slight scale-up when card hovered */
  ${ProjectCard}:hover & {
    filter: sepia(0.05) contrast(1.08) brightness(1.05);
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

/* Small image dot indicators */
const ImgDots = styled.div`
  position: absolute;
  bottom: 0.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & { opacity: 1; }
`;

const ImgDot = styled.span`
  width: ${({ $active }) => $active ? '16px' : '5px'};
  height: 5px;
  border-radius: 3px;
  background: ${({ $active }) => $active ? 'var(--accent-gold)' : 'rgba(201,168,76,0.35)'};
  transition: all 0.35s ease;
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
  // ── REQUESTED ORDER: MEA BMC first ──
  {
    category: "Full Stack Web",
    name: "MEA BMC — Government Dashboard",
    year: "2025",
    tech: ["Next.js", "Node.js", "MySQL", "JWT"],
    metric: { val: "Gov", lbl: "Prod" },
    imgs: [meabmc1, meabmc2, meabmc3, meabmc4],
    url: "https://meabmc.com/",
  },
  // ── CleverStudio second ──
  {
    category: "Full Stack Web",
    name: "Clever Studio Agency",
    year: "2024",
    tech: ["Next.js", "React", "Node.js", "Tailwind"],
    metric: { val: "Live", lbl: "Production" },
    imgs: [clever1, clever2, clever3, clever4, clever5, clever6, clever7],
    url: "https://cleverstudio.in/",
  },
  // ── Dware Rent a Car third ──
  {
    category: "Full Stack Web",
    name: "Dwarentacar — Car Rental Platform",
    year: "2024",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    metric: { val: "UAE", lbl: "Market" },
    imgs: [dware1, dware2, dware3, dware4, dware5, dware6, dware7, dware8, dware9, dware10],
    url: "https://www.dwarentacar.ae/",
  },
  // ── Miles India fourth ──
  {
    category: "Full Stack Web",
    name: "Miles India — Travel Platform",
    year: "2024",
    tech: ["React", "Node.js", "MySQL", "AWS"],
    metric: { val: "Live", lbl: "Production" },
    imgs: [miles1, miles2, miles3, miles4, miles5],
    url: "https://milesindia.in/",
  },
  // ── Thinkbar fifth (NEW) ──
  {
    category: "Full Stack Web",
    name: "Thinkbar — AI-Powered Agency",
    year: "2026",
    tech: ["Next.js", "n8n", "AI/LLM", "Node.js"],
    metric: { val: "Live", lbl: "Production" },
    imgs: [thinkbar1, thinkbar2, thinkbar3, thinkbar4, thinkbar7, thinkbar9],
    url: "https://www.thinkbar.in/",
  },
  {
    category: "AI & RAG",
    name: "RIKO — AI-Powered Assistant",
    year: "2025",
    tech: ["Next.js", "OpenAI", "LangChain", "RAG"],
    metric: { val: "AI", lbl: "Powered" },
    imgs: [rikoAI1, rikoAI2],
    url: "https://riko-ai-delta.vercel.app/",
  },
  {
    category: "Full Stack Web",
    name: "CESA-CSI Community Platform",
    year: "2024",
    tech: ["React", "Node.js", "MongoDB"],
    metric: { val: "2", lbl: "Dashboards" },
    imgs: [cesa1, cesa2, cesa3, cesa4, cesa5],
    url: "https://cesa-csi-pvppcoe.vercel.app/",
  },
  {
    category: "Full Stack Web",
    name: "Azzirevents — Event Management",
    year: "2025",
    tech: ["Next.js", "Node.js", "Stripe", "MongoDB"],
    metric: { val: "Live", lbl: "Events" },
    imgs: [azzir1, azzir2, azzir3, azzir4],
    url: "https://azzirevents.com/",
  },
  {
    category: "Full Stack Web",
    name: "Oaktree — Premium Platform",
    year: "2024",
    tech: ["Next.js", "React", "MySQL"],
    metric: { val: "Live", lbl: "Production" },
    imgs: [oak1, oak2, oak3],
    url: "https://www.oaktree.in/",
  },
  {
    category: "Full Stack Web",
    name: "EvoHerbals — E-Commerce",
    year: "2023",
    tech: ["Next.js", "Shopify API", "Tailwind"],
    metric: { val: "Live", lbl: "Store" },
    imgs: [evoherbals],
    url: "https://evoherbals.com/",
  },
  // ── Automation projects ──
  {
    category: "Automation",
    name: "LinkedIn AI Lead Generation Agent",
    year: "2025",
    tech: ["n8n", "AI/LLM", "Browser Agent", "Webhooks"],
    metric: { val: "100+", lbl: "Leads" },
    imgs: [aiLinkedin],
    url: null,
  },
  {
    category: "Automation",
    name: "SEO Keyword Ranking Tracker",
    year: "2025",
    tech: ["n8n", "DataForSEO", "Google Sheets", "Automation"],
    metric: { val: "Auto", lbl: "Tracking" },
    imgs: [seoTracking],
    url: null,
  },
  {
    category: "Automation",
    name: "Reddit Automation Lead Gen",
    year: "2025",
    tech: ["n8n", "Reddit API", "AI/LLM", "Automation"],
    metric: { val: "Auto", lbl: "Sourcing" },
    imgs: [redditAuto],
    url: null,
  },
  {
    category: "Automation",
    name: "Upwork Lead Generation Bot",
    year: "2025",
    tech: ["n8n", "Upwork API", "AI/LLM", "Webhooks"],
    metric: { val: "Auto", lbl: "Outreach" },
    imgs: [upworkLead],
    url: null,
  },
  {
    category: "Automation",
    name: "LinkedIn Lead Gen Pipeline",
    year: "2025",
    tech: ["n8n", "LinkedIn API", "AI/LLM", "CRM"],
    metric: { val: "Auto", lbl: "Pipeline" },
    imgs: [linkedLead],
    url: null,
  },
];

const categories = ["All", "Full Stack Web", "AI & RAG", "Automation"];

/* ─────────────────── ProjectCardItem (hover cross-fade) ─────────────────── */
const ProjectCardItem = ({ project, cardRef, onClick }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const startCycle = useCallback(() => {
    if (project.imgs.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % project.imgs.length);
    }, 1200);
  }, [project.imgs.length]);

  const stopCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    setActiveIdx(0);
  }, []);

  useEffect(() => {
    if (isHovered) {
      startCycle();
    } else {
      stopCycle();
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, startCycle, stopCycle]);

  return (
    <ProjectCard
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardImage className="card-image">
        {project.imgs.map((src, i) => (
          <ImgLayer
            key={i}
            src={src}
            alt={`${project.name} screenshot ${i + 1}`}
            $active={i === activeIdx}
          />
        ))}
        <CardOverlay className="card-overlay" />
        <ViewPill>{project.url ? 'Visit →' : 'Preview'}</ViewPill>

        {/* Dot indicators — only show if multiple images */}
        {project.imgs.length > 1 && (
          <ImgDots>
            {project.imgs.map((_, i) => (
              <ImgDot key={i} $active={i === activeIdx} />
            ))}
          </ImgDots>
        )}

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
  );
};

/* ─────────────────── Main Component ─────────────────── */
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
            <ProjectCardItem
              key={project.name}
              project={project}
              cardRef={(el) => (cardsRef.current[index] = el)}
              onClick={() => project.url && window.open(project.url, '_blank')}
            />
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
