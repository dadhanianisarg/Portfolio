import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Github, ExternalLink, ArrowLeft, Terminal, Layout, Cpu, RefreshCw, Zap } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

export const ProjectsWindow = () => {
  const { playSound } = useWindow();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject = portfolioData.projects.find(p => p.id === selectedProjectId);

  const handleBack = () => {
    playSound('click');
    setSelectedProjectId(null);
  };

  const handleSelect = (id) => {
    playSound('click');
    setSelectedProjectId(id);
  };

  // Rendering the list of projects
  if (!selectedProject) {
    return (
      <div className="h-full flex flex-col font-sans text-gray-300">
        <div className="mb-4">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">root/projects: Displaying all nodes</span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">Core Engineered Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className="group p-4 bg-gray-900/30 hover:bg-purple-950/10 border border-white/5 hover:border-purple-500/30 rounded-xl cursor-pointer flex flex-col justify-between transition-all hover:-translate-y-1 shadow-md hover:shadow-purple-500/5"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-gray-800/80 group-hover:bg-purple-900/20 transition-all text-purple-400 group-hover:text-purple-300">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2 opacity-65 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => { e.stopPropagation(); playSound('click'); }}
                      className="p-1 hover:text-white rounded"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => { e.stopPropagation(); playSound('click'); }}
                        className="p-1 hover:text-white rounded"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-[11px] text-gray-400 line-clamp-3 leading-normal">
                  {project.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5 mt-4">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[9px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-1.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-900 px-1 py-0.5 rounded">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="text-[10px] font-mono font-bold text-purple-400 flex items-center gap-1 group-hover:text-purple-300">
                  <span>View System Architecture</span>
                  <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Rendering the details of the selected project
  return (
    <div className="h-full flex flex-col font-sans text-gray-300 space-y-6">
      {/* Header back bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center gap-2">
          <a 
            href={selectedProject.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => playSound('click')}
            className="flex items-center gap-1 px-3 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg text-[10px] border border-gray-800 transition-all font-mono"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
          {selectedProject.demo && (
            <a 
              href={selectedProject.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSound('click')}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-[10px] transition-all font-mono"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>

      {/* Main split details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Context, Features, Lessons (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white">{selectedProject.title}</h1>
            <p className="text-xs font-mono text-cyan-400">{selectedProject.subtitle}</p>
            <p className="text-xs text-gray-400 leading-relaxed mt-2">{selectedProject.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider font-mono">Key Features</h3>
            <ul className="space-y-1.5 text-xs text-gray-400 pl-4 list-disc marker:text-cyan-400">
              {selectedProject.features.map((feature, fIdx) => (
                <li key={fIdx}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Contribution */}
          <div className="p-3 bg-gray-900/40 border border-white/5 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-300 font-mono uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>Core Contribution</span>
            </div>
            <p className="text-xs text-gray-400 leading-normal">{selectedProject.contribution}</p>
          </div>

          {/* Lessons Learned */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider font-mono">Engineering Lessons</h3>
            <p className="text-xs text-gray-400 leading-normal">{selectedProject.lessonsLearned}</p>
          </div>

          {/* Tech stack badges */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <h3 className="text-[10px] font-bold text-gray-300 font-mono uppercase">Technologies Stacked</h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.techStack.map((tech, tIdx) => (
                <span 
                  key={tIdx} 
                  className="text-[10px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architecture & roadmap (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Architecture Diagram */}
          <div className="p-4 bg-gray-900/35 border border-white/5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-200 font-mono">
                <Layout className="w-4 h-4 text-cyan-400" />
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <RefreshCw className="w-3 h-3 text-gray-500 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            {/* Interactive SVG Diagram representing pipelines */}
            <div className="border border-white/5 bg-gray-950/60 rounded-lg p-2 flex justify-center items-center overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-auto max-h-[220px]">
                {/* Defs for animations & glow */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#7C3AED" />
                  </marker>
                  <linearGradient id="glowLine" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>

                {/* Connection lines */}
                {selectedProject.architecture.connections.map((conn, cIdx) => {
                  const fromNode = selectedProject.architecture.nodes.find(n => n.id === conn.from);
                  const toNode = selectedProject.architecture.nodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <g key={cIdx}>
                      <line 
                        x1={fromNode.x} 
                        y1={fromNode.y} 
                        x2={toNode.x} 
                        y2={toNode.y} 
                        stroke="url(#glowLine)" 
                        strokeWidth="1.2" 
                        strokeDasharray="4,4"
                        className="animate-[dash_2s_linear_infinite]"
                      />
                      {/* Interactive labels */}
                      <text 
                        x={(fromNode.x + toNode.x) / 2} 
                        y={(fromNode.y + toNode.y) / 2 - 2} 
                        fill="rgba(6, 182, 212, 0.75)" 
                        fontSize="3" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {conn.label}
                      </text>
                    </g>
                  );
                })}

                {/* Node Points */}
                {selectedProject.architecture.nodes.map((node) => (
                  <g key={node.id}>
                    <rect 
                      x={node.x - 12} 
                      y={node.y - 7} 
                      width="24" 
                      height="14" 
                      rx="3" 
                      fill="#111827" 
                      stroke="#7C3AED" 
                      strokeWidth="1"
                    />
                    <text 
                      x={node.x} 
                      y={node.y + 1} 
                      fill="#ffffff" 
                      fontSize="3.5" 
                      fontWeight="bold"
                      fontFamily="sans-serif" 
                      textAnchor="middle"
                    >
                      {node.label.split(' ')[0]}
                    </text>
                    <circle cx={node.x} cy={node.y - 4} r="1" fill="#06B6D4" className="animate-ping" style={{ animationDuration: '3s' }} />
                  </g>
                ))}
              </svg>
            </div>

            {/* Micro details of architecture */}
            <div className="space-y-1.5">
              {selectedProject.architecture.nodes.map((node, nIdx) => (
                <div key={nIdx} className="text-[10px] text-gray-400">
                  <strong className="text-gray-200">{node.label}</strong>: {node.desc}
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider font-mono">Future Enhancements</h3>
            <ul className="space-y-1.5 text-xs text-gray-400 pl-4 list-decimal marker:text-purple-400">
              {selectedProject.futureImprovements.map((improvement, iIdx) => (
                <li key={iIdx}>{improvement}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
