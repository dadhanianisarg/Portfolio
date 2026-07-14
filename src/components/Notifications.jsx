import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindow } from '../context/WindowContext';
import { Info, CheckCircle, AlertTriangle, X } from 'lucide-react';

const icons = {
  info: <Info className="w-5 h-5 text-cyan-400" />,
  success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  error: <AlertTriangle className="w-5 h-5 text-rose-500" />
};

const borderColors = {
  info: 'border-cyan-500/25',
  success: 'border-emerald-500/25',
  error: 'border-rose-500/25'
};

export const Notifications = () => {
  const { notifications, removeNotification, playSound } = useWindow();

  return (
    <div className="fixed top-12 right-4 z-50 flex flex-col gap-3 w-80 max-w-[90vw] pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95, transition: { duration: 0.2 } }}
            className={`pointer-events-auto p-4 rounded-xl border glass-panel flex gap-3 items-start shadow-xl relative overflow-hidden ${borderColors[n.type]}`}
          >
            {/* Ambient left bar indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              n.type === 'success' ? 'bg-emerald-500' : n.type === 'error' ? 'bg-rose-500' : 'bg-cyan-500'
            }`} />

            {/* Icon */}
            <div className="shrink-0 mt-0.5">{icons[n.type] || icons.info}</div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="text-xs font-bold text-gray-100 truncate">{n.title}</h4>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{n.message}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                playSound('click');
                removeNotification(n.id);
              }}
              className="shrink-0 text-gray-500 hover:text-white transition-colors cursor-pointer p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
