import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Server, Layout, HardDrive, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: "Backend & Systems",
    icon: <Server className="w-5 h-5 text-blue-400" />,
    skills: ["Node.js", "Express.js", "Redis", "SQL / PostgreSQL", "MongoDB", "System Design"]
  },
  {
    title: "DevOps & Cloud",
    icon: <HardDrive className="w-5 h-5 text-cyan-400" />,
    skills: ["Docker", "Kubernetes (K8s)", "AWS (EC2, S3, RDS)", "Nginx", "Git / GitHub", "Linux / Bash"]
  },
  {
    title: "Programming Languages",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    skills: ["C++ (C++20)", "Python", "Java", "JavaScript (ES6)"]
  },
  {
    title: "Frontend Development",
    icon: <Layout className="w-5 h-5 text-amber-400" />,
    skills: ["React.js", "Tailwind CSS", "HTML5 & CSS3", "Responsive Architecture"]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 max-w-5xl mx-auto px-6 relative">
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-14 text-center">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">diagnostics.skills: Active</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">Technical Matrix</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">Classified skill registers detailing programming, operations, and system architectures.</p>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="p-6 bg-[#111827] border border-white/5 hover:border-purple-500/10 rounded-2xl shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                  {cat.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium text-gray-300 bg-white/5 border border-white/5 hover:border-purple-500/30 px-3 py-1.5 rounded-full hover:bg-purple-950/10 hover:text-white transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
