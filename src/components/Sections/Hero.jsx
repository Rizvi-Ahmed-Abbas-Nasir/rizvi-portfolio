import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useContextProvider } from "../../utils/GlobleContextProvider";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   Styled Components
───────────────────────────────────────── */
const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding: 0;
  background: #040302;
`;

const GridCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #040302 100%);
  pointer-events: none;
  z-index: 1;
`;

/* Top-right dot only */
const TopRight = styled.div`
  position: absolute;
  top: 2rem;
  right: 8rem; /* sits left of the MENU button */
  z-index: 10;
  opacity: 0;
  display: flex;
  align-items: center;

  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 10px rgba(74,222,128,0.8);
    animation: pdot 2.5s ease-in-out infinite;
  }
  @keyframes pdot {
    0%,100% { opacity:1; box-shadow:0 0 10px rgba(74,222,128,0.8); }
    50%      { opacity:0.5; box-shadow:0 0 18px rgba(74,222,128,0.3); }
  }
`;

/* Main content area */
const TitleArea = styled.div`
  position: relative;
  z-index: 5;
  padding: 0 2.5rem;
  padding-top: 7vh;
  @media (max-width: 768px) { padding: 0 1.25rem; padding-top: 8vh; }
`;

/* Name — aligned with title text */
const NameLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
  opacity: 0;
`;

const TitleLine = styled.div`
  display: block;
  overflow: hidden;          /* clips chars rising from below */
  line-height: 0.88;
  will-change: transform;
  /* each SplitType char needs display:inline-block to be animatable */
  .char {
    display: inline-block;
    will-change: transform, opacity;
    transform-origin: bottom center;
  }
`;

const TitleOutlined = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 13rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 0.88;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(245,240,232,0.18);
  text-transform: uppercase;
  display: inline-block;
  user-select: none;
  transition: -webkit-text-stroke 0.4s ease;
  &:hover { -webkit-text-stroke: 1.5px rgba(201,168,76,0.55); }
`;

const TitleFilled = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 13rem);
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.03em;
  line-height: 0.88;
  color: var(--text-primary);
  text-transform: uppercase;
  display: inline-block;
  user-select: none;
`;

/* Rotating word — short words only, scale+opacity bounce */
const WordInner = styled.span`
  display: inline-block;
  color: var(--accent-gold);
  will-change: transform, opacity;
  transform-origin: center bottom;
`;

/* Sub row */
const SubRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0 1rem;
  gap: 2rem;
  opacity: 0;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem 0;
  }
`;

const SubDesc = styled.p`
  font-family: var(--font-body);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 340px;
`;

const FloatingTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
  max-width: 400px;
  @media (max-width: 900px) { justify-content: flex-start; }
`;

const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent-gold);
  border: 1px solid rgba(201,168,76,0.18);
  padding: 0.25rem 0.7rem;
  background: rgba(201,168,76,0.03);
  opacity: 0;
  transform: translateY(10px);
  transition: background 0.3s ease, border-color 0.3s ease;
  &:hover { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.4); }
`;

/* Bottom strip */
const BottomStrip = styled.div`
  position: relative;
  z-index: 5;
  border-top: 1px solid rgba(201,168,76,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  margin-top: 1rem;
  opacity: 0;
  @media (max-width: 768px) { padding: 0.8rem 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
`;

const BottomItem = styled.div`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  span { color: var(--text-secondary); }
`;

const ScrollCue = styled.div`
  display: flex; align-items: center; gap: 0.6rem;
  font-family: var(--font-mono); font-size: 0.6rem;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--text-muted); cursor: pointer;
  transition: color 0.3s ease;
  &:hover { color: var(--accent-gold); }
  .arrow {
    width: 24px; height: 24px;
    border: 1px solid rgba(201,168,76,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem;
    animation: bob 2s ease-in-out infinite;
  }
  @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
`;

/* Circular badge — bottom-right, clears all other elements */
const CircleBadge = styled.div`
  position: absolute;
  right: 2.5rem;
  bottom: 5rem;
  z-index: 6;
  width: 110px; height: 110px;
  opacity: 0;
  @media (max-width: 900px) { display: none; }
`;

const CircleText = styled.svg`
  width: 110px; height: 110px;
  animation: spin 14s linear infinite;
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`;

const CircleCenter = styled.div`
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 1.5rem; font-style: italic;
  color: var(--accent-gold);
`;

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
/* Short words — max 5 chars so they never cause overflow */
const WORDS = ["SHIP", "CODE", "BUILD", "RUN", "FIX", "TEST"];
const tags = ["React.js","Node.js","Django","AI/ML","AWS","n8n","Docker","Next.js"];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
const Hero = () => {
  const { preloader } = useContextProvider();
  const canvasRef   = useRef(null);
  const topRightRef = useRef(null);
  const nameLabelRef = useRef(null);
  const subRowRef   = useRef(null);
  const bottomRef   = useRef(null);
  const badgeRef    = useRef(null);
  const tagsRef     = useRef([]);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const line3Ref    = useRef(null);
  const line1ParallaxRef = useRef(null);
  const line2ParallaxRef = useRef(null);
  const line3ParallaxRef = useRef(null);
  const wordInnerRef = useRef(null);
  const rafRef      = useRef(null);

  const [wordIdx, setWordIdx] = useState(0);

  /* ── Rotating word — clean slide, no bounce ── */
  useEffect(() => {
    if (preloader) return;
    const interval = setInterval(() => {
      const el = wordInnerRef.current;
      if (!el) return;
      // Slide out upward
      gsap.to(el, {
        y: -20, opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          setWordIdx((prev) => (prev + 1) % WORDS.length);
          // Slide in from below — no elastic
          gsap.fromTo(el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
          );
        },
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [preloader]);


  /* ── Interactive dot grid ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, dots, mouse = { x: -9999, y: -9999 };
    const GAP = 40, R = 1.5, INF = 130;

    const build = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      dots = [];
      for (let x = GAP/2; x < W; x += GAP)
        for (let y = GAP/2; y < H; y += GAP)
          dots.push({ x, y, ox:x, oy:y, vx:0, vy:0 });
    };
    const onResize = () => build();
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    build();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < INF) {
          const f = (1 - dist/INF) * 26;
          d.vx += (dx/dist)*f*0.08; d.vy += (dy/dist)*f*0.08;
        }
        d.vx += (d.ox - d.x)*0.04; d.vy += (d.oy - d.y)*0.04;
        d.vx *= 0.82; d.vy *= 0.82;
        d.x += d.vx; d.y += d.vy;
        const br = dist < INF ? 0.12 + (1-dist/INF)*0.26 : 0.12;
        ctx.beginPath();
        ctx.arc(d.x, d.y, R, 0, Math.PI*2);
        ctx.fillStyle = `rgba(201,168,76,${br})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Magnetic lines ── */
  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    let active = true;

    // Monitor viewport presence to prevent vertical offset errors on scroll
    const st = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      onLeave: () => {
        active = false;
        onLeave();
      },
      onEnterBack: () => {
        active = true;
      },
    });

    const onMove = (e) => {
      if (!active) return;
      lines.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width/2)) / window.innerWidth;
        const dy = (e.clientY - (rect.top + rect.height/2)) / window.innerHeight;
        gsap.to(el, { x: dx*(i===1?16:8), y: dy*(i===1?16:8), duration:0.9, ease:"power2.out" });
      });
    };
    const onLeave = () => {
      lines.forEach((el) => {
        if (!el) return;
        gsap.to(el, { x:0, y:0, duration:1.2, ease:"elastic.out(1,0.4)" });
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      st.kill();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Scroll parallax — starts at x:0 so load position is always aligned ── */
  useEffect(() => {
    [
      { el: line1ParallaxRef.current, x:  30 },
      { el: line2ParallaxRef.current, x: -20 },
      { el: line3ParallaxRef.current, x:  25 },
    ].forEach(({ el, x }) => {
      if (!el) return;
      gsap.fromTo(el,
        { x: 0 },
        {
          x, ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });
  }, []);

  /* ── Entrance animations — true bottom-to-top split text ── */
  useEffect(() => {
    if (preloader) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Split all three title lines into chars
    const splits = [line1Ref, line2Ref, line3Ref].map((r) => {
      if (!r.current) return null;
      const s = SplitType.create(r.current, { types: 'chars,words' });
      // Start every char pushed below the overflow:hidden clip edge
      gsap.set(s.chars, {
        y: '105%',
        opacity: 0,
      });
      return s;
    });

    gsap.set(subRowRef.current,    { y: 28, opacity: 0 });
    gsap.set(badgeRef.current,     { scale: 0.8, opacity: 0 });
    gsap.set(nameLabelRef.current, { opacity: 0, y: 12 });

    tl
      .to(topRightRef.current,  { opacity: 1, duration: 0.7 }, 0)
      .to(nameLabelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.1)

      // ── Line 1: "I Build" — clean upward slide ──
      .to(splits[0]?.chars, {
        y: '0%',
        opacity: 1,
        duration: 0.85,
        stagger: { amount: 0.30 },
        ease: 'power3.out',
      }, 0.18)

      // ── Line 2: "Craft & WORD" ──
      .to(splits[1]?.chars, {
        y: '0%',
        opacity: 1,
        duration: 0.85,
        stagger: { amount: 0.30 },
        ease: 'power3.out',
      }, 0.36)

      // ── Line 3: "Products" ──
      .to(splits[2]?.chars, {
        y: '0%',
        opacity: 1,
        duration: 0.85,
        stagger: { amount: 0.25 },
        ease: 'power3.out',
      }, 0.52)

      .to(subRowRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.8)
      .to(tagsRef.current,    { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' }, 0.95)
      .to(bottomRef.current,  { opacity: 1, duration: 0.5 }, 1.1)
      .to(badgeRef.current,   { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, 1.0)

      // Release line2 overflow so rotating word can scale freely
      .call(() => {
        if (line2Ref.current) line2Ref.current.style.overflow = 'visible';
      });

    return () => {
      tl.kill();
      splits.forEach((s) => s?.revert());
    };
  }, [preloader]);


  return (
    <Section id="hero">
      <GridCanvas ref={canvasRef} />
      <Vignette />

      {/* Green dot only — top right */}
      <TopRight ref={topRightRef}>
        <span className="dot" />
      </TopRight>

      {/* Circular badge */}
      <CircleBadge ref={badgeRef}>
        <CircleText viewBox="0 0 110 110">
          <defs>
            <path id="cp" d="M 55,55 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text fill="rgba(201,168,76,0.5)" fontSize="9.5" fontFamily="Courier Prime,monospace" letterSpacing="3.2">
            <textPath href="#cp">HACKATHON WINNER · FULL STACK · AI/ML ·&nbsp;</textPath>
          </text>
        </CircleText>
        <CircleCenter>✦</CircleCenter>
      </CircleBadge>

      {/* ── Title area ── */}
      <TitleArea>

        {/* Name label aligned with title */}
        <NameLabel ref={nameLabelRef}>Rizvi Ahmed Abbas</NameLabel>

        <div ref={line1ParallaxRef}>
          <TitleLine ref={line1Ref}>
            <TitleOutlined>I&nbsp;Build</TitleOutlined>
          </TitleLine>
        </div>

        <SubRow ref={subRowRef}>
          <SubDesc>
            Full Stack apps, AI/RAG pipelines &amp; automation workflows
            that deliver real, measurable results. Based in Mumbai.
          </SubDesc>
          <FloatingTags>
            {tags.map((t, i) => (
              <Tag key={t} ref={(el) => (tagsRef.current[i] = el)}>{t}</Tag>
            ))}
          </FloatingTags>
        </SubRow>

        {/* CRAFT & animated short word */}
        <div ref={line2ParallaxRef}>
          <TitleLine ref={line2Ref}>
            <TitleFilled>
              Craft&nbsp;&amp;&nbsp;<WordInner ref={wordInnerRef}>{WORDS[wordIdx]}</WordInner>
            </TitleFilled>
          </TitleLine>
        </div>

        <div ref={line3ParallaxRef}>
          <TitleLine ref={line3Ref}>
            <TitleOutlined>Products</TitleOutlined>
          </TitleLine>
        </div>

      </TitleArea>

      {/* Bottom strip */}
      <BottomStrip ref={bottomRef}>
        <BottomItem>Mumbai, India · <span>2026</span></BottomItem>
        <BottomItem>Full Stack · AI / ML · Automation</BottomItem>
        <BottomItem><span>2+</span> Yrs Exp.</BottomItem>
        <ScrollCue onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior:"smooth" })}>
          <span className="arrow">↓</span>
          Scroll
        </ScrollCue>
      </BottomStrip>
    </Section>
  );
};

export default Hero;
