import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { BookOpen, Target, Sparkles, Brain, Cpu, Database, Server, GitMerge } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

const interestIcons = {
  "AI & Research": <Brain className="w-5 h-5 text-cyan-400" />,
  "Backend Architecture": <Server className="w-5 h-5 text-purple-400" />,
  "Distributed Systems": <GitMerge className="w-5 h-5 text-blue-400" />,
  "DevOps & Automation": <Cpu className="w-5 h-5 text-emerald-400" />,
  "System Design": <Database className="w-5 h-5 text-amber-400" />
};

const interests = [
  { name: "AI & Research", desc: "Multimodal search, vector databases, high-dimensional indexing, LLM processing." },
  { name: "Backend Architecture", desc: "Scalable REST APIs, database query optimization, rate limiters, security." },
  { name: "Distributed Systems", desc: "Data replication, synchronization, messaging systems, cache design." },
  { name: "DevOps & Automation", desc: "Dockerized pipelines, container orchestration with K8s, CI/CD with GitOps." },
  { name: "System Design", desc: "High-availability architectures, caching strategies, microservices." }
];

export const AboutWindow = () => {
  const { playSound } = useWindow();

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 font-sans text-gray-300">
      {/* Left Column - The Story & Education */}
      <div className="flex-1 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-mono">
            <Sparkles className="w-4 h-4" />
            <span>developer.identity: Nisarg</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">The Story So Far</h2>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            {portfolioData.personal.bio}
          </p>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            I believe that code is only a tool to build solutions. What matters is systemic efficiency, code maintainability, and building architectures that solve real-world problems. Whether doing high-end research at <strong className="text-gray-200">Samsung PRISM</strong>, writing cloud deployments, or grinding DSA problems, I focus on optimal resource utilisation.
          </p>
        </div>

        {/* Education Timeline Block */}
        <div className="p-4 bg-gray-900/40 border border-white/5 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-200 font-mono">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>EDUCATION</span>
          </div>
          <div className="border-l-2 border-purple-500/30 pl-4 space-y-1.5 ml-2 relative">
            <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#c084fc]" />
            <h4 className="text-xs md:text-sm font-bold text-white">{portfolioData.personal.education.institution}</h4>
            <p className="text-xs text-gray-300">{portfolioData.personal.education.degree}</p>
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono mt-1">
              <span>{portfolioData.personal.education.period}</span>
              <span className="text-cyan-400 font-semibold bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-800/30">
                CGPA: {portfolioData.personal.education.cgpa}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Interests & Core Ideals */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
          <Target className="w-4 h-4" />
          <span>kernel.interests: Active</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Areas of Focus</h2>

        <div className="grid grid-cols-1 gap-3">
          {interests.map((interest, idx) => (
            <div 
              key={idx} 
              onClick={() => playSound('click')}
              className="p-3 bg-gray-900/30 border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-950/5 rounded-xl flex gap-3.5 items-start cursor-pointer transition-all hover:translate-x-1"
            >
              <div className="p-1.5 rounded-lg bg-gray-800/80 shrink-0">
                {interestIcons[interest.name]}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-gray-100">{interest.name}</h4>
                <p className="text-[10px] text-gray-400 leading-normal">{interest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
