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
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(201, 168, 76, 0.12);
  border-radius: 12px;
  overflow: hidden;
  padding: 0.75rem 0.75rem 1.25rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:nth-child(even) {
    margin-top: 4rem;
    @media (max-width: 768px) { margin-top: 0; }
  }

  &:hover {
    border-color: rgba(201, 168, 76, 0.35);
    box-shadow: 0 16px 48px rgba(201, 168, 76, 0.06);
    transform: translateY(-4px);
  }
`;

/* Image wrapper with cross-fade layers */
const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(201, 168, 76, 0.08);
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
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: ${({ $active }) => $active ? 'scale(1.0)' : 'scale(1.04)'};
  will-change: opacity, transform;

  /* Zoom-in when card hovered */
  ${ProjectCard}:hover & {
    filter: sepia(0.04) contrast(1.06) brightness(1.02);
    transform: scale(1.06);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(8, 7, 5, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const HoverActionBtn = styled.div`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #0d0b08;
  background: var(--accent-gold);
  padding: 0.55rem 1.1rem;
  border-radius: 2px;
  box-shadow: 0 4px 15px rgba(201, 168, 76, 0.4);
  transform: translateY(12px);
  opacity: 0;
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  font-weight: 700;

  ${ProjectCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
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

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const TechTag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid rgba(201, 168, 76, 0.12);
  padding: 0.15rem 0.45rem;
  background: rgba(201, 168, 76, 0.02);
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    color: var(--accent-gold);
    border-color: rgba(201, 168, 76, 0.3);
    background: rgba(201, 168, 76, 0.05);
  }
`;

const CardFooter = styled.div`
  padding: 1.25rem 0.25rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardMainRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const CardSubRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.25;
  transition: color 0.3s ease;

  ${ProjectCard}:hover & {
    color: var(--accent-gold);
  }
`;

const CardYear = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
`;

const CardMetricTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent-gold);
  background: rgba(201, 168, 76, 0.08);
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 2px;
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

const ModalVisitBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.55rem 1.1rem;
  background: var(--accent-gold);
  color: #0d0b08;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    background: transparent;
    color: var(--accent-gold);
    border-color: var(--accent-gold);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(4, 3, 2, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 900px;
  background: #0e0c09;
  border: 1px solid var(--border-ornament);
  margin: 8vh auto;
  padding: 3.5rem 3.5rem;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);

  ${ModalOverlay}.active & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 2.2rem 1.5rem;
    margin: 3vh auto;
    width: 95%;
  }
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: 1px solid var(--border-ornament);
  color: var(--accent-gold);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 2px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: var(--accent-gold);
    color: #0d0b08;
    border-color: transparent;
  }
`;

const ModalTitle = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.15;
  .italic {
    font-style: italic;
    color: var(--accent-gold);
  }
`;

const ModalMeta = styled.div`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 2rem;
  span {
    color: var(--accent-gold);
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ModalDesc = styled.div`
  .section-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-gold);
    margin-bottom: 0.8rem;
    border-bottom: 1px solid rgba(201, 168, 76, 0.15);
    padding-bottom: 0.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--text-secondary);
  }
`;

const ModalFeatures = styled.div`
  .section-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-gold);
    margin-bottom: 0.8rem;
    border-bottom: 1px solid rgba(201, 168, 76, 0.15);
    padding-bottom: 0.4rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    li {
      font-family: var(--font-body);
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--text-secondary);
      display: flex;
      gap: 0.6rem;
      align-items: flex-start;

      &::before {
        content: '◈';
        color: var(--accent-gold);
        font-size: 0.65rem;
        margin-top: 0.25rem;
        flex-shrink: 0;
      }
    }
  }
`;

const ModalTechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
`;

const ModalImagesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2rem;
`;

const ModalImageWrapper = styled.div`
  width: 100%;
  border: 1px solid var(--border-ornament);
  background: rgba(255, 255, 255, 0.01);
  padding: 6px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 12px;
    border: 1px solid rgba(201, 168, 76, 0.06);
    pointer-events: none;
    border-radius: 4px;
    z-index: 2;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    border-radius: 4px;
    filter: sepia(0.04) contrast(1.02);
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
    detailsText: "A high-performance secure web dashboard engineered for the Municipal Corporation of Greater Mumbai (BMC) and Ministry of External Affairs. This platform streamlines administrative approvals, secure citizen data management, and real-time activity logging, processing heavy daily transactions with rock-solid security constraints.",
    detailsFeatures: [
      "Developed highly secure Next.js frontend integrated with an authorized Node.js/Express API gateway.",
      "Designed a fully optimized MySQL database schema to handle concurrent citizen applications.",
      "Implemented stateless authentication using JSON Web Tokens (JWT) with HTTP-only cookies to safeguard sessions.",
      "Optimized rendering and API response times under 200ms using server-side rendering (SSR) caching."
    ]
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
    detailsText: "A state-of-the-art landing page and booking system built for Clever Studio Agency. Designed to captivate high-profile creative clients with immersive visual interactions, smooth transitions, and a custom scheduling engine that manages agency workflows.",
    detailsFeatures: [
      "Engineered fluid animations using GSAP and Lenis smooth scrolling for premium visual appeal.",
      "Integrated automated workflow triggers (via n8n) to sync client inquiries directly into CRM.",
      "Built responsive layouts using CSS grid systems tailored for smooth mobile rendering.",
      "Implemented highly optimized image hosting and responsive sizing to guarantee 95+ PageSpeed scores."
    ]
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
    detailsText: "A complete car rental platform serving the United Arab Emirates (UAE) market. Customers can browse a luxury fleet, select dates, view dynamic pricing, upload documents, and complete rental bookings with automated validation.",
    detailsFeatures: [
      "Built a secure booking dashboard with React and Express, enabling smooth vehicle booking flows.",
      "Integrated automated UAE document validation systems to verify driver licenses and IDs.",
      "Designed a customized scheduling calendar using MongoDB to track fleet availability in real time.",
      "Structured a multi-tiered price calculator that handles seasonal rates, VAT, and security deposits."
    ]
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
    detailsText: "A comprehensive travel platform for Miles India, allowing users to discover curated tours, construct custom itineraries, and book travel packages online. Powered by a robust cloud architecture to handle high booking traffic.",
    detailsFeatures: [
      "Developed an interactive itinerary builder using React, allowing drag-and-drop tour customization.",
      "Implemented a fast and indexed search system over a large MySQL tour package database.",
      "Configured AWS EC2 hosting and S3 asset delivery to support rich visual media of tour spots.",
      "Structured an automated email booking notification pipeline using AWS SES."
    ]
  },
  // ── Thinkbar fifth ──
  {
    category: "Full Stack Web",
    name: "Thinkbar — AI-Powered Agency",
    year: "2026",
    tech: ["Next.js", "n8n", "AI/LLM", "Node.js"],
    metric: { val: "Live", lbl: "Production" },
    imgs: [thinkbar1, thinkbar2, thinkbar3, thinkbar4, thinkbar7, thinkbar9],
    url: "https://www.thinkbar.in/",
    detailsText: "An AI-powered agency platform that features intelligent agent workflows, natural language consultation scheduling, and rich interactive visual storytelling components. Integrated with modern AI models to automate agency lead qualifications.",
    detailsFeatures: [
      "Developed an automated AI agent via n8n that captures and qualifies incoming user requirements in real time.",
      "Built an immersive Next.js frontend with Tailwind and GSAP scroll effects for interactive storytelling.",
      "Configured custom API endpoints using LLMs to draft personalized proposals for prospective leads.",
      "Deployed on Vercel with serverless function handlers for highly scalable API processing."
    ]
  },
  {
    category: "AI & RAG",
    name: "RIKO — AI-Powered Assistant",
    year: "2025",
    tech: ["Next.js", "OpenAI", "LangChain", "RAG"],
    metric: { val: "AI", lbl: "Powered" },
    imgs: [rikoAI1, rikoAI2],
    url: "https://riko-ai-delta.vercel.app/",
    detailsText: "A powerful conversational assistant featuring a Retrieval-Augmented Generation (RAG) pipeline. RIKO allows users to upload documents or link databases, and query their files securely with contextual, cited answers.",
    detailsFeatures: [
      "Implemented a secure LangChain pipeline utilizing OpenAI embeddings and vector database storage.",
      "Built a real-time streaming chat UI using Next.js Server Components and server-sent events.",
      "Structured automatic chunking and indexing algorithms to process PDFs, CSVs, and markdown files.",
      "Protected against data leakage by isolating user vector spaces in the database level."
    ]
  },
  {
    category: "Full Stack Web",
    name: "CESA-CSI Community Platform",
    year: "2024",
    tech: ["React", "Node.js", "MongoDB"],
    metric: { val: "2", lbl: "Dashboards" },
    imgs: [cesa1, cesa2, cesa3, cesa4, cesa5],
    url: "https://cesa-csi-pvppcoe.vercel.app/",
    detailsText: "A dedicated community and administrative platform built for the PVPPCOE student organization. Features dual administrative dashboards, event registrations, ticket distributions, and member directories.",
    detailsFeatures: [
      "Built twin administrative panels in React to separate staff roles from student organizers.",
      "Configured database relations in MongoDB to track registrations, attendance, and member profiles.",
      "Designed and generated dynamic PDF tickets containing secure QR codes for automated event check-ins.",
      "Optimized load management to handle over 1,500 concurrent students during active event registrations."
    ]
  },
  {
    category: "Full Stack Web",
    name: "Azzirevents — Event Management",
    year: "2025",
    tech: ["Next.js", "Node.js", "Stripe", "MongoDB"],
    metric: { val: "Live", lbl: "Events" },
    imgs: [azzir1, azzir2, azzir3, azzir4],
    url: "https://azzirevents.com/",
    detailsText: "A premium event planning and management application featuring real-time ticketing, slot booking, secure payment processing, and administrative dashboards.",
    detailsFeatures: [
      "Integrated Stripe API for secure multi-currency ticket sales and billing management.",
      "Developed responsive Next.js layouts to handle seat allocation map layouts dynamically.",
      "Built a fully-featured reporting dashboard displaying ticket sales analytics and user demographics.",
      "Configured secure email ticket delivery via Nodemailer with attached PDF booking confirmations."
    ]
  },
  {
    category: "Full Stack Web",
    name: "Oaktree — Premium Platform",
    year: "2024",
    tech: ["Next.js", "React", "MySQL"],
    metric: { val: "Live", lbl: "Production" },
    imgs: [oak1, oak2, oak3],
    url: "https://www.oaktree.in/",
    detailsText: "A premium corporate web platform featuring interactive portfolio displays, partner portals, and content management systems for Oaktree services.",
    detailsFeatures: [
      "Designed a clean, content-first portal utilizing React, Next.js, and structured MySQL tables.",
      "Built an administrative CMS allowing updates to corporate portfolios with zero downtime.",
      "Engineered responsive layout systems with strict accessibility (WCAG AA) standards.",
      "Configured automated database backup scripts scheduled on cloud environments."
    ]
  },
  {
    category: "Full Stack Web",
    name: "EvoHerbals — E-Commerce",
    year: "2023",
    tech: ["Next.js", "Shopify API", "Tailwind"],
    metric: { val: "Live", lbl: "Store" },
    imgs: [evoherbals],
    url: "https://evoherbals.com/",
    detailsText: "A full-scale E-Commerce store built for EvoHerbals, featuring organic health products. Includes shopping cart systems, local payment integrations, and inventory control panels.",
    detailsFeatures: [
      "Connected Next.js frontend to Shopify Storefront API for high-performance headless commerce.",
      "Designed customized product grids and filter systems to easily sort by category and ingredients.",
      "Integrated secure checkout pathways with direct payment processor callbacks.",
      "Optimized frontend assets yielding average loading times under 1 second."
    ]
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
    detailsText: "An automated n8n workflow that uses web crawlers and AI models to identify high-quality prospects on LinkedIn, draft personalized outreach messages, and register them in a central CRM.",
    detailsFeatures: [
      "Configured a multi-stage n8n workflow executing search queries and extracting profile metadata.",
      "Integrated OpenAI models to analyze profile text and generate personalized outreach copy.",
      "Built an automated webhook pipeline to sync qualified leads directly into CRM sheets.",
      "Designed robust error-handling mechanisms that prevent bot detection by mimicking human behavior."
    ]
  },
  {
    category: "Automation",
    name: "SEO Keyword Ranking Tracker",
    year: "2025",
    tech: ["n8n", "DataForSEO", "Google Sheets", "Automation"],
    metric: { val: "Auto", lbl: "Tracking" },
    imgs: [seoTracking],
    url: null,
    detailsText: "An automated tracking pipeline that queries search engine API databases for targeted keywords, monitors ranking positions, and publishes historical trends in interactive Google Sheets.",
    detailsFeatures: [
      "Constructed automated n8n pipelines triggered daily via cron schedules.",
      "Integrated DataForSEO API to fetch accurate search engine results pages (SERP) positions.",
      "Implemented Google Sheets API writing blocks to structure ranking movements.",
      "Set up automatic Slack alerts reporting major gains or losses in search ranks."
    ]
  },
  {
    category: "Automation",
    name: "Reddit Automation Lead Gen",
    year: "2025",
    tech: ["n8n", "Reddit API", "AI/LLM", "Automation"],
    metric: { val: "Auto", lbl: "Sourcing" },
    imgs: [redditAuto],
    url: null,
    detailsText: "A monitoring tool that tracks target subreddits for specific queries or pain points in real time. It uses AI models to draft helpful, relevant responses that soft-promote services, generating automated organic traffic.",
    detailsFeatures: [
      "Developed a custom Reddit API wrapper running within an n8n webhook loop.",
      "Configured GPT-4o analysis to determine poster intent and ensure responses add high value first.",
      "Built a dashboard tracking engagement, upvotes, and referral clicks generated by posts.",
      "Set up strict filtering rules to avoid posting in unrelated or policy-restricted subreddits."
    ]
  },
  {
    category: "Automation",
    name: "Upwork Lead Generation Bot",
    year: "2025",
    tech: ["n8n", "Upwork API", "AI/LLM", "Webhooks"],
    metric: { val: "Auto", lbl: "Outreach" },
    imgs: [upworkLead],
    url: null,
    detailsText: "An active monitoring bot that polls Upwork's job feed, parses job descriptions, qualifies matches using AI models, and draft custom proposal letters based on the developer's portfolio.",
    detailsFeatures: [
      "Configured Upwork RSS feed scraping inside n8n to bypass rate limits.",
      "Used LLMs to match job requirements against a database of technical skills.",
      "Generated personalized cover letter drafts with reference projects automatically inserted.",
      "Sent push notifications to mobile via Telegram whenever high-priority matches were found."
    ]
  },
  {
    category: "Automation",
    name: "LinkedIn Lead Gen Pipeline",
    year: "2025",
    tech: ["n8n", "LinkedIn API", "AI/LLM", "CRM"],
    metric: { val: "Auto", lbl: "Pipeline" },
    imgs: [linkedLead],
    url: null,
    detailsText: "A bulk contact pipeline that handles client discovery, CRM indexing, automatic email enrichment, and multi-channel outreach workflows.",
    detailsFeatures: [
      "Built a complex n8n flow connecting database lookups, scraper APIs, and email finders.",
      "Integrated Apollo.io API to enrich scraped profiles with business emails.",
      "Created multi-step sequences combining LinkedIn connection requests and follow-up emails.",
      "Configured a centralised dashboard visualizing response rates and conversion funnels."
    ]
  }
];

const categories = ["All", "Full Stack Web", "AI & RAG", "Automation"];

/* ─────────────────── ProjectCardItem (hover cross-fade) ─────────────────── */
const ProjectCardItem = ({ project, cardRef, onOpenDetails }) => {
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(project)}
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
        <CardOverlay className="card-overlay">
          <HoverActionBtn>View Project ✦</HoverActionBtn>
        </CardOverlay>

        {/* Dot indicators — only show if multiple images */}
        {project.imgs.length > 1 && (
          <ImgDots>
            {project.imgs.map((_, i) => (
              <ImgDot key={i} $active={i === activeIdx} />
            ))}
          </ImgDots>
        )}
      </CardImage>

      <CardFooter>
        <CardMainRow>
          <CardTitle>{project.name}</CardTitle>
          <CardYear>{project.year}</CardYear>
        </CardMainRow>
        
        <CardSubRow>
          <TechRow>
            {project.tech.map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
          </TechRow>
          
          <CardMetricTag>
            <span style={{ 
              display: 'inline-block', 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: project.metric.val.toLowerCase() === 'live' ? '#2ecc71' : 'var(--accent-gold)' 
            }} />
            {project.metric.val} · {project.metric.lbl}
          </CardMetricTag>
        </CardSubRow>
      </CardFooter>
    </ProjectCard>
  );
};

const ProjectDetailsModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const featuresRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (!project) return;

    // Trigger overlay fade in and scale up content
    const overlay = overlayRef.current;
    if (overlay) overlay.classList.add("active");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate text elements
    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.4"
    )
    .fromTo(
      featuresRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.4"
    );

    // Animate images staggered
    const images = imagesRef.current.filter(Boolean);
    if (images.length > 0) {
      tl.fromTo(
        images,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        "-=0.3"
      );
    }

    return () => {
      if (overlay) overlay.classList.remove("active");
      tl.kill();
    };
  }, [project]);

  if (!project) return null;

  return (
    <ModalOverlay data-lenis-prevent ref={overlayRef} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseBtn onClick={onClose}>✕ CLOSE</ModalCloseBtn>
        
        <ModalTitle ref={titleRef}>
          {project.name.split(" — ")[0]}{" "}
          {project.name.split(" — ")[1] && (
            <span className="italic">— {project.name.split(" — ")[1]}</span>
          )}
        </ModalTitle>

        <ModalMeta>
          Category: <span>{project.category}</span> &nbsp;·&nbsp; Year: <span>{project.year}</span>
        </ModalMeta>

        <ModalBody>
          <ModalDesc ref={descRef}>
            <div className="section-title">Overview</div>
            <p>{project.detailsText || "No overview available."}</p>
            {project.url && (
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <ModalVisitBtn href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit Live Site ↗
                </ModalVisitBtn>
              </div>
            )}
            <ModalTechTags>
              {project.tech.map((t) => (
                <span key={t} className="tech-tag" style={{ border: '1px solid rgba(201,168,76,0.3)', color: 'var(--accent-gold)', background: 'rgba(8,7,5,0.6)' }}>
                  {t}
                </span>
              ))}
            </ModalTechTags>
          </ModalDesc>

          {project.detailsFeatures && project.detailsFeatures.length > 0 && (
            <ModalFeatures ref={featuresRef}>
              <div className="section-title">Key Work & Features</div>
              <ul>
                {project.detailsFeatures.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </ModalFeatures>
          )}

          <div style={{ marginTop: '1rem' }}>
            <div className="section-label" style={{ marginBottom: '1.5rem', justifyContent: 'flex-start' }}>Screenshots</div>
            <ModalImagesStack>
              {project.imgs.map((src, i) => (
                <ModalImageWrapper
                  key={i}
                  ref={(el) => (imagesRef.current[i] = el)}
                >
                  <img src={src} alt={`${project.name} full screenshot ${i + 1}`} loading="lazy" />
                </ModalImageWrapper>
              ))}
            </ModalImagesStack>
          </div>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

/* ─────────────────── Main Component ─────────────────── */
const PortfolioSection = () => {
  const { setCursorSettings, locoScroll } = useContextProvider();
  const titleRef     = useRef(null);
  const cardsRef     = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    if (locoScroll) {
      locoScroll.stop();
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
    if (locoScroll) {
      locoScroll.start();
    } else {
      document.body.style.overflow = "";
    }
  };

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
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </ProjectGrid>

        <OrnamentRow>
          ✦ &nbsp; {filtered.length} Project{filtered.length !== 1 ? 's' : ''} &nbsp; ✦
        </OrnamentRow>
      </Inner>

      <ProjectDetailsModal project={selectedProject} onClose={handleCloseDetails} />
    </Container>
  );
};

export default PortfolioSection;
