import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useContextProvider } from "../utils/GlobleContextProvider";

/* ── Animations ── */
const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.6; }
  94% { opacity: 1; }
  97% { opacity: 0.8; }
  98% { opacity: 1; }
`;

const revealBar = keyframes`
  0%   { transform: scaleX(0); transform-origin: left; }
  45%  { transform: scaleX(1); transform-origin: left; }
  55%  { transform: scaleX(1); transform-origin: right; }
  100% { transform: scaleX(0); transform-origin: right; }
`;

const Container = styled.div`
  background-color: #050403;
  width: 100vw;
  height: 100dvh;
  position: fixed;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  /* Vignette */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, #050403 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

/* Top/bottom ruled lines */
const RuledTop = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;
  right: 3rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
`;

const RuledBottom = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  right: 3rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
`;

/* Corner ornaments */
const Corner = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-color: rgba(201,168,76,0.5);
  border-style: solid;
  opacity: 0;

  &.tl { top: 2.2rem; left: 2.2rem; border-width: 1px 0 0 1px; }
  &.tr { top: 2.2rem; right: 2.2rem; border-width: 1px 1px 0 0; }
  &.bl { bottom: 2.2rem; left: 2.2rem; border-width: 0 0 1px 1px; }
  &.br { bottom: 2.2rem; right: 2.2rem; border-width: 0 1px 1px 0; }
`;

const Inner = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
`;

const Stamp = styled.div`
  font-family: var(--font-mono, 'Courier Prime', monospace);
  font-size: 0.65rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.5);
  opacity: 0;
`;

const NameText = styled.h1`
  font-family: var(--font-display, 'Playfair Display', serif);
  font-size: clamp(3.5rem, 12vw, 9rem);
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.02em;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,76,0.7);
  opacity: 0;
  animation: ${flicker} 4s ease-in-out infinite;
`;

const GoldFill = styled.span`
  color: #c9a84c;
  -webkit-text-stroke: 0;
`;

const ProgressBar = styled.div`
  width: clamp(160px, 30vw, 300px);
  height: 1px;
  background: rgba(201,168,76,0.15);
  position: relative;
  overflow: hidden;

  .fill {
    position: absolute;
    inset: 0;
    background: var(--accent-gold, #c9a84c);
    transform: scaleX(0);
    transform-origin: left;
  }
`;

const SubText = styled.p`
  font-family: var(--font-mono, 'Courier Prime', monospace);
  font-size: 0.72rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.45);
  opacity: 0;
`;

const Counter = styled.div`
  position: absolute;
  bottom: 4.5rem;
  right: 4rem;
  font-family: var(--font-mono, 'Courier Prime', monospace);
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: rgba(201,168,76,0.35);
  z-index: 3;
`;

/* Slide-out panel */
const SlidePanel = styled.div`
  position: absolute;
  inset: 0;
  background: #c9a84c;
  z-index: 10;
  transform: scaleX(0);
  transform-origin: left;
`;

const Preloader = () => {
  const { setPreloader } = useContextProvider();
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const stampRef = useRef(null);
  const subRef = useRef(null);
  const fillRef = useRef(null);
  const counterRef = useRef(null);
  const panelRef = useRef(null);
  const cornersRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    /* Corners reveal */
    tl.to(cornersRef.current, {
      opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out",
    })
    /* Stamp appears */
    .to(stampRef.current, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "<0.2")
    /* Name slams in */
    .to(nameRef.current, {
      opacity: 1, duration: 0.7, ease: "power4.out",
    }, "<0.1")
    /* Progress bar fills */
    .to(fillRef.current, {
      scaleX: 1, duration: 1.2, ease: "power2.inOut",
    }, "<0.2")
    /* Counter counts up */
    .call(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 4;
        if (count >= 100) { count = 100; clearInterval(interval); }
        if (counterRef.current) counterRef.current.textContent = `${count}%`;
      }, 40);
    }, [], "<")
    /* Sub text */
    .to(subRef.current, {
      opacity: 1, duration: 0.4, ease: "power2.out",
    }, "<0.6")
    /* Hold */
    .to({}, { duration: 0.4 })
    /* Gold slide-wipe exit */
    .to(panelRef.current, {
      scaleX: 1, duration: 0.45, ease: "power4.inOut",
    })
    .call(() => setPreloader(false))
    /* Container flies up */
    .to(containerRef.current, {
      yPercent: -100, duration: 0.55, ease: "power4.inOut",
    }, "<0.05");

    /* Set initial states */
    gsap.set(stampRef.current, { y: 15 });

    return () => tl.kill();
  }, []);

  return (
    <Container ref={containerRef}>
      <RuledTop />
      <RuledBottom />
      {["tl","tr","bl","br"].map((cls, i) => (
        <Corner key={cls} className={cls} ref={(el) => (cornersRef.current[i] = el)} />
      ))}

      <Inner>
        <Stamp ref={stampRef}>Est. Mumbai · 2022</Stamp>
        <NameText ref={nameRef}>
          R<GoldFill>izvi</GoldFill>
        </NameText>
        <ProgressBar>
          <div className="fill" ref={fillRef} />
        </ProgressBar>
        <SubText ref={subRef}>Loading Portfolio ✦</SubText>
      </Inner>

      <Counter ref={counterRef}>0%</Counter>
      <SlidePanel ref={panelRef} />
    </Container>
  );
};

export default Preloader;
