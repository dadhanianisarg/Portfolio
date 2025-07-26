import React, { useState, useEffect } from "react";
import "./Portfolio.css"; // You'll need to create this CSS file 

// Simple icon components (you can replace with actual icon library)
const ChevronDown = () => <span>↓</span>;
const Github = () => <span>📁</span>;
const Linkedin = () => <span>💼</span>;
const Mail = () => <span>✉️</span>;
// const ExternalLink = () => <span>🔗</span>;
const Menu = () => <span>☰</span>;
const X = () => <span>✕</span>;
const Download = () => <span>⬇️</span>;
const Code = () => <span>💻</span>;
const Database = () => <span>🗄️</span>;
const Globe = () => <span>🌐</span>;
const Tool = () => <span>🔧</span>;

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeSkillCategory, setActiveSkillCategory] = useState("languages");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "resume",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const skillsData = {
    languages: [
      { name: "JavaScript", level: 85, icon: "🟨" },
      { name: "Python", level: 80, icon: "🐍" },
      { name: "Java", level: 75, icon: "☕" },
      { name: "C & C++", level: 70, icon: "⚡" },
    ],
    development: [
      { name: "React.js", level: 88, icon: "⚛️" },
      { name: "Node.js", level: 82, icon: "🟢" },
      { name: "Express.js", level: 80, icon: "🚀" },
      { name: "HTML/CSS", level: 90, icon: "🎨" },
    ],
    dataStructures: [
      { name: "Arrays & Strings", level: 85, icon: "📊" },
      { name: "Linked Lists", level: 80, icon: "🔗" },
      { name: "Trees & Graphs", level: 75, icon: "🌳" },
      { name: "Hash Tables", level: 82, icon: "#️⃣" },
      { name: "Algorithms", level: 78, icon: "🧮" },
    ],
    // technologies: [
    //   { name: "MongoDB", level: 80, icon: "🍃" },
    //   { name: "MySQL", level: 75, icon: "🐬" },
    //   { name: "Firebase", level: 85, icon: "🔥" },
    //   { name: "AWS", level: 70, icon: "☁️" },
    // ],
    others: [
      { name: "Git/GitHub", level: 88, icon: "📚" },
      { name: "VS Code", level: 90, icon: "💙" },
      { name: "Figma", level: 72, icon: "🎨" },
      { name: "Postman", level: 80, icon: "📮" },
    ],
  };

  const skillCategories = [
    { key: "languages", label: "Languages", icon: <Code /> },
    { key: "development", label: "Development", icon: <Globe /> },
    { key: "dataStructures", label: "Data Structures", icon: <Database /> },
    // { key: "technologies", label: "Technologies", icon: <Tool /> },
    { key: "others", label: "Others", icon: <Tool /> },
  ];

  const projects = [
    {
      title: "Amazon Homepage clone",
      description:
        "A front-end e-commerce platform built with HTML and CSS, replicating the Amazon homepage layout",
      image: "https://via.placeholder.com/300x200",
      technologies: ["HTML", "CSS"],
    },
    {
      title: "Plan Wisely - Task Scheduler",
      description: "A productivity app for managing daily tasks and projects",
      image: "https://via.placeholder.com/300x200",
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "#",
      live: "#",
    },
    {
      title: "E-Commerce Management System using OOP",
      description: "E-Commerce Management System using OOP",
      image: "https://via.placeholder.com/300x200",
      technologies: ["C++", "OOP"],
      github: "#",
      live: "#",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Message sent! (This is a demo)");
  };

//   const handleResumeDownload = () => {
//     // In a real application, you would have an actual PDF file
//     // For demo purposes, we'll just show an alert
//     alert(
//       "Resume download started! (This is a demo - add your actual resume file)"
//     );

//     // Example of how to download a file:
//     // const link = document.createElement('a');
//     // link.href = '/path/to/your/resume.pdf';
//     // link.download = 'John_Developer_Resume.pdf';
//     // link.click();
//   };

    const handleResumeDownload = () => {
  const resumeUrl = 'https://drive.google.com/file/d/14GmoUg77OzICiVGtvpqOzYVarpr9t_j7/view';
  window.open(resumeUrl, '_blank');
};
  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">Portfolio</div>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              {["home", "about", "skills", "resume", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`nav-link ${
                      activeSection === item ? "active" : ""
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mobile-nav">
              {["home", "about", "skills", "resume", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="mobile-nav-link"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Nisarg Dadhania</h1>
          <p className="hero-subtitle">Full Stack Web Developer</p>
          <p className="hero-description">
            Passionate about creating beautiful and functional web applications
            that solve real-world problems.
          </p>
          <div className="social-links">
            <a href="https://github.com/dadhanianisarg" className="social-link">
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/nisarg-dadhania-9a992b314/"
              className="social-link"
            >
              <Linkedin />
            </a>
            <a href="mailto:nisargdadhania04@gmail.com" className="social-link">
              <Mail />
            </a>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="scroll-btn"
          >
            <ChevronDown />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          {/* <div className="about-content"> */}
            <div className="about-text">
              <p className="about-paragraph">
                A highly motivated 3rd-year Computer Science Engineering student
                with a strong foundation in programming and problem-solving.
                Passionate about learning new technologies and applying
                theoretical knowledge to real-world applications. Seeking
                opportunities to enhance skills and contribute to innovative
                projects.
              </p>
              <p className="about-paragraph">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open source projects, or enjoying a good cup of
                coffee while reading tech blogs.
              </p>
              {/* <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
              </div> */}
            </div>
            {/* <div className="about-image">
              <img
                src="https://via.placeholder.com/400x400"
                alt="Workspace"
                className="workspace-image"
              />
            </div> */}
          {/* </div> */}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title">Skills & Expertise</h2>

          {/* Skill Categories */}
          <div className="skill-categories">
            {skillCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveSkillCategory(category.key)}
                className={`category-btn ${
                  activeSkillCategory === category.key ? "active" : ""
                }`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="skills-container">
            <div className="skills-grid">
              {skillsData[activeSkillCategory].map((skill, index) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="resume-section">
        <div className="container">
          <div className="resume-content">
            <div className="resume-text">
              <h2 className="resume-title">Download My Resume</h2>
              <p className="resume-description">
                Get a detailed overview of my experience, education, and skills.
                My resume includes information about my professional background,
                technical expertise, and notable projects.
              </p>
              <div className="resume-highlights">
                {/* <div className="highlight-item">
                  <span className="highlight-icon">🎓</span>
                  <span>Computer Science Degree</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <span>3+ Years Experience</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏆</span>
                  <span>15+ Completed Projects</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🚀</span>
                  <span>Full Stack Developer</span>
                </div> */}
              </div>
            </div>
            <div className="resume-download">
              <div className="resume-preview">
                <div className="resume-mockup">
                  <div className="resume-header"></div>
                  <div className="resume-lines">
                    <div className="resume-line long"></div>
                    <div className="resume-line medium"></div>
                    <div className="resume-line short"></div>
                    <div className="resume-line long"></div>
                    <div className="resume-line medium"></div>
                  </div>
                </div>
              </div>
              <button onClick={handleResumeDownload} className="download-btn">
                <Download />
                <span>Download Resume</span>
              </button>
              <p className="download-note">
                PDF • 245 KB • Last updated: Dec 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                {/* <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="project-image"
                /> */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* <div className="project-links"> */}
                    {/* <a href={project.github} className="project-link"> */}
                      {/* <Github /> Code */}
                    {/* </a>     */}
                    {/* <a href={project.live} className="project-link"> */}
                      {/* <ExternalLink /> Live Demo */}
                    {/* </a> */}
                  {/* </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          {/* <div className="contact-content"> */}
            <div className="contact-info">
              <h3 className="contact-title">Let's work together</h3>
              <p className="contact-description">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <Mail /> nisargdadhania04@gmail.com
                </div>
                <div className="contact-item">
                  <Github /> github.com/dadhanianisarg
                </div>
                <div className="contact-item">
                  <Linkedin /> linkedin.com/in/nisarg-dadhania-9a992b314
                </div>
              </div>
            </div>
            {/* <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="form-input"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form> */}
          {/* </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © 2024 Nisarg Dadhania. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
