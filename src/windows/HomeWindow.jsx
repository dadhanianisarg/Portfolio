import React, { useState, useEffect } from 'react';
import { useWindow } from '../context/WindowContext';
import { Github, Linkedin, Code2, Mail, FileText, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const roles = [
  "Software Engineer",
  "AI Research Intern",
  "Backend Developer",
  "Full Stack Engineer"
];

export const HomeWindow = () => {
  const { openWindow, addNotification, playSound } = useWindow();
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect loop
  useEffect(() => {
    const activeRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText(activeRole.substring(0, charIndex - 1));
        setCharIndex((prevChar) => prevChar - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setRoleText(activeRole.substring(0, charIndex + 1));
        setCharIndex((prevChar) => prevChar + 1);
      }, 85);
    }

    if (!isDeleting && charIndex === activeRole.length) {
      // Pause at full text before deleting
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const handleDownloadClick = () => {
    playSound('success');
    addNotification("Resume Opened", "Redirecting to system resume viewer. You can print or download from there.", "success");
    openWindow('resume');
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 items-center justify-between font-sans">
      {/* Introduction Info */}
      <div className="flex-1 space-y-4 max-w-lg">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">system.status: Active</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">{portfolioData.personal.name}</span>
          </h1>
          <div className="h-7 flex items-center font-mono text-sm md:text-base text-gray-300">
            <span>&gt; </span>
            <span className="text-purple-400 font-bold ml-1.5">{roleText}</span>
            <span className="terminal-cursor w-2 h-4 bg-cyan-400 ml-1"></span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
          {portfolioData.personal.tagline}
        </p>

        {/* Dynamic Widget: "Currently working on" */}
        <div className="p-3 bg-purple-950/15 border border-purple-500/20 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] text-purple-300 font-bold uppercase tracking-wider font-mono">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span>
            Current Focus
          </div>
          <h4 className="text-xs font-bold text-gray-200">Samsung PRISM: Multimodal Search</h4>
          <p className="text-[10px] text-gray-400">Developing AI-driven semantic retrieval systems using high-dimensional vector embeddings and automated metadata schemas.</p>
        </div>

        {/* Buttons / CTA */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button 
            onClick={handleDownloadClick}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>
          
          <button 
            onClick={() => { playSound('click'); openWindow('terminal'); }}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-700 hover:border-cyan-500/40 bg-gray-900/40 hover:bg-cyan-950/10 text-gray-300 hover:text-cyan-400 rounded-lg text-xs font-semibold cursor-pointer transition-all"
          >
            Run Terminal
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Social Icons Bar */}
        <div className="flex gap-3 pt-3 border-t border-gray-900 w-full">
          <a 
            href={portfolioData.personal.github} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all hover:scale-110"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={portfolioData.personal.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={portfolioData.personal.leetcode} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all hover:scale-110"
            title="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a 
            href={`mailto:${portfolioData.personal.email}`}
            onClick={() => playSound('click')}
            className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all hover:scale-110"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Cybernetic Developer SVG Graphics */}
      <div className="flex-1 flex justify-center items-center max-w-sm w-full">
        <svg 
          viewBox="0 0 200 200" 
          className="w-40 h-40 md:w-56 md:h-56 filter drop-shadow-[0_0_15px_rgba(124,58,237,0.2)]"
        >
          {/* Animated concentric circles */}
          <circle cx="100" cy="100" r="85" fill="none" stroke="url(#circleGrad)" strokeWidth="0.75" strokeDasharray="5,15" className="animate-spin" style={{ animationDuration: '40s' }} />
          <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="30,10" className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="1.5" />
          
          {/* Central hexagon graphic representing server/data node */}
          <polygon 
            points="100,60 135,80 135,120 100,140 65,120 65,80" 
            fill="rgba(17, 24, 39, 0.6)" 
            stroke="url(#polyGrad)" 
            strokeWidth="2" 
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />

          {/* Core light node */}
          <circle cx="100" cy="100" r="10" fill="url(#coreGrad)" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="100" cy="100" r="6" fill="#06B6D4" />

          {/* Floating nodes connecting to center */}
          <g className="opacity-80">
            <line x1="100" y1="60" x2="100" y2="40" stroke="#3B82F6" strokeWidth="1.5" />
            <circle cx="100" cy="40" r="4" fill="#3B82F6" />
            
            <line x1="135" y1="120" x2="155" y2="135" stroke="#7C3AED" strokeWidth="1.5" />
            <circle cx="155" cy="135" r="4" fill="#7C3AED" />

            <line x1="65" y1="120" x2="45" y2="135" stroke="#06B6D4" strokeWidth="1.5" />
            <circle cx="45" cy="135" r="4" fill="#06B6D4" />
          </g>

          {/* Definitions */}
          <defs>
            <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
