import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

const MarqueeContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: max-content;
  margin: 2rem 0 4rem;
  border-top: 1px solid rgba(201, 168, 76, 0.1);
  border-bottom: 1px solid rgba(201, 168, 76, 0.1);
  padding: 1.5rem 0;

  @media (max-width: 768px) {
    height: 5rem;
    margin-bottom: 2.5rem;
  }
`;

const MarqueeContent = styled.div`
  white-space: nowrap;
  font-size: 5rem;
  font-weight: 700;
  font-style: italic;
  font-family: var(--font-display);
  color: transparent;
  -webkit-text-stroke: 1px rgba(201, 168, 76, 0.25);
  p {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
  }
  @media (max-width: 1080px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Separator = styled.span`
  display: inline-block;
  margin: 0 2rem;
  color: var(--accent-gold);
  -webkit-text-stroke: 0;
  font-style: normal;
  font-size: 1.2rem;
  opacity: 0.5;
`;

const Marquee = () => {
  const marqueeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ["-30% end", "end start"],
  });
  const xPositionInv = useTransform(scrollYProgress, [0, 1], ["-20%", "-5%"]);

  const items = [
    "Full Stack Developer",
    "AI / ML Engineer",
    "Automation Builder",
    "MERN Stack",
    "Cloud Architect",
    "Hackathon Winner",
  ];

  return (
    <MarqueeContainer>
      <MarqueeContent ref={marqueeRef}>
        <motion.div
          style={{ x: xPositionInv }}
          transition={{ type: "spring", damping: 15, mass: 0.27, stiffness: 55 }}
        >
          <p>
            {items.map((item, i) => (
              <span key={item}>
                {item}
                {i < items.length - 1 && <Separator>✦</Separator>}
              </span>
            ))}
            <Separator>✦</Separator>
            {items.map((item, i) => (
              <span key={`${item}-2`}>
                {item}
                {i < items.length - 1 && <Separator>✦</Separator>}
              </span>
            ))}
          </p>
        </motion.div>
      </MarqueeContent>
    </MarqueeContainer>
  );
};

export default Marquee;
