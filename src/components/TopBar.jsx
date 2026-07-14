import React, { useState, useEffect } from 'react';
import { useWindow } from '../context/WindowContext';
import { 
  Wifi, 
  Battery, 
  Github, 
  Linkedin, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Terminal as TerminalIcon,
  Circle,
  HelpCircle
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const TopBar = () => {
  const { 
    isMuted, 
    setIsMuted, 
    retroTheme, 
    setRetroTheme, 
    openWindow, 
    addNotification, 
    playSound 
  } = useWindow();
  
  const [time, setTime] = useState(new Date());
  const [wifiSignal, setWifiSignal] = useState('CONNECTED');
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Simulate battery decay and fluctuating wifi for realism!
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => (prev > 10 ? prev - 1 : 100));
    }, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(batteryTimer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // If we're unmuting, play a confirmation sound immediately
    if (isMuted) {
      setTimeout(() => {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        } catch(e){}
      }, 50);
    }
  };

  return (
    <div className="w-full h-8 px-4 flex items-center justify-between text-xs font-semibold text-gray-300 border-b border-white/5 select-none bg-slate-950/65 backdrop-blur-md z-40 fixed top-0 left-0">
      {/* Left Section - OS Logo & Shortcuts */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => {
            playSound('click');
            openWindow('home');
          }}
          className="flex items-center gap-1.5 hover:text-white transition-all cursor-pointer font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
        >
          <Circle className="w-3.5 h-3.5 fill-cyan-400 stroke-cyan-400" />
          <span>nisarg@OS</span>
        </button>

        <span className="text-gray-600">|</span>

        {/* Shortcuts */}
        <button 
          onClick={() => { playSound('click'); openWindow('terminal'); }}
          className="hover:text-white flex items-center gap-1 transition-all cursor-pointer"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Terminal</span>
        </button>

        <button 
          onClick={() => { playSound('click'); openWindow('explorer'); }}
          className="hover:text-white flex items-center gap-1 transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Explorer</span>
        </button>

        <button 
          onClick={() => {
            playSound('click');
            addNotification(
              "Help / Shortcuts", 
              "Press Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) to toggle Retro CRT mode. Double click window headers to maximize.", 
              "info"
            );
          }}
          className="hover:text-white flex items-center gap-1 transition-all cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden lg:inline">Help</span>
        </button>
      </div>

      {/* Center Section - System Active Badge */}
      <div className="hidden md:flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-gray-400">Status: Enterprise Search Intern @ Samsung PRISM</span>
      </div>

      {/* Right Section - System Status Icons & Date/Time */}
      <div className="flex items-center gap-4">
        {/* Social Links */}
        <a 
          href={portfolioData.personal.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => playSound('click')}
          className="hover:text-white transition-all cursor-pointer p-0.5 rounded hover:bg-white/5"
          title="GitHub Profile"
        >
          <Github className="w-3.5 h-3.5" />
        </a>
        <a 
          href={portfolioData.personal.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => playSound('click')}
          className="hover:text-white transition-all cursor-pointer p-0.5 rounded hover:bg-white/5"
          title="LinkedIn Profile"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>

        <span className="text-gray-600">|</span>

        {/* CRT Theme Toggle */}
        <button 
          onClick={() => {
            playSound('click');
            setRetroTheme(!retroTheme);
            addNotification("Theme Toggled", retroTheme ? "Switched to High-Tech workstation view" : "Switched to CRT Retro terminal view", "success");
          }}
          className={`hover:text-white transition-all cursor-pointer p-0.5 rounded hover:bg-white/5 ${retroTheme ? 'text-green-400' : ''}`}
          title="Toggle CRT Retro Mode"
        >
          <Monitor className="w-3.5 h-3.5" />
        </button>

        {/* Volume */}
        <button 
          onClick={toggleMute}
          className="hover:text-white transition-all cursor-pointer p-0.5 rounded hover:bg-white/5"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Network */}
        <div className="flex items-center gap-1" title={`Network: ${wifiSignal}`}>
          <Wifi className="w-3.5 h-3.5 text-cyan-400" />
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1" title={`Battery: ${batteryLevel}%`}>
          <Battery className={`w-4 h-4 ${batteryLevel < 20 ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`} />
          <span className="hidden sm:inline">{batteryLevel}%</span>
        </div>

        <span className="text-gray-600">|</span>

        {/* Date and Time */}
        <div className="flex items-center gap-2 text-white/95">
          <span>{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
