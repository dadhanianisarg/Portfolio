import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Custom technical tags to append based on company
const companyTechTags = {
  "Samsung PRISM": ["Python", "Transformers", "Vector DB", "Metadata Parsing"],
  "Ciphernutz": ["Node.js", "Express", "MongoDB", "AWS EC2/S3"],
  "Orail Services": ["React.js", "Tailwind CSS", "JavaScript", "ERP Systems"]
};

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="py-24 max-w-5xl mx-auto px-6 relative">
      {/* Section Header */}
      <div className="mb-14 text-center">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-mono">timeline.career: Active</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">Professional Journey</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">Internships and industrial contributions, structured around product impact.</p>
      </div>

      {/* Experience List */}
      <div className="space-y-6 relative max-w-3xl mx-auto pl-6 before:absolute before:top-2 before:bottom-2 before:left-[10px] before:w-px before:bg-white/10">
        
        {portfolioData.experience.map((exp, idx) => {
          const isExpanded = expandedIndex === idx;
          const techTags = companyTechTags[exp.company] || [];

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[20px] top-3.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/10 group-hover:bg-purple-500 group-hover:ring-purple-500/25 transition-all" />

              {/* Experience Card */}
              <div className="p-6 bg-[#111827] border border-white/5 hover:border-purple-500/15 rounded-2xl shadow-lg transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium font-sans">
                      {exp.role}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {techTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Main highlights grid (replaces long paragraphs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-300 leading-normal">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Read More Accordion */}
                <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-col items-center">
                  <button 
                    onClick={() => toggleExpand(idx)}
                    className="flex items-center gap-1 text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase font-mono cursor-pointer"
                  >
                    <span>{isExpanded ? "Show Less" : "Read Full Scope"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3 w-full"
                      >
                        <p className="text-xs text-gray-400 leading-relaxed bg-[#0b1120]/45 p-4 rounded-xl border border-white/5">
                          {exp.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};
