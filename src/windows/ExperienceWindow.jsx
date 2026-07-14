import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

export const ExperienceWindow = () => {
  const { playSound } = useWindow();

  return (
    <div className="h-full font-sans text-gray-300">
      <div className="max-w-2xl mx-auto space-y-8 relative pl-6 md:pl-8 before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-blue-500 before:to-cyan-500">
        
        {portfolioData.experience.map((exp, idx) => {
          // Color coding nodes based on company
          const nodeColor = idx === 0 
            ? 'bg-purple-500 ring-purple-500/30' 
            : idx === 1 
              ? 'bg-blue-500 ring-blue-500/30' 
              : 'bg-cyan-500 ring-cyan-500/30';

          return (
            <div 
              key={idx} 
              className="relative space-y-3 group"
              onClick={() => playSound('click')}
            >
              {/* Timeline Bullet Node */}
              <span className={`absolute -left-[27px] md:-left-[35px] top-1.5 w-4 h-4 rounded-full ring-4 ${nodeColor} z-10 transition-transform group-hover:scale-120`} />

              {/* Header Details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-4">
                <div>
                  <h3 className="text-sm md:text-base font-extrabold text-white group-hover:text-purple-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-xs font-bold text-gray-200 mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Main Description */}
              <p className="text-xs text-gray-400 leading-relaxed">
                {exp.description}
              </p>

              {/* Highlights Bullet List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1.5">
                {exp.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-[11px] text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Decorative Divider */}
              {idx !== portfolioData.experience.length - 1 && (
                <div className="h-px bg-white/5 pt-4" />
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};
