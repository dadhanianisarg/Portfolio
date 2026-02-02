import React, { useState, useEffect } from "react";
import "./App.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      let current = "home";

      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.offsetTop;
        if (scrollPos >= top - 200) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Gradient definition reused by SVG icons */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "#ec4899", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">ND</div>
          <ul className={`nav-links ${mobileOpen ? "active" : ""}`}>
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={handleNavClick(id)}
                  className={activeSection === id ? "active" : ""}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className={`mobile-menu-toggle ${mobileOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-name fade-in">Nisarg Dadhania</h1>
              <p className="hero-title fade-in-delay-1">Full Stack Developer</p>
              <p className="hero-tagline fade-in-delay-2">
                Full Stack developer focused on building reliable, scalable web
                experiences with clean, modern architectures.
              </p>
              <p className="hero-bio fade-in-delay-3">
                3rd-year B.Tech CSE student with a strong interest in learning
                new technologies. Passionate about growing alongside the
                fast-evolving tech industry and building reliable, scalable, and
                clean web applications.
              </p>
              <div className="hero-highlights fade-in-delay-4">
                <span className="highlight-badge">MERN Stack</span>
                <span className="highlight-badge">Backend &amp; APIs</span>
                <span className="highlight-badge">DSA &amp; Problem Solving</span>
              </div>
              <div className="hero-cta fade-in-delay-5">
                <a href="#projects" onClick={handleNavClick("projects")} className="btn btn-primary">
                  View Projects
                </a>
                <a href="#contact" onClick={handleNavClick("contact")} className="btn btn-secondary">
                  Contact Me
                </a>
              </div>
              <div className="hero-metrics fade-in-delay-5">
                <div className="metric-pill">
                  <span className="metric-label">DSA Problems</span>
                  <span className="metric-value">500+ solved</span>
                </div>
                <div className="metric-pill">
                  <span className="metric-label">Current CGPA</span>
                  <span className="metric-value">9.58 / 10</span>
                </div>
                <div className="metric-pill">
                  <span className="metric-label">LeetCode Peak</span>
                  <span className="metric-value">1749 rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a B.Tech Computer Science &amp; Engineering student at Vellore
                Institute of Technology, currently in my 3rd year with a CGPA of
                9.58. I'm a curious learner focused on backend systems, APIs,
                and scalable full-stack solutions.
              </p>
              <p>
                My passion lies in building robust applications that solve
                real-world problems while maintaining clean code and best
                practices. I thrive on challenges and continuously seek
                opportunities to expand my technical expertise.
              </p>
            </div>
            <div className="about-details">
              <div className="detail-card">
                <h3>Education</h3>
                <p>
                  <strong>B.Tech CSE</strong> – Vellore Institute of Technology, Vellore{" "}
                  <br />
                  (Aug 2023–Present)
                </p>
                <p>
                  CGPA: <strong>9.58</strong>
                </p>
              </div>
              <div className="detail-card">
                <h3>Achievements</h3>
                <ul>
                  <li>500+ DSA problems solved (400+ on LeetCode)</li>
                  <li>
                    Peak LeetCode rating: <strong>1749</strong>
                  </li>
                  <li>Branch Topper (1st year)</li>
                  <li>Strong JEE ranks (top 3.3% nationwide)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-content">
            <div className="skills-category">
              <h3>Primary Focus Areas</h3>
              <div className="skill-items">
                <div className="skill-card">
                  <div className="skill-icon">⚡</div>
                  <h4>MERN Stack Development</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">🔧</div>
                  <h4>Backend &amp; REST API Development</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">📊</div>
                  <h4>Data Structures &amp; Algorithms</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">💡</div>
                  <h4>Problem Solving</h4>
                </div>
              </div>
            </div>
            <div className="skills-category">
              <h3>Technical Stack</h3>
              <div className="tech-stack">
                <div className="tech-group">
                  <h4>Languages</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">C++</span>
                    <span className="tech-tag">C</span>
                    <span className="tech-tag">Java</span>
                    <span className="tech-tag">Python</span>
                  </div>
                </div>
                <div className="tech-group">
                  <h4>Frontend</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">HTML</span>
                    <span className="tech-tag">CSS</span>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">Tailwind CSS</span>
                  </div>
                </div>
                <div className="tech-group">
                  <h4>Backend</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">Express.js</span>
                  </div>
                </div>
                <div className="tech-group">
                  <h4>Databases</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">MongoDB</span>
                  </div>
                </div>
                <div className="tech-group">
                  <h4>Tools &amp; Tech</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">Git</span>
                    <span className="tech-tag">GitHub</span>
                    <span className="tech-tag">Postman</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h3>Frontend Intern</h3>
                <p className="company">Orail Services</p>
                <p className="duration">May 2025 – June 2025</p>
                <ul className="experience-details">
                  <li>
                    Improved UI components and layouts in a React.js project
                  </li>
                  <li>Enhanced responsiveness and usability of forms</li>
                  <li>
                    Worked with Tailwind CSS &amp; Bootstrap for reusable
                    components
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <h3>TeamSync</h3>
                <span className="project-type">Project Management System</span>
              </div>
              <p className="project-description">
                MERN-based multi-tenant project management platform with
                role-based access control, secure authentication, and analytics
                APIs. Built for scalability and team collaboration.
              </p>
              <div className="project-tech">
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">Express</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Node.js</span>
              </div>
              <a
                href="https://github.com/dadhanianisarg/Team-Management-Portal"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View on GitHub
              </a>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>CourseCraft</h3>
                <span className="project-type">Online Learning Platform</span>
              </div>
              <p className="project-description">
                Full-stack ed-tech platform with student/instructor roles,
                secure backend, payment integration, and cloud media storage.
                Designed for seamless learning experiences.
              </p>
              <div className="project-tech">
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">Express</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Node.js</span>
              </div>
              <a
                href="https://github.com/dadhanianisarg/CourseCraft"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>Let's connect and discuss opportunities!</p>
              <div className="contact-links">
                <a
                  href="mailto:nisargdadhania04@gmail.com"
                  className="contact-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>nisargdadhania04@gmail.com</span>
                </a>

                <a href="tel:+919714270666" className="contact-link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 97142 70666</span>
                </a>

                <a
                  href="https://linkedin.com/in/nisarg-dadhania-9a992b314"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://codolio.com/profile/nisargdadhania"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span>Coding Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Nisarg Dadhania. Built with passion and attention to detail.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

