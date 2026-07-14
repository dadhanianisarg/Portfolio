import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWindow } from '../context/WindowContext';

const bootLogs = [
  "BIOS Version: ANTIGRAVITY-v2.607.14",
  "CPU: Intel Core i9-ProblemSolver @ 5.0GHz",
  "RAM: 914 MB (Consistent with Leetcode Solved Stats)",
  "DISK: SSD dadhanianisarg/Portfolio [SUCCESS]",
  "INIT: Loading Developer Kernel v1.0.0...",
  "FS: Mounting virtual dev FS at /home/nisarg...",
  "SYS: Initializing environment modules...",
  "SYS: Starting MERN service worker...",
  "SYS: Binding AWS credentials...",
  "SYS: Starting terminal shell engine...",
  "NET: Establishing connection to VIT networks... [OK]",
  "SEC: Loading Knight encryption keys... [ACTIVE]",
  "BOOT: Starting Portfolio Operating System..."
];

export const BootScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { playSound } = useWindow();

  useEffect(() => {
    // Play early low beep
    playSound('beep');

    // Display logs sequentially
    const logInterval = setInterval(() => {
      if (currentIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
        playSound('click');
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    return () => clearInterval(logInterval);
  }, [currentIndex]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            playSound('startup');
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#070b13] z-[99999] font-mono text-xs md:text-sm text-gray-300 p-6 flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-2 text-cyan-400">
        <div>ANTIGRAVITY OS v2.0 (Nisarg Workstation)</div>
        <div>JULY 2026</div>
      </div>

      {/* Boot Logs */}
      <div className="flex-1 my-4 overflow-y-auto font-mono space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="flex">
            <span className="text-purple-400 mr-2">[OK]</span>
            <span className={index === logs.length - 1 ? "text-white font-bold" : ""}>{log}</span>
          </div>
        ))}
        {progress < 100 && (
          <div className="flex items-center text-cyan-400 font-bold mt-2">
            <span className="terminal-cursor mr-2"></span> Loading system components...
          </div>
        )}
      </div>

      {/* Progress Bar & Skip Button */}
      <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-2/3 flex items-center gap-4">
          <div className="text-gray-400 min-w-12">BOOT: {progress}%</div>
          <div className="w-full bg-gray-900 h-3 rounded-full border border-gray-800 overflow-hidden relative">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-full"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>

        <button 
          onClick={() => {
            playSound('startup');
            onComplete();
          }}
          className="px-6 py-2 rounded-lg border border-purple-500/30 hover:border-purple-500/80 bg-purple-950/20 hover:bg-purple-950/40 text-purple-300 hover:text-white transition-all text-xs font-semibold cursor-pointer select-none"
        >
          SKIP BOOT SEQUENCE
        </button>
      </div>
    </div>
  );
};
