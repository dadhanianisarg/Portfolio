import React, { useEffect, useRef } from 'react';
import { useWindow } from '../context/WindowContext';

const wallpapers = [
  // Gradient 1: Deep Tech Blue/Purple
  "from-[#0b0f19] via-[#090b11] to-[#12071f]",
  // Gradient 2: Cyberpunk Cyan/Indigo
  "from-[#0b0f19] via-[#04101e] to-[#0c051d]",
  // Gradient 3: Neon Matrix Green/Gray
  "from-[#080c14] via-[#071311] to-[#0d0714]",
  // Gradient 4: Fusion Purple/Crimson
  "from-[#0c0d16] via-[#10081d] to-[#1a0815]"
];

export const Wallpaper = () => {
  const { wallpaperIndex } = useWindow();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    // Number of particles based on screen width
    const particleCount = Math.min(65, Math.floor((width * height) / 25000));

    // Particle template
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.6 ? '#7C3AED' : (Math.random() > 0.5 ? '#06B6D4' : '#3B82F6'); // Purple, Cyan, Blue
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Boundary checks
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles close to each other (subtle network graph representation)
    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full -z-50 bg-gradient-to-br ${wallpapers[wallpaperIndex]} transition-all duration-[4000ms] ease-in-out`}>
      {/* Interactive AI / Vector network representation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none opacity-50" />
      
      {/* Tech Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[15%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[50%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
    </div>
  );
};
