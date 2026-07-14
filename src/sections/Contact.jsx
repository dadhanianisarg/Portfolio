import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Code2, FileText, Check, Copy, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      label: "Direct Email",
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
      icon: <Mail className="w-5 h-5 text-blue-400" />,
      actionable: true
    },
    {
      label: "LinkedIn Profile",
      value: portfolioData.personal.linkedin.replace('https://www.', '').replace('https://', ''),
      href: portfolioData.personal.linkedin,
      icon: <Linkedin className="w-5 h-5 text-purple-400" />,
      actionable: false
    },
    {
      label: "GitHub Repositories",
      value: portfolioData.personal.github.replace('https://', ''),
      href: portfolioData.personal.github,
      icon: <Github className="w-5 h-5 text-gray-300" />,
      actionable: false
    },
    {
      label: "LeetCode Dashboard",
      value: portfolioData.personal.leetcode.replace('https://', ''),
      href: portfolioData.personal.leetcode,
      icon: <Code2 className="w-5 h-5 text-amber-500" />,
      actionable: false
    }
  ];

  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-6 relative text-center">
      {/* Background radial overlay */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-14">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">comms.coordinates: Active</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-1">Let's Connect</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-3">
          I'm currently looking for internships, full-time engineering roles, and collaborative projects.
        </p>
      </div>

      {/* Grid Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {links.map((link) => (
          <div 
            key={link.label}
            className="p-4 bg-[#111827] border border-white/5 hover:border-purple-500/10 rounded-2xl flex items-center justify-between group shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:bg-white/10 transition-colors shrink-0">
                {link.icon}
              </div>
              <div className="text-left min-w-0">
                <div className="text-[10px] text-gray-400 font-mono uppercase">{link.label}</div>
                <div className="text-xs font-semibold text-white truncate max-w-[180px] sm:max-w-[200px] mt-0.5">
                  {link.value}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              {link.actionable ? (
                <button
                  onClick={handleCopyEmail}
                  className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                  title="Copy to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <div className="mt-16 pt-10 border-t border-white/5 text-[10px] text-gray-500 font-mono">
        <p>&copy; {new Date().getFullYear()} Nisarg Dadhania. All rights reserved.</p>
        <p className="mt-1 opacity-70">Designed for recruiter clarity. Built with React + Tailwind + Framer Motion.</p>
      </div>
    </section>
  );
};
