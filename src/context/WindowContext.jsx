import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowContext = createContext(undefined);

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (!context) throw new Error("useWindow must be used within a WindowProvider");
  return context;
};

const initialWindows = {
  home: { id: 'home', title: 'Welcome', icon: 'Home', isOpen: true, isMinimized: false, isMaximized: false, size: { width: 750, height: 480 }, position: { x: 50, y: 80 } },
  about: { id: 'about', title: 'About Me', icon: 'User', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 700, height: 500 }, position: { x: 120, y: 100 } },
  experience: { id: 'experience', title: 'Experience', icon: 'Briefcase', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 750, height: 520 }, position: { x: 150, y: 120 } },
  projects: { id: 'projects', title: 'Projects', icon: 'Code', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 850, height: 550 }, position: { x: 80, y: 60 } },
  skills: { id: 'skills', title: 'System Diagnostics (Skills)', icon: 'Cpu', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 750, height: 500 }, position: { x: 200, y: 100 } },
  dsa: { id: 'dsa', title: 'DSA Analytics Dashboard', icon: 'BarChart2', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 780, height: 520 }, position: { x: 180, y: 130 } },
  achievements: { id: 'achievements', title: 'Achievements', icon: 'Award', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 700, height: 460 }, position: { x: 220, y: 90 } },
  resume: { id: 'resume', title: 'Resume Viewer', icon: 'FileText', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 800, height: 580 }, position: { x: 100, y: 70 } },
  contact: { id: 'contact', title: 'Contact', icon: 'Mail', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 600, height: 480 }, position: { x: 250, y: 140 } },
  terminal: { id: 'terminal', title: 'Terminal', icon: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 750, height: 450 }, position: { x: 140, y: 150 } },
  explorer: { id: 'explorer', title: 'File Explorer', icon: 'Folder', isOpen: false, isMinimized: false, isMaximized: false, size: { width: 680, height: 450 }, position: { x: 90, y: 110 } }
};

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState(initialWindows);
  const [activeWindow, setActiveWindow] = useState('home');
  const [zIndexList, setZIndexList] = useState(Object.keys(initialWindows));
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [retroTheme, setRetroTheme] = useState(false);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  // Play synthetic retro audio triggers without needing static mp3 assets
  const playSound = (type = 'click') => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'beep') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'success') {
        const now = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start();
        osc.stop(now + 0.3);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'startup') {
        const now = ctx.currentTime;
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.setValueAtTime(329.63, now + 0.12); // E4
        osc.frequency.setValueAtTime(392.00, now + 0.24); // G4
        osc.frequency.setValueAtTime(523.25, now + 0.36); // C5
        
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(130.81, now); // C3
        subOsc.frequency.setValueAtTime(196.00, now + 0.24); // G3
        
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        subGain.gain.setValueAtTime(0.03, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        
        osc.start();
        osc.stop(now + 0.8);
        subOsc.start();
        subOsc.stop(now + 0.8);
      }
    } catch (e) {
      console.warn("Web Audio API not allowed or blocked by policy", e);
    }
  };

  const addNotification = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    
    if (type === 'error') playSound('error');
    else if (type === 'success') playSound('success');
    else playSound('click');

    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const bringToFront = (id) => {
    setZIndexList((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [...filtered, id];
    });
    setActiveWindow(id);
  };

  const openWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false }
    }));
    bringToFront(id);
    addNotification(`Opening ${prev => prev[id]?.title || id}`, `Initiated window process for ${id}.`, 'info');
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    playSound('click');
    if (activeWindow === id) {
      // Set the next window in z-index order as active
      const remainingOpen = zIndexList.filter(wId => wId !== id && windows[wId].isOpen && !windows[wId].isMinimized);
      if (remainingOpen.length > 0) {
        setActiveWindow(remainingOpen[remainingOpen.length - 1]);
      } else {
        setActiveWindow(null);
      }
    }
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    playSound('click');
    if (activeWindow === id) {
      const remainingOpen = zIndexList.filter(wId => wId !== id && windows[wId].isOpen && !windows[wId].isMinimized);
      if (remainingOpen.length > 0) {
        setActiveWindow(remainingOpen[remainingOpen.length - 1]);
      } else {
        setActiveWindow(null);
      }
    }
  };

  const maximizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
    playSound('click');
    bringToFront(id);
  };

  const updateWindowPosition = (id, position) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position }
    }));
  };

  // Check for Konami code: Up Up Down Down Left Right Left Right B A
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let userIndex = 0;

    const handleKeyDown = (e) => {
      const key = e.key;
      const expectedKey = konamiSequence[userIndex];
      
      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        userIndex++;
        if (userIndex === konamiSequence.length) {
          setRetroTheme((prev) => {
            const next = !prev;
            if (next) {
              addNotification("Retro Theme Unlocked", "Konami code activated! Welcome to the CRT terminal workspace.", "success");
            } else {
              addNotification("Modern Mode Activated", "Returning to high-tech developer workstation UI.", "info");
            }
            return next;
          });
          userIndex = 0;
        }
      } else {
        userIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cycle wallpaper automatically every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaperIndex((prev) => (prev + 1) % 4);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindow,
        zIndexList,
        isMuted,
        notifications,
        retroTheme,
        wallpaperIndex,
        setIsMuted,
        setWallpaperIndex,
        setRetroTheme,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        bringToFront,
        updateWindowPosition,
        addNotification,
        removeNotification,
        playSound
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
