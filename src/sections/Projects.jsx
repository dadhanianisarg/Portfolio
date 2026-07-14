import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight, Code } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const Projects = () => {
  const [selectedProjId, setSelectedProjId] = useState(null);
  
  const handleOpenCaseStudy = (id) => {
    setSelectedProjId(id);
  };

  const handleCloseCaseStudy = () => {
    setSelectedProjId(null);
  };

  const projectSelected = portfolioData.projects.find(p => p.id === selectedProjId);

  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6 relative">
      {/* Background soft glow */}
      <div className="absolute top-[20%] left-[60%] w-[35vw] h-[35vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <div className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">portfolio.nodes: Loaded</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">Featured Systems</h2>
        </div>
        <p className="text-sm text-gray-400 max-w-xs md:text-right">
          Architecting solutions leveraging generative AI, real-time message sync, and automated cloud infrastructure.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, idx) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ 
                scale: 1.018,
                transition: { duration: 0.25 }
              }}
              className="premium-card rounded-2xl overflow-hidden flex flex-col justify-between p-6"
            >
              <div className="space-y-4">
                {/* Clean Top Header Row (Replaces Photos) */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-950/20 border border-purple-900/30 rounded-xl text-purple-400">
                      <Code className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Action Repository Links */}
                  <div className="flex gap-2">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Header Info */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-[10px] text-purple-400 font-mono">
                    {project.subtitle}
                  </p>
                </div>

                {/* Project Summary Description */}
                <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-4">
                  {project.description}
                </p>
              </div>

              {/* Tech Badges & Case Study button */}
              <div className="space-y-4 pt-4 border-t border-white/5 mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleOpenCaseStudy(project.id)}
                  className="w-full flex items-center justify-center gap-1 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 hover:border-purple-500/30 rounded-lg hover:bg-purple-950/10 cursor-pointer transition-all duration-300"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      {projectSelected && (
        <ProjectModal 
          project={projectSelected} 
          onClose={handleCloseCaseStudy} 
        />
      )}
    </section>
  );
};
