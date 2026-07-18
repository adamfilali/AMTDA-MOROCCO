import { useEffect, useRef } from 'react';

export default function BackgroundUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters to float: Arabic and Latin alphabets, and some numbers
    const chars = [
      'أ', 'ب', 'ت', 'ج', 'د', 'ر', 'س', 'ع', 'م', 'ن', 'ي', 'و',
      'A', 'B', 'D', 'E', 'H', 'M', 'R', 'S', 'X', 'Y', 'Z',
      '3', '5', '7', '9', 'α', 'β', 'γ', 'Δ', 'Ω', '?'
    ];

    interface LetterParticle {
      x: number;
      y: number;
      char: string;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      rotSpeed: number;
      angle: number;
    }

    interface MouseStar {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedX: number;
      speedY: number;
    }

    const particles: LetterParticle[] = [];
    const maxParticles = 60;

    for (let i = 0; i < maxParticles; i++) {
      const colors = ['#0B722C', '#92C83E', '#F58220', '#133C8B'];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: chars[Math.floor(Math.random() * chars.length)],
        size: Math.random() * 18 + 11,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.22 + 0.08,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        angle: Math.random() * Math.PI * 2
      });
    }

    const mouseTrail: MouseStar[] = [];
    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Add a couple of glowing green stars on move
      if (Math.random() < 0.6) {
        mouseTrail.push({
          x: mouseX,
          y: mouseY,
          size: Math.random() * 6 + 4,
          opacity: 0.8,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5 // float upward slightly
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Helper to draw a star
    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, alpha: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.moveTo(0, 0 - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.rotate(Math.PI / spikes);
        ctx.lineTo(0, 0 - innerRadius);
        ctx.rotate(Math.PI / spikes);
        ctx.lineTo(0, 0 - outerRadius);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(146, 200, 62, ${alpha})`; // Moroccan brand light green
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw floating translucent letters & characters using AMTDA brand colors
      const brandColors = ['#0B722C', '#92C83E', '#F58220', '#133C8B'];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.rotSpeed;

        // Wrap around edges
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Deterministic color assignment based on particle character index
        const colorHex = brandColors[p.char.charCodeAt(0) % brandColors.length];
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Convert hex to rgba
        const r = parseInt(colorHex.slice(1, 3), 16);
        const g = parseInt(colorHex.slice(3, 5), 16);
        const b = parseInt(colorHex.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.font = `bold ${p.size}px "Nunito", "Quicksand", system-ui, sans-serif`;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      // 2. Draw mouse green star particles
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const star = mouseTrail[i];
        star.x += star.speedX;
        star.y += star.speedY;
        star.opacity -= 0.02;

        if (star.opacity <= 0) {
          mouseTrail.splice(i, 1);
        } else {
          drawStar(star.x, star.y, 5, star.size, star.size / 2.5, star.opacity);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-universe-canvas"
      className="fixed inset-0 pointer-events-none -z-10 bg-[#eaf4eb] transition-colors duration-500"
    />
  );
}
