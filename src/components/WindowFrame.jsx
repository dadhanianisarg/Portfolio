import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindow } from '../context/WindowContext';
import { X, Minus, Square } from 'lucide-react';

export const WindowFrame = ({ id, children }) => {
  const { 
    windows, 
    activeWindow, 
    zIndexList, 
    bringToFront, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    retroTheme 
  } = useWindow();

  const windowRef = useRef(null);
  const win = windows[id];

  if (!win || !win.isOpen || win.isMinimized) return null;

  const isActive = activeWindow === id;
  const isMaximized = win.isMaximized;
  const zIndex = zIndexList.indexOf(id) + 10;

  // Header button click handlers
  const handleClose = (e) => {
    e.stopPropagation();
    closeWindow(id);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    minimizeWindow(id);
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    maximizeWindow(id);
  };

  const handleHeaderDoubleClick = () => {
    maximizeWindow(id);
  };

  return (
    <motion.div
      ref={windowRef}
      onPointerDown={() => bringToFront(id)}
      initial={isMaximized ? { x: 0, y: 0, width: '100vw', height: 'calc(100vh - 2rem)' } : { scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? '100vw' : win.size.width,
        height: isMaximized ? 'calc(100vh - 2.5rem)' : win.size.height,
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        top: isMaximized ? '2rem' : undefined,
        left: isMaximized ? '0px' : undefined
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
      drag={!isMaximized}
      dragHandleClassName="window-drag-handle"
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{ left: -300, right: window.innerWidth - 100, top: 0, bottom: window.innerHeight - 150 }}
      style={{
        zIndex,
        position: 'fixed',
        left: !isMaximized ? `${win.position.x}px` : '0px',
        top: !isMaximized ? `${win.position.y}px` : '2rem'
      }}
      className={`rounded-xl flex flex-col overflow-hidden select-text ${
        isMaximized ? 'rounded-none' : ''
      } ${
        isActive 
          ? 'glass-panel-active ring-1 ring-purple-500/30' 
          : 'glass-panel shadow-lg'
      } ${retroTheme ? 'crt-effect border-green-500/30 font-mono text-green-400' : 'text-gray-200'}`}
    >
      {/* Window Title Bar */}
      <div 
        onDoubleClick={handleHeaderDoubleClick}
        className={`h-10 px-4 flex items-center justify-between border-b shrink-0 select-none window-drag-handle ${
          isActive 
            ? 'bg-[#111827]/80 border-purple-500/20' 
            : 'bg-[#111827]/40 border-white/5'
        }`}
      >
        {/* MacOS Style Buttons */}
        <div className="flex items-center gap-2 group/btns">
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-red-900 group-hover/btns:text-red-950 text-[8px] font-bold cursor-pointer transition-colors"
          >
            <X className="w-2 h-2 opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
          
          {/* Minimize button */}
          <button 
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-yellow-900 group-hover/btns:text-yellow-950 text-[8px] font-bold cursor-pointer transition-colors"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
          
          {/* Maximize button */}
          <button 
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-green-950 group-hover/btns:text-green-950 text-[8px] font-bold cursor-pointer transition-colors"
          >
            <Square className="w-1.5 h-1.5 opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Title */}
        <div className="text-xs font-semibold text-gray-300 pointer-events-none flex items-center gap-1.5">
          <span>{win.title}</span>
        </div>

        {/* Empty Placeholder for symmetrical styling */}
        <div className="w-12"></div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto bg-gray-950/45 p-5 relative select-text">
        {children}
      </div>
    </motion.div>
  );
};
