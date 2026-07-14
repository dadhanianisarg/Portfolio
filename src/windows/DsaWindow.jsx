import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { BarChart3, Award, Flame, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

export const DsaWindow = () => {
  const { playSound } = useWindow();
  
  // Animated counters state
  const [solved, setSolved] = useState(0);
  const [leetcode, setLeetcode] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Increment counters smoothly
    const duration = 1200; // ms
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      setSolved(Math.floor((portfolioData.dsa.solvedCount / steps) * currentStep));
      setLeetcode(Math.floor((portfolioData.dsa.leetcodeCount / steps) * currentStep));
      setRating(Math.floor((portfolioData.dsa.peakRating / steps) * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setSolved(portfolioData.dsa.solvedCount);
        setLeetcode(portfolioData.dsa.leetcodeCount);
        setRating(portfolioData.dsa.peakRating);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Generate a mock contribution grid for competitive programming heatmap
  // 5 rows (days of week) and 24 columns (weeks)
  const rows = 5;
  const cols = 22;
  const generateHeatmapGrid = () => {
    const grid = [];
    const intensities = [
      'bg-gray-900', 
      'bg-emerald-950/40 border border-emerald-900/10', 
      'bg-emerald-800/40 border border-emerald-700/20', 
      'bg-emerald-500/50 border border-emerald-400/20', 
      'bg-emerald-400/80 shadow-[0_0_4px_rgba(52,211,153,0.3)]'
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Higher density in middle rows/columns to look natural
        const randomFactor = Math.random();
        let intensityIndex = 0;
        if (randomFactor > 0.85) intensityIndex = 4;
        else if (randomFactor > 0.6) intensityIndex = 3;
        else if (randomFactor > 0.4) intensityIndex = 2;
        else if (randomFactor > 0.15) intensityIndex = 1;
        
        grid.push({
          row: r,
          col: c,
          intensityClass: intensities[intensityIndex]
        });
      }
    }
    return grid;
  };

  const heatmapGrid = generateHeatmapGrid();

  return (
    <div className="h-full flex flex-col font-sans text-gray-300 space-y-4">
      {/* Top Banner stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="p-3 bg-gray-900/30 border border-white/5 rounded-xl space-y-1 relative overflow-hidden group">
          <div className="absolute right-2.5 top-2.5 opacity-10 text-emerald-400 group-hover:opacity-20 transition-opacity">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">Total Problems</div>
          <div className="text-xl md:text-2xl font-black text-white flex items-baseline">
            <span>{solved}</span>
            <span className="text-emerald-400 text-xs ml-0.5">+</span>
          </div>
          <p className="text-[9px] text-gray-500">Cross-Platform solved</p>
        </div>

        {/* Metric 2 */}
        <div className="p-3 bg-gray-900/30 border border-white/5 rounded-xl space-y-1 relative overflow-hidden group">
          <div className="absolute right-2.5 top-2.5 opacity-10 text-cyan-400 group-hover:opacity-20 transition-opacity">
            <Zap className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">Leetcode Solved</div>
          <div className="text-xl md:text-2xl font-black text-white flex items-baseline">
            <span>{leetcode}</span>
            <span className="text-cyan-400 text-xs ml-0.5">/ 3200+</span>
          </div>
          <p className="text-[9px] text-gray-500">Medium & Hard heavy</p>
        </div>

        {/* Metric 3 */}
        <div className="p-3 bg-gray-900/30 border border-white/5 rounded-xl space-y-1 relative overflow-hidden group">
          <div className="absolute right-2.5 top-2.5 opacity-10 text-purple-400 group-hover:opacity-20 transition-opacity">
            <Flame className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">Peak Contest Rating</div>
          <div className="text-xl md:text-2xl font-black text-purple-400 text-glow-purple flex items-baseline">
            <span>{rating}</span>
          </div>
          <p className="text-[9px] text-gray-500">Knight Status active</p>
        </div>

        {/* Metric 4 */}
        <div className="p-3 bg-gray-900/30 border border-white/5 rounded-xl space-y-1 relative overflow-hidden group">
          <div className="absolute right-2.5 top-2.5 opacity-10 text-amber-400 group-hover:opacity-20 transition-opacity">
            <Award className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">Contest Ranking</div>
          <div className="text-xl md:text-2xl font-black text-white">
            {portfolioData.dsa.contestRank}
          </div>
          <p className="text-[9px] text-gray-500">Top 4.2% globally</p>
        </div>
      </div>

      {/* Split section: Platforms info and Consistency Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Platforms table (5 cols) */}
        <div className="lg:col-span-5 p-3.5 bg-gray-900/30 border border-white/5 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-200 font-mono">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>PLATFORMS AND BADGES</span>
            </div>
          </div>

          <div className="space-y-2">
            {portfolioData.dsa.platforms.map((plat, idx) => (
              <div 
                key={idx}
                onClick={() => playSound('click')}
                className="p-2.5 bg-gray-950/40 border border-white/5 rounded-lg flex justify-between items-center hover:border-cyan-500/10 cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-bold text-gray-200">{plat.name}</h4>
                  <p className="text-[9px] text-gray-400 font-mono">Solved: {plat.solved}</p>
                </div>
                <div className="text-[10px] font-mono font-semibold text-cyan-400">
                  {plat.rating}
                </div>
              </div>
            ))}
          </div>

          <a 
            href={portfolioData.dsa.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="w-full flex items-center justify-center gap-1.5 p-2 bg-purple-950/15 border border-purple-800/30 text-purple-300 hover:text-white rounded-lg text-xs font-semibold font-mono transition-all hover:bg-purple-900/10"
          >
            <span>Link to Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Consistency Grid (7 cols) */}
        <div className="lg:col-span-7 p-3.5 bg-gray-900/30 border border-white/5 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-200 font-mono">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>CONSISTENCY HEATMAP</span>
            </div>
            <span className="text-[9px] text-gray-400 font-normal">Grid: last 110 days active</span>
          </div>

          {/* Consistency Heatmap Grid */}
          <div className="flex flex-col items-center justify-center p-2.5 border border-white/5 bg-gray-950/40 rounded-lg">
            <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`, gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {heatmapGrid.map((cell, idx) => (
                <div 
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-sm transition-colors duration-300 ${cell.intensityClass}`}
                  title={`Value at cell: (r:${cell.row}, c:${cell.col})`}
                />
              ))}
            </div>
            
            {/* Heatmap Legend */}
            <div className="w-full flex justify-between items-center text-[8px] text-gray-500 mt-3 px-1 font-mono">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-sm bg-gray-900" />
                <span className="w-2 h-2 rounded-sm bg-emerald-950/40" />
                <span className="w-2 h-2 rounded-sm bg-emerald-800/40" />
                <span className="w-2 h-2 rounded-sm bg-emerald-500/50" />
                <span className="w-2 h-2 rounded-sm bg-emerald-400/80" />
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 font-mono leading-relaxed bg-gray-950/30 p-2.5 rounded border border-white/5">
            <strong>System Insight:</strong> Algorithms pipeline initialized with high compiler optimizations (`g++ -O3 -std=c++20`). Consistency represents hours of debugging memory registers, optimizing loops, and solving graph architectures.
          </div>
        </div>
      </div>
    </div>
  );
};
