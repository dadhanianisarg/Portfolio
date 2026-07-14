import React from 'react';
import { motion } from 'framer-motion';
import { useWindow } from '../context/WindowContext';
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  Cpu, 
  BarChart2, 
  Award, 
  FileText, 
  Mail, 
  Terminal, 
  Folder 
} from 'lucide-react';

const iconMap = {
  Home,
  User,
  Briefcase,
  Code,
  Cpu,
  BarChart2,
  Award,
  FileText,
  Mail,
  Terminal,
  Folder
};

const dockItems = [
  { id: 'home', label: 'Home', iconName: 'Home' },
  { id: 'about', label: 'About', iconName: 'User' },
  { id: 'experience', label: 'Experience', iconName: 'Briefcase' },
  { id: 'projects', label: 'Projects', iconName: 'Code' },
  { id: 'skills', label: 'Skills', iconName: 'Cpu' },
  { id: 'dsa', label: 'DSA', iconName: 'BarChart2' },
  { id: 'achievements', label: 'Awards', iconName: 'Award' },
  { id: 'explorer', label: 'Explorer', iconName: 'Folder' },
  { id: 'resume', label: 'Resume', iconName: 'FileText' },
  { id: 'contact', label: 'Contact', iconName: 'Mail' },
  { id: 'terminal', label: 'Terminal', iconName: 'Terminal' }
];

export const Dock = () => {
  const { windows, activeWindow, openWindow, playSound } = useWindow();

  const handleIconClick = (id) => {
    playSound('click');
    openWindow(id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center p-4 pointer-events-none select-none">
      {/* Dock Container */}
      <motion.div 
        className="glass-panel p-2.5 rounded-2xl flex items-end gap-3 pointer-events-auto shadow-2xl relative border border-white/10"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      >
        {dockItems.map((item) => {
          const Icon = iconMap[item.iconName];
          const isOpen = windows[item.id]?.isOpen;
          const isActive = activeWindow === item.id;

          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom bg-[#111827]/90 text-gray-200 border border-white/5 text-[10px] px-2.5 py-1 rounded-md shadow-md pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>

              {/* Icon button */}
              <motion.button
                onClick={() => handleIconClick(item.id)}
                className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-purple-600/35 border border-purple-500/50 text-white' 
                    : isOpen 
                      ? 'bg-white/10 border border-white/10 text-gray-100' 
                      : 'dock-icon-glass text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ 
                  scale: 1.3,
                  y: -8,
                  transition: { type: 'spring', stiffness: 350, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5.5 h-5.5 md:w-6 md:h-6" />
              </motion.button>

              {/* Running Status Indicator Dot */}
              {isOpen && (
                <span className={`absolute -bottom-1.5 w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : 'bg-gray-400'
                }`} />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
