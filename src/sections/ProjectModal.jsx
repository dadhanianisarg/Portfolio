import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Info, Layers } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  
  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const challenges = project.challenges || {
    problem: "Aligning frontend components with asynchronous distributed database endpoints securely.",
    resolution: "Implemented secure state caching and optimized queries to guarantee sub-second rendering times."
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Background overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-[#111827] border border-white/5 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10 text-gray-300 font-sans"
      >
        
        {/* Header Block: Clean Title Banner (No Photos) */}
        <div className="relative shrink-0 p-8 border-b border-white/5 bg-[#161f30]/30">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded-full cursor-pointer transition-all hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title & Metadata */}
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{project.title}</h1>
            <p className="text-xs md:text-sm text-gray-400 font-sans font-medium">{project.subtitle}</p>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Top Actions Link panel */}
          <div className="flex flex-wrap gap-2.5 pb-4 border-b border-white/5">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold border border-white/10 transition-all font-sans"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-purple-500/10 transition-all font-sans"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Application</span>
              </a>
            )}
          </div>

          {/* Split info grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Summary, Features, challenges (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Overview */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-purple-400" />
                  <span>Overview</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Core Features */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Key Features & Specifications</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-400 pl-4 list-disc marker:text-cyan-400 font-sans">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Engineering Challenge & Solution */}
              <div className="p-4 bg-purple-950/10 border border-purple-500/15 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                  Challenge & Resolution
                </h3>
                <div className="space-y-2 text-xs font-sans">
                  <p className="text-gray-400"><strong className="text-gray-200">The Problem:</strong> {challenges.problem}</p>
                  <p className="text-gray-400"><strong className="text-gray-200">The Solution:</strong> {challenges.resolution}</p>
                </div>
              </div>

              {/* Scope Contribution */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">My Contribution</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {project.contribution}
                </p>
              </div>
            </div>

            {/* Right Column - System Architecture Registry & Tech (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* System Architecture Layout (Clean Text Grid replacing dotted SVG) */}
              <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Architecture Specifications</span>
                </h3>

                {/* Structured text list of nodes */}
                <div className="space-y-3.5 divide-y divide-white/5">
                  {project.architecture.nodes.map((node) => (
                    <div key={node.id} className="pt-3 first:pt-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span>
                        <h4 className="text-xs font-bold text-white font-mono">{node.label}</h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed pl-3.5">{node.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-mono text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Future roadmap */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Future Enhancements</h3>
                <ul className="space-y-1.5 text-xs text-gray-400 pl-4 list-decimal marker:text-purple-400 font-sans">
                  {project.futureImprovements.map((imp, impIdx) => (
                    <li key={impIdx}>{imp}</li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};
