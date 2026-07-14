import React, { useState, useEffect, useRef } from 'react';
import { useWindow } from '../context/WindowContext';
import { portfolioData } from '../data/portfolioData';

const COMMANDS = [
  'help', 'about', 'projects', 'skills', 'experience', 'education', 
  'resume', 'github', 'linkedin', 'leetcode', 'contact', 'clear', 
  'date', 'whoami', 'pwd', 'cat', 'tree', 'ls', 'history', 'echo', 
  'neofetch', 'sudo', 'coffee'
];

const FILES = ['resume.txt', 'skills.txt', 'experience.txt', 'contact.txt'];

export const Terminal = () => {
  const { openWindow, addNotification, playSound, retroTheme } = useWindow();
  
  const [history, setHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [terminalLogs, setTerminalLogs] = useState([
    { text: "Welcome to Antigravity Interactive Terminal v2.0", type: "system" },
    { text: "Type 'help' to see all available commands. Press TAB for autocomplete.", type: "system" },
    { text: "", type: "empty" }
  ]);
  const [inputValue, setInputValue] = useState("");
  
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when terminal logs update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Focus terminal input on container click
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const processCommand = (rawInput) => {
    const trimmedInput = rawInput.trim();
    if (!trimmedInput) return;

    // Add command to history
    setHistory((prev) => [...prev, trimmedInput]);
    setHistoryPointer(-1);

    // Split command and arguments
    const parts = trimmedInput.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add prompt line to logs
    const logs = [...terminalLogs, { text: `nisarg@portfolio:~$ ${trimmedInput}`, type: "prompt" }];

    switch (cmd) {
      case 'help':
        logs.push({
          text: `Available Commands:
  help           - Display this helper catalog
  about          - Brief overview of who I am
  projects       - Show engineering projects list
  skills         - List technical skills registry
  experience     - Display industrial internship experience
  education      - Showcase academic degrees and CGPA
  resume         - Open resume viewer application
  neofetch       - Display system specifications summary
  tree           - Draw local folder hierarchy tree
  ls             - List local files in current path
  cat <file>     - Display content of a text file (e.g. cat resume.txt)
  whoami         - Print current user session identification
  pwd            - Print working directory
  clear          - Clear terminal logs
  date           - Print current date and time
  history        - Show command logs history
  echo <text>    - Print text arguments back to terminal
  github         - Link to GitHub profile
  linkedin       - Link to LinkedIn profile
  leetcode       - Link to LeetCode developer handle
  contact        - Open contact form window
  coffee         - Power up developer core
  sudo hire-me   - Initiate automated recommendation engine`,
          type: "output"
        });
        playSound('click');
        break;

      case 'clear':
        setTerminalLogs([]);
        setInputValue("");
        return;

      case 'about':
        logs.push({ text: portfolioData.personal.bio, type: "output" });
        playSound('click');
        break;

      case 'whoami':
        logs.push({ text: "nisarg - Software Engineer, AI Researcher & Competitive Programmer", type: "output" });
        playSound('click');
        break;

      case 'pwd':
        logs.push({ text: "/home/nisarg", type: "output" });
        playSound('click');
        break;

      case 'date':
        logs.push({ text: new Date().toString(), type: "output" });
        playSound('click');
        break;

      case 'history':
        logs.push({ text: history.map((h, i) => `  ${i + 1}  ${h}`).join('\n'), type: "output" });
        playSound('click');
        break;

      case 'echo':
        logs.push({ text: args.join(' '), type: "output" });
        playSound('click');
        break;

      case 'ls':
        logs.push({ text: "achievements/  experience/  projects/  contact.txt  experience.txt  resume.txt  skills.txt", type: "output" });
        playSound('click');
        break;

      case 'tree':
        logs.push({
          text: `.
├── achievements/
│   ├── branch-topper.txt
│   └── knight-badge.txt
├── experience/
│   ├── samsung-prism.txt
│   ├── ciphernutz.txt
│   └── orail-services.txt
├── projects/
│   ├── coursecraft.txt
│   ├── coordina.txt
│   └── devops-pipeline.txt
├── contact.txt
├── experience.txt
├── resume.txt
└── skills.txt`,
          type: "output"
        });
        playSound('click');
        break;

      case 'github':
        logs.push({ text: "Opening GitHub: https://github.com/dadhanianisarg", type: "success" });
        playSound('success');
        window.open(portfolioData.personal.github, "_blank");
        break;

      case 'linkedin':
        logs.push({ text: "Opening LinkedIn: https://linkedin.com/in/nisarg-dadhania", type: "success" });
        playSound('success');
        window.open(portfolioData.personal.linkedin, "_blank");
        break;

      case 'leetcode':
        logs.push({ text: "Opening LeetCode: https://leetcode.com/dadhania_nisarg", type: "success" });
        playSound('success');
        window.open(portfolioData.personal.leetcode, "_blank");
        break;

      case 'contact':
        logs.push({ text: "Launching Contact Window...", type: "success" });
        playSound('success');
        openWindow('contact');
        break;

      case 'resume':
        logs.push({ text: "Launching Resume Viewer...", type: "success" });
        playSound('success');
        openWindow('resume');
        break;

      case 'education':
        logs.push({
          text: `Degree:    ${portfolioData.personal.education.degree}
College:   ${portfolioData.personal.education.institution}
Period:    ${portfolioData.personal.education.period}
CGPA:      ${portfolioData.personal.education.cgpa}`,
          type: "output"
        });
        playSound('click');
        break;

      case 'skills':
        logs.push({
          text: portfolioData.skills.map(s => `  ${s.name.padEnd(20)} [${s.level}]`).join('\n'),
          type: "output"
        });
        playSound('click');
        break;

      case 'experience':
        logs.push({
          text: portfolioData.experience.map(e => `* ${e.role} at ${e.company} (${e.period})
  ${e.highlights.join('\n  ')}`).join('\n\n'),
          type: "output"
        });
        playSound('click');
        break;

      case 'projects':
        logs.push({
          text: portfolioData.projects.map(p => `* ${p.title} - ${p.subtitle}
  Repo:  ${p.github}
  Stack: ${p.techStack.join(', ')}`).join('\n\n'),
          type: "output"
        });
        playSound('click');
        break;

      case 'coffee':
        logs.push({
          text: `     (  )
     ( )
    [____]
     \\  /
      \\/
Developer Fuel Loaded. Ready to crunch algorithms!`,
          type: "success"
        });
        playSound('success');
        break;

      case 'sudo':
        if (args[0] === 'hire-me') {
          logs.push({
            text: `[SUDO] Password verification: OK
Evaluating candidate 'Nisarg Dadhania'...
------------------------------------------------
ACCESS GRANTED.
HIRING RECOMMENDATION SCORE: 100%
Primary Reasons:
- Deep Backend & API design competency (Express/Node/MongoDB)
- AI Research experience (Semantic Multimodal Search at Samsung PRISM)
- Automated DevOps GitOps deployments (Jenkins/Docker/K8s/ArgoCD)
- Elite Data Structures & Algorithms proficiency (Knight rating 1837)
Verdict: Excellent candidate. Proceed to schedule interview.`,
            type: "success"
          });
          playSound('success');
          addNotification("Hiring Flag Set", "Recommendation score evaluated to 100%.", "success");
        } else {
          logs.push({ text: "Permission denied. Did you mean 'sudo hire-me'?", type: "error" });
          playSound('error');
        }
        break;

      case 'cat':
        if (!args[0]) {
          logs.push({ text: "Usage: cat <filename>. Example: cat resume.txt", type: "error" });
          playSound('error');
        } else {
          const file = args[0].toLowerCase();
          if (file === 'resume.txt') {
            logs.push({
              text: `Nisarg Dadhania
B.Tech Computer Science and Engineering | VIT University (CGPA 9.51)
Experience:
- Samsung PRISM (AI Research Intern)
- Ciphernutz (Software Development Intern)
- Orail Services (Frontend Intern)`,
              type: "output"
            });
            playSound('click');
          } else if (file === 'skills.txt') {
            logs.push({
              text: `Languages:  C++, Python, Java, JavaScript
Backend:    Node.js, Express.js, MongoDB, Redis
DevOps/K8s: Docker, Kubernetes, Jenkins, Git, AWS
Frontend:   React, Tailwind CSS`,
              type: "output"
            });
            playSound('click');
          } else if (file === 'experience.txt') {
            logs.push({
              text: `1. Samsung PRISM - AI Research Intern (Jan 2026 - Present)
   Focused on Multimodal Retrieval, Vector Search, and Semantic Indexing.
2. Ciphernutz - Software Intern (May 2025 - Jul 2025)
   Configured backend REST APIs and deployed code onto AWS systems.
3. Orail Services - Frontend Intern (Dec 2024 - Feb 2025)
   Built dashboards for ERP Jewelry management systems.`,
              type: "output"
            });
            playSound('click');
          } else if (file === 'contact.txt') {
            logs.push({
              text: `Contact Coordinate:
Email: nisargdadhania.dev@gmail.com
LinkedIn: linkedin.com/in/nisarg-dadhania`,
              type: "output"
            });
            playSound('click');
          } else {
            logs.push({ text: `cat: ${args[0]}: File not found. Type 'ls' to see files.`, type: "error" });
            playSound('error');
          }
        }
        break;

      case 'neofetch':
        const uptime = Math.floor((Date.now() - 1718000000000) / (1000 * 60 * 60 * 24 * 365)); // Mock uptime
        logs.push({
          text: `      /\\      OS: Developer OS v2.0
     /  \\     Host: Vellore Institute of Technology
    /\\   \\    Kernel: x86_64 Linux 7.14.2026
   /  \\   \\   Uptime: 3 years coding
  /\\   \\   \\  Shell: zsh-simulated 2.0
 /  \\___\\___\\ Resolution: ${window.innerWidth}x${window.innerHeight}
 \\  /   /   / Theme: Cyber Glassmorphism
  \\/___/___/  CPU: Problem Solver (C++/JS/Python)
              RAM: Coffee (914 MB Solved / 1024 MB Total)`,
          type: "output"
        });
        playSound('success');
        break;

      default:
        logs.push({ text: `command not found: ${cmd}. Type 'help' to see all processes.`, type: "error" });
        playSound('error');
    }

    logs.push({ text: "", type: "empty" });
    setTerminalLogs(logs);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    // Autocomplete with TAB
    if (e.key === 'Tab') {
      e.preventDefault();
      playSound('click');
      const val = inputValue.trim().toLowerCase();
      if (!val) return;

      // Filter commands
      const matchedCmds = COMMANDS.filter(c => c.startsWith(val));
      const matchedFiles = FILES.filter(f => f.startsWith(val));

      if (matchedCmds.length === 1) {
        setInputValue(matchedCmds[0] + " ");
      } else if (matchedCmds.length > 1) {
        setTerminalLogs((prev) => [
          ...prev,
          { text: `nisarg@portfolio:~$ ${inputValue}`, type: "prompt" },
          { text: matchedCmds.join('    '), type: "output" },
          { text: "", type: "empty" }
        ]);
      } else if (inputValue.startsWith('cat ')) {
        const filePrefix = inputValue.substring(4).trim().toLowerCase();
        const matchedFs = FILES.filter(f => f.startsWith(filePrefix));
        if (matchedFs.length === 1) {
          setInputValue("cat " + matchedFs[0]);
        }
      }
    }

    // Command History arrows
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      playSound('click');

      const nextPointer = historyPointer + 1;
      if (nextPointer < history.length) {
        setHistoryPointer(nextPointer);
        setInputValue(history[history.length - 1 - nextPointer]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playSound('click');
      const nextPointer = historyPointer - 1;
      if (nextPointer >= 0) {
        setHistoryPointer(nextPointer);
        setInputValue(history[history.length - 1 - nextPointer]);
      } else {
        setHistoryPointer(-1);
        setInputValue("");
      }
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`h-full overflow-y-auto font-mono text-[11px] md:text-xs leading-relaxed p-4 rounded bg-[#111827]/95 selection:bg-cyan-500/30 select-text flex flex-col ${
        retroTheme ? 'text-green-400 border border-green-500/10' : 'text-gray-300'
      }`}
      ref={containerRef}
      style={{ minHeight: '100%', maxHeight: '100%' }}
    >
      {/* Logs container */}
      <div className="flex-1 space-y-1">
        {terminalLogs.map((log, idx) => {
          if (log.type === 'prompt') {
            return (
              <div key={idx} className="font-bold">
                <span className="text-purple-400">nisarg@portfolio</span>
                <span className="text-gray-400">:</span>
                <span className="text-cyan-400">~</span>
                <span className="text-gray-300">$</span> {log.text.substring(17)}
              </div>
            );
          }
          if (log.type === 'error') {
            return <div key={idx} className="text-red-400 whitespace-pre-wrap">{log.text}</div>;
          }
          if (log.type === 'success') {
            return <div key={idx} className="text-emerald-400 whitespace-pre-wrap">{log.text}</div>;
          }
          if (log.type === 'system') {
            return <div key={idx} className="text-cyan-400/80 font-semibold">{log.text}</div>;
          }
          if (log.type === 'empty') {
            return <div key={idx} className="h-1.5" />;
          }
          return <div key={idx} className="whitespace-pre-wrap text-gray-300 leading-normal">{log.text}</div>;
        })}
      </div>

      {/* Input Line */}
      <div className="flex items-center mt-2 shrink-0">
        <span className="text-purple-400 font-bold">nisarg@portfolio</span>
        <span className="text-gray-400 font-bold">:</span>
        <span className="text-cyan-400 font-bold">~</span>
        <span className="text-gray-300 font-bold mr-2">$</span>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              processCommand(inputValue);
            }
          }}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-transparent select-text"
          autoFocus
        />
        {/* Blinking simulated cursor */}
        <span className="terminal-cursor w-2 h-4 bg-cyan-400"></span>
      </div>
    </div>
  );
};
