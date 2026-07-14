import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Cpu, Code2, Sparkles, BookOpen } from 'lucide-react';

const achievements = [
  {
    title: "Branch Topper",
    subtitle: "Academic Excellence at VIT",
    description: "Maintained a B.Tech CGPA of 9.51 in Computer Science and Engineering, ranking in the top 1% of the student cohort.",
    icon: <BookOpen className="w-6 h-6 text-purple-400" />
  },
  {
    title: "LeetCode Knight Badge",
    subtitle: "Peak Contest Rating: 1837",
    description: "Earned Knight status on LeetCode by consistently scoring in the top 4.5% globally in weekly programming contests.",
    icon: <Code2 className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Samsung PRISM Recognition",
    subtitle: "AI Multimodal Research Award",
    description: "Awarded Certificate of Project Excellence by Samsung Research India scientists for vector search pipeline contributions.",
    icon: <Cpu className="w-6 h-6 text-cyan-400" />
  },
  {
    title: "900+ Algorithmic Solutions",
    subtitle: "High-Performance DSA Problem Solving",
    description: "Solved over 900 algorithmic puzzles across LeetCode, Codeforces (Specialist), and GeeksforGeeks.",
    icon: <Trophy className="w-6 h-6 text-emerald-400" />
  }
];

export const Achievements = () => {
  return (
    <section id="achievements" className="py-24 max-w-5xl mx-auto px-6 relative">
      {/* Background decoration */}
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-14 text-center">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-mono">system/credentials: Verified</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">Honours & Highlights</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">Documented recognition for research output, academic rank, and competitive programming.</p>
      </div>

      {/* Achievements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {achievements.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 bg-[#111827] border border-white/5 hover:border-purple-500/10 rounded-2xl flex gap-4 transition-all duration-300"
          >
            {/* Icon Block */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl shrink-0 h-12 w-12 flex items-center justify-center">
              {item.icon}
            </div>

            {/* Content Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{item.title}</h3>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-60 animate-pulse" />
              </div>
              <p className="text-[10px] font-mono font-bold text-cyan-400">{item.subtitle}</p>
              <p className="text-xs text-gray-400 leading-relaxed mt-1.5">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
