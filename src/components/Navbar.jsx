import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { printResume } from '../utils/printResume';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResumeClick = () => {
    window.open(portfolioData.personal.resumeUrl, '_blank');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-nav py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5"
        >
          <span>Nisarg</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleResumeClick}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-full hover:bg-purple-950/15 cursor-pointer transition-all duration-300"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* Mobile menu triggers */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-300 hover:text-white p-1 cursor-pointer"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0b1120] border-b border-white/5 px-6 py-6 flex flex-col gap-5 shadow-2xl transition-all duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-base font-semibold text-gray-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleResumeClick}
            className="w-full flex items-center justify-center gap-1 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg cursor-pointer transition-all"
          >
            <span>Download Resume</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
};
