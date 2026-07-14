import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useWindow } from '../context/WindowContext';
import { Send, Github, Linkedin, Mail, Code2, ShieldAlert } from 'lucide-react';

export const ContactWindow = () => {
  const { playSound, addNotification } = useWindow();
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Sender identification required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid transmission format.";
    }

    if (!formData.message.trim()) newErrors.message = "Payload message cannot be empty.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      playSound('error');
      addNotification("Form Validation Error", "Please resolve fields before transmitting payload.", "error");
      return;
    }

    setIsSending(true);
    playSound('click');
    addNotification("Transmitting Payload", "Sending message packet to Nisarg dadhanianisarg/Portfolio...", "info");

    // Mocking email transit (EmailJS Integration Placeholder)
    setTimeout(() => {
      setIsSending(false);
      playSound('success');
      addNotification("Message Dispatched", "Nisarg has received your package. He will establish contact soon.", "success");
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 font-sans text-gray-300">
      {/* Left Column: Information */}
      <div className="flex-1 space-y-4 max-w-xs">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono">comms.ping: Active</span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">Get in Touch</h2>
          <p className="text-xs text-gray-400 leading-relaxed mt-2">
            Have a project, research proposal, internship role, or algorithmic riddle? Shoot a message directly through this system console.
          </p>
        </div>

        {/* Core Direct Coordinates */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 p-2.5 bg-gray-900/30 border border-white/5 rounded-lg text-xs">
            <Mail className="w-4 h-4 text-cyan-400" />
            <div className="truncate">
              <div className="text-[9px] text-gray-500 font-mono">DIRECT SMTP</div>
              <a href={`mailto:${portfolioData.personal.email}`} className="text-white hover:text-cyan-400 transition-colors font-mono">{portfolioData.personal.email}</a>
            </div>
          </div>
        </div>

        {/* Social Grid */}
        <div className="flex gap-2 pt-2">
          <a 
            href={portfolioData.personal.github} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="flex-1 p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all text-center flex items-center justify-center"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={portfolioData.personal.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="flex-1 p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all text-center flex items-center justify-center"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={portfolioData.personal.leetcode} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="flex-1 p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg transition-all text-center flex items-center justify-center"
            title="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-3 font-mono text-xs">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[10px] text-gray-400 uppercase">IDENTIFIER (Name)</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full bg-[#111827] border border-white/5 focus:border-purple-500/50 rounded-lg p-2.5 outline-none text-white focus:ring-1 focus:ring-purple-500/20 font-sans"
          />
          {errors.name && (
            <div className="text-[9px] text-rose-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> {errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-[10px] text-gray-400 uppercase">SMTP ENDPOINT (Email)</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. client@endpoint.com"
            className="w-full bg-[#111827] border border-white/5 focus:border-purple-500/50 rounded-lg p-2.5 outline-none text-white focus:ring-1 focus:ring-purple-500/20 font-sans"
          />
          {errors.email && (
            <div className="text-[9px] text-rose-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> {errors.email}</div>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="text-[10px] text-gray-400 uppercase">PAYLOAD MESSAGE</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message text here..."
            rows="3"
            className="w-full bg-[#111827] border border-white/5 focus:border-purple-500/50 rounded-lg p-2.5 outline-none text-white focus:ring-1 focus:ring-purple-500/20 font-sans resize-none"
          />
          {errors.message && (
            <div className="text-[9px] text-rose-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> {errors.message}</div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSending}
          className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-white font-semibold cursor-pointer transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 font-sans text-xs"
        >
          <Send className="w-4 h-4" />
          <span>{isSending ? "DISPATCHING PACKETS..." : "TRANSMIT PAYLOAD"}</span>
        </button>
      </form>
    </div>
  );
};
