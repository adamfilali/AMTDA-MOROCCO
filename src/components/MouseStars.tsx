import React, { useEffect } from 'react';

export default function MouseStars() {
  useEffect(() => {
    // Throttle spawning to prevent overhead
    let lastSpawn = 0;
    const spawnDelay = 45; // ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawn < spawnDelay) return;
      lastSpawn = now;

      // Create a green star element
      const star = document.createElement('div');
      
      // Star SVG structure
      star.innerHTML = `
        <svg viewBox="0 0 24 24" style="width: 100%; height: 100%; fill: rgba(16, 185, 129, 0.55); filter: drop-shadow(0 0 2px rgba(162, 209, 21, 0.4));">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      `;

      // Base absolute styling
      star.style.position = 'fixed';
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;
      star.style.transform = 'translate(-50%, -50%)';
      star.style.pointerEvents = 'none';
      star.style.zIndex = '99999';

      // Random size range (10px to 22px)
      const size = Math.random() * 12 + 10;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Animation parameters
      const angle = Math.random() * 360;
      const speedX = (Math.random() - 0.5) * 1.8;
      const speedY = (Math.random() - 0.5) * 1.8 - 1.2; // Upwards drift
      
      let opacity = 0.85;
      let scale = 1.0;
      let posX = e.clientX;
      let posY = e.clientY;
      let rot = angle;

      document.body.appendChild(star);

      // Perform animation frames
      const animate = () => {
        opacity -= 0.02;
        scale -= 0.015;
        posX += speedX;
        posY += speedY;
        rot += 2.5;

        if (opacity <= 0 || scale <= 0) {
          star.remove();
        } else {
          star.style.left = `${posX}px`;
          star.style.top = `${posY}px`;
          star.style.opacity = `${opacity}`;
          star.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`;
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
