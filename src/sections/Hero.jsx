import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { printResume } from '../utils/printResume';

export const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 flex flex-col justify-center items-center overflow-hidden px-6">
      
      {/* Ambient background glows */}
      <div className="absolute top-[15%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/5 blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center space-y-8 z-10"
      >
        {/* Active Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-sans shadow-sm"
        >
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          <span>AI Research Intern @ Samsung PRISM</span>
        </motion.div>

        {/* Hero Title */}
        <div className="space-y-4">
          <motion.h4 
            variants={itemVariants}
            className="text-xs md:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-mono uppercase tracking-widest"
          >
            Hi, I'm Nisarg Dadhania
          </motion.h4>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-sans"
          >
            Engineering scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-glow-accent">
              backends & AI engines
            </span>
          </motion.h1>
        </div>

        {/* Subtitle / Tagline */}
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-400 font-sans leading-relaxed"
        >
          Computer Science student at VIT focused on high-throughput backend APIs, distributed system architectures, GitOps pipeline automation, and high-performance algorithms.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <a 
            href="#projects" 
            onClick={handleScrollToProjects}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-103 active:scale-97 shadow-lg shadow-purple-500/10 cursor-pointer"
          >
            <span>View Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-white rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-103 active:scale-97 cursor-pointer"
          >
            <span>Resume</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-white/5"
        >
          {/* Stat 1 */}
          <div className="text-center p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">9.51</div>
            <div className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5 uppercase tracking-wider">VIT CGPA</div>
          </div>
          {/* Stat 2 */}
          <div className="text-center p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">900+</div>
            <div className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5 uppercase tracking-wider">DSA Solved</div>
          </div>
          {/* Stat 3 */}
          <div className="text-center p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 tracking-tight">1837</div>
            <div className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5 uppercase tracking-wider">Peak Rating</div>
          </div>
          {/* Stat 4 */}
          <div className="text-center p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight">3</div>
            <div className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5 uppercase tracking-wider">Internships</div>
          </div>
        </motion.div>

        {/* Companies Strip */}
        <motion.div 
          variants={itemVariants}
          className="pt-10 space-y-3.5"
        >
          <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Trusted by industry giants</div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-35 hover:opacity-70 transition-opacity duration-300">
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-wider font-mono">SAMSUNG PRISM</span>
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-wider font-mono">CIPHERNUTZ</span>
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-wider font-mono">ORAIL SERVICES</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
