import React, { useState } from 'react';
import { useWindow } from '../context/WindowContext';
import { Folder, FileText, ChevronRight, HardDrive, Cpu, Terminal, ArrowUp } from 'lucide-react';

export const ExplorerWindow = () => {
  const { openWindow, addNotification, playSound } = useWindow();
  const [currentDir, setCurrentDir] = useState('/home/nisarg');

  const items = [
    { name: 'Projects', type: 'directory', targetId: 'projects', desc: 'Active developer codebases' },
    { name: 'Achievements', type: 'directory', targetId: 'achievements', desc: 'Academic and CP credentials' },
    { name: 'Resume', type: 'directory', targetId: 'resume', desc: 'Professional resume document' },
    { name: 'Certificates', type: 'directory', targetId: 'achievements', desc: 'Internships and certifications' },
    { name: 'System Info', type: 'file', targetId: 'skills', desc: 'Local diagnostic parameters' },
    { name: 'Terminal Shell', type: 'file', targetId: 'terminal', desc: 'Developer interactive command shell' }
  ];

  const handleItemClick = (item) => {
    playSound('click');
    openWindow(item.targetId);
    addNotification(`Opening from Explorer`, `Launched ${item.name} (${item.targetId}) process.`, 'info');
  };

  return (
    <div className="h-full flex font-sans text-xs text-gray-300">
      {/* Left Sidebar - Linux explorer sidebar */}
      <div className="w-40 border-r border-white/5 pr-3 space-y-4 hidden sm:block shrink-0">
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 font-mono uppercase px-2">Devices</div>
          <button className="w-full flex items-center gap-1.5 px-2 py-1 bg-white/5 text-white rounded cursor-pointer text-left">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>Root HD (128G)</span>
          </button>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 font-mono uppercase px-2">Home Directory</div>
          <button className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-white/5 hover:text-white rounded cursor-pointer text-left">
            <Folder className="w-3.5 h-3.5 text-purple-400" />
            <span>/home/nisarg</span>
          </button>
        </div>
      </div>

      {/* Main File View */}
      <div className="flex-1 pl-0 sm:pl-4 flex flex-col space-y-3">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 bg-gray-900/50 px-2.5 py-1 rounded border border-white/5 flex-1 max-w-sm">
            <Folder className="w-3.5 h-3.5 text-purple-400" />
            <span>{currentDir}</span>
          </div>

          <div className="text-[9px] text-gray-500 font-mono">
            {items.length} items
          </div>
        </div>

        {/* Directory Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto max-h-[300px]">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleItemClick(item)}
              className="p-3 bg-gray-900/25 border border-white/5 hover:border-purple-500/20 hover:bg-purple-950/5 rounded-xl cursor-pointer flex flex-col items-center text-center gap-2 group transition-all"
            >
              {/* File / Folder Icon */}
              <div className="p-3 bg-gray-950/60 rounded-xl group-hover:bg-purple-900/10 transition-colors">
                {item.type === 'directory' ? (
                  <Folder className="w-7 h-7 text-purple-400 group-hover:text-purple-300" />
                ) : (
                  <FileText className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300" />
                )}
              </div>

              {/* Title & metadata */}
              <div>
                <h4 className="font-bold text-white text-[11px] group-hover:text-purple-300 transition-colors truncate w-24">
                  {item.name}
                </h4>
                <p className="text-[8px] text-gray-500 truncate w-24 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
