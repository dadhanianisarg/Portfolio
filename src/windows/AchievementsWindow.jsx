import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, Cpu, Code2, Briefcase, Trophy, Sparkles } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

const iconMap = {
  Award,
  Cpu,
  Code2,
  Briefcase
};

export const AchievementsWindow = () => {
  const { playSound } = useWindow();

  return (
    <div className="h-full flex flex-col font-sans text-gray-300 space-y-4">
      <div>
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">system/credentials: Loaded successfully</span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-1">Honours & Certifications</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[380px] pr-1">
        {portfolioData.achievements.map((item) => {
          const Icon = iconMap[item.icon] || Trophy;

          return (
            <div 
              key={item.id}
              onClick={() => playSound('click')}
              className="p-4 bg-gray-900/30 border border-white/5 hover:border-purple-500/20 hover:bg-purple-950/5 rounded-xl flex gap-4 transition-all hover:-translate-y-0.5"
            >
              {/* Achievement Badge */}
              <div className="p-3 bg-gray-950/60 rounded-xl text-purple-400 border border-white/5 hover:text-purple-300 transition-colors shrink-0 flex items-center justify-center h-12 w-12">
                <Icon className="w-6 h-6" />
              </div>

              {/* Achievement Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white">{item.title}</h3>
                  <Sparkles className="w-3 h-3 text-cyan-400 opacity-60" />
                </div>
                <p className="text-[10px] font-mono text-cyan-400">{item.subtitle}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
