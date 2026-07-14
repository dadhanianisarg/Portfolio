import React, { useEffect } from 'react';
import { WindowProvider } from './context/WindowContext';
import { Navbar } from './components/Navbar';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Notifications } from './components/Notifications';
import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';

function MainLayout() {
  // Setup mouse cursor spotlight position variables
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/20 selection:text-purple-300">
      {/* Gradient Spotlight overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 spotlight-overlay mix-blend-screen opacity-100" />
      
      {/* Animated Mesh Grid and Stars background */}
      <BackgroundEffect />

      {/* Floating System notifications toasts */}
      <Notifications />

      {/* Sticky navigation bar */}
      <Navbar />

      {/* Single Page Flow Sections */}
      <main className="relative z-10 overflow-hidden">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <WindowProvider>
      <MainLayout />
    </WindowProvider>
  );
}
