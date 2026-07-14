import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Printer, Download, Mail, Github, Linkedin, Briefcase, BookOpen, Award } from 'lucide-react';
import { useWindow } from '../context/WindowContext';

export const ResumeWindow = () => {
  const { playSound, addNotification } = useWindow();

  const handlePrint = () => {
    playSound('success');
    addNotification("Print Initialized", "Generating a printer-friendly resume sheet...", "success");

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addNotification("Pop-up Blocked", "Please allow pop-ups to print the resume.", "error");
      return;
    }

    const experienceHtml = portfolioData.experience.map(exp => `
      <div class="item">
        <div class="header">
          <strong>${exp.role}</strong> at <span>${exp.company}</span>
          <span class="right">${exp.period}</span>
        </div>
        <p>${exp.description}</p>
        <ul>
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    const projectsHtml = portfolioData.projects.map(proj => `
      <div class="item">
        <div class="header">
          <strong>${proj.title}</strong> - <span>${proj.subtitle}</span>
        </div>
        <p>${proj.description}</p>
        <p><strong>Stack:</strong> ${proj.techStack.join(', ')}</p>
      </div>
    `).join('');

    const skillsHtml = portfolioData.skills.map(s => s.name).join(', ');

    printWindow.document.write(`
      <html>
        <head>
          <title>${portfolioData.personal.name} - Resume</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; padding: 30px; font-size: 11px; line-height: 1.4; color: #111; max-width: 800px; margin: 0 auto; }
            h1 { text-align: center; margin-bottom: 5px; font-size: 20px; text-transform: uppercase; }
            .subtitle { text-align: center; margin-bottom: 20px; font-size: 10px; color: #444; }
            .section-title { font-weight: bold; border-bottom: 1.5px solid #222; margin-top: 20px; margin-bottom: 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 2px; }
            .item { margin-bottom: 12px; }
            .header { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 3px; }
            .header span { font-weight: normal; }
            .header .right { font-style: italic; }
            ul { margin-top: 3px; margin-bottom: 0px; padding-left: 20px; }
            li { margin-bottom: 2px; }
            p { margin: 3px 0; }
          </style>
        </head>
        <body>
          <h1>${portfolioData.personal.name}</h1>
          <div class="subtitle">
            ${portfolioData.personal.email} | GitHub: github.com/dadhanianisarg | LinkedIn: linkedin.com/in/nisarg-dadhania
          </div>

          <div class="section-title">Education</div>
          <div class="item">
            <div class="header">
              <strong>${portfolioData.personal.education.institution}</strong>
              <span class="right">${portfolioData.personal.education.period}</span>
            </div>
            <p>${portfolioData.personal.education.degree}</p>
            <p><strong>Performance Metric:</strong> CGPA: ${portfolioData.personal.education.cgpa}</p>
          </div>

          <div class="section-title">Professional Experience</div>
          ${experienceHtml}

          <div class="section-title">Key Projects</div>
          ${projectsHtml}

          <div class="section-title">Technical Expertise</div>
          <p>${skillsHtml}</p>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    // Delay print slightly to ensure content is fully rendered in popup
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleDownload = () => {
    playSound('success');
    addNotification("Download Started", "Downloading Nisarg_Dadhania_Resume.pdf...", "success");
    
    // Create virtual download element pointing to resume
    const link = document.createElement('a');
    link.href = portfolioData.personal.resumeUrl;
    link.download = 'Nisarg_Dadhania_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col font-sans text-gray-300 space-y-4">
      {/* Top Menu / Controls */}
      <div className="flex justify-between items-center bg-gray-900/40 p-2.5 rounded-lg border border-white/5">
        <div className="text-[10px] font-mono text-gray-400">RESUME_VIEWER.EXE</div>
        
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white rounded text-[10px] border border-gray-700 transition-all font-mono cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Layout</span>
          </button>
          
          <button 
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 bg-purple-900/35 hover:bg-purple-800/40 text-purple-200 hover:text-white rounded text-[10px] border border-purple-800/40 transition-all font-mono cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet Preview - Styled like a premium code terminal layout */}
      <div className="flex-1 overflow-y-auto bg-gray-950/80 p-5 rounded-xl border border-white/5 max-h-[350px] shadow-inner font-mono text-[10px] md:text-xs leading-relaxed space-y-5">
        
        {/* Header Name */}
        <div className="text-center space-y-1 pb-4 border-b border-white/5">
          <h2 className="text-sm md:text-base font-black text-white uppercase tracking-wider">{portfolioData.personal.name}</h2>
          <p className="text-[10px] text-gray-400">
            {portfolioData.personal.email} | GitHub: dadhanianisarg | LinkedIn: nisarg-dadhania
          </p>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Education</span>
          </div>
          <div className="pl-4 space-y-1 border-l border-white/5">
            <div className="flex justify-between text-white font-bold">
              <span>{portfolioData.personal.education.institution}</span>
              <span className="text-gray-500">{portfolioData.personal.education.period}</span>
            </div>
            <p className="text-gray-400">{portfolioData.personal.education.degree}</p>
            <p className="text-gray-400">GPA Metric: CGPA {portfolioData.personal.education.cgpa}</p>
          </div>
        </div>

        {/* Internships */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience Timeline</span>
          </div>
          
          <div className="space-y-3.5 pl-4 border-l border-white/5">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-white font-bold">
                  <span>{exp.role} - {exp.company}</span>
                  <span className="text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-400 leading-normal">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical core */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Technical Skills</span>
          </div>
          <div className="pl-4 border-l border-white/5">
            <p className="text-gray-300">
              {portfolioData.skills.map(s => s.name).join(' | ')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
