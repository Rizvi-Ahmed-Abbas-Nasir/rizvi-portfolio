import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trail = useRef([]);
  const params = { pointsNumber: 24, widthFactor: 0.28, spring: 0.35, friction: 0.48 };
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* Init trail */
    for (let i = 0; i < params.pointsNumber; i++) {
      trail.current.push({ x: pointer.current.x, y: pointer.current.y, dx: 0, dy: 0 });
    }

    /* Track mouse */
    const handleMouseMove = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;

      /* Move dot cursor */
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    /* Scale dot on hover over clickables */
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]') && dot) {
        dot.style.width = '20px';
        dot.style.height = '20px';
        dot.style.background = 'rgba(201,168,76,0.2)';
        dot.style.border = '1px solid rgba(201,168,76,0.8)';
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"]') && dot) {
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.background = '#c9a84c';
        dot.style.border = 'none';
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    /* Animation loop */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer.current : trail.current[pIdx - 1];
        p.dx += (prev.x - p.x) * params.spring;
        p.dy += (prev.y - p.y) * params.spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < trail.current.length - 1; i++) {
        const alpha = 1 - i / trail.current.length;
        const xc = 0.5 * (trail.current[i].x + trail.current[i + 1].x);
        const yc = 0.5 * (trail.current[i].y + trail.current[i + 1].y);

        ctx.beginPath();
        ctx.moveTo(trail.current[i - 1].x, trail.current[i - 1].y);
        ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);

        /* Gold gradient stroke */
        const r = Math.round(201 * alpha + 100 * (1 - alpha));
        const g = Math.round(168 * alpha + 80 * (1 - alpha));
        const b = Math.round(76 * alpha + 20 * (1 - alpha));
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.55})`;
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Gold dot cursor */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#c9a84c',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
          boxShadow: '0 0 10px rgba(201,168,76,0.6), 0 0 25px rgba(201,168,76,0.3)',
          willChange: 'transform',
          mixBlendMode: 'normal',
        }}
      />
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          cursor: 'none',
          zIndex: 99998,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;
