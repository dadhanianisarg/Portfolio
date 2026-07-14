import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Cpu, CheckCircle, Activity, LayoutGrid, Terminal } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

export const SkillsWindow = () => {
  const { playSound } = useWindow();
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Get list of unique categories
  const categories = ["ALL", ...new Set(portfolioData.skills.map(s => s.category))];

  const filteredSkills = activeCategory === "ALL" 
    ? portfolioData.skills 
    : portfolioData.skills.filter(s => s.category === activeCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Experienced':
        return 'bg-gradient-to-r from-purple-500 to-cyan-500';
      case 'Comfortable':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'Learning':
        default:
        return 'bg-gradient-to-r from-gray-600 to-gray-500';
    }
  };

  const getLevelTextColor = (level) => {
    switch (level) {
      case 'Experienced':
        return 'text-cyan-400 font-bold';
      case 'Comfortable':
        return 'text-blue-400';
      case 'Learning':
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-xs text-gray-300 space-y-4">
      {/* Top Header - System Diagnostics Header */}
      <div className="border border-white/5 bg-gray-900/40 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
          <div>
            <div className="text-white font-bold text-sm">SYSTEM_DIAGNOSTICS: RUNNING</div>
            <div className="text-[10px] text-gray-400">Memory usage: 9.51/10.0 CGPA | Threads: Active</div>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound('click');
                setActiveCategory(cat);
              }}
              className={`px-2 py-0.5 rounded cursor-pointer transition-all border text-[9px] ${
                activeCategory === cat 
                  ? 'bg-purple-600/35 border-purple-500 text-white' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Diagnostics */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[380px] pr-1">
        {filteredSkills.map((skill, index) => (
          <div 
            key={index}
            className="p-3 bg-gray-950/40 border border-white/5 hover:border-purple-500/20 hover:bg-purple-950/5 rounded-lg flex flex-col gap-2 transition-all"
          >
            {/* Skill Name & Level */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                {skill.name}
              </span>
              <span className={`text-[10px] uppercase font-bold ${getLevelTextColor(skill.level)}`}>
                {skill.level}
              </span>
            </div>

            {/* Simulated Progress bar */}
            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${getLevelColor(skill.level)}`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>

            {/* Diagnostic Meta info */}
            <div className="flex justify-between text-[8px] text-gray-500">
              <span>Category: {skill.category}</span>
              <span>Ref: 0x{index.toString(16).toUpperCase()}4A</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Type `skills` in terminal for tabular output.</span>
        </span>
        <span>Count: {filteredSkills.length} registers loaded</span>
      </div>
    </div>
  );
};
