import { portfolioData } from '../data/portfolioData';

export const printResume = () => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Pop-up blocked. Please allow pop-ups to view the resume.");
    return;
  }

  // Format Education HTML
  const educationHtml = portfolioData.personal.education.map(edu => `
    <div class="resume-item">
      <div class="resume-header">
        <strong>${edu.institution}</strong>
        <span class="right">${edu.period}</span>
      </div>
      <p class="resume-subtitle">${edu.degree} | <em>${edu.location}</em></p>
      <p class="resume-grade">${edu.grade}</p>
    </div>
  `).join('');

  // Format Experience HTML
  const experienceHtml = portfolioData.experience.map(exp => `
    <div class="resume-item">
      <div class="resume-header">
        <strong>${exp.role}</strong>
        <span class="right">${exp.period}</span>
      </div>
      <p class="resume-subtitle">${exp.company} | <em>${exp.location}</em></p>
      <ul>
        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Format Projects HTML
  const projectsHtml = portfolioData.projects.map(proj => `
    <div class="resume-item">
      <div class="resume-header">
        <strong>${proj.title}</strong>
        <span class="right">${proj.techStack.slice(0, 4).join(', ')}</span>
      </div>
      <p class="resume-subtitle">${proj.subtitle}</p>
      <ul>
        ${proj.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Format Skills HTML grouped by category
  const skillsCategories = {};
  portfolioData.skills.forEach(s => {
    if (!skillsCategories[s.category]) {
      skillsCategories[s.category] = [];
    }
    skillsCategories[s.category].push(s.name);
  });

  const skillsHtml = Object.entries(skillsCategories).map(([cat, list]) => `
    <p><strong>${cat}:</strong> ${list.join(', ')}</p>
  `).join('');

  // Write content to new print tab
  printWindow.document.write(`
    <html>
      <head>
        <title>${portfolioData.personal.name} - Resume</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            padding: 40px;
            font-size: 11px;
            line-height: 1.45;
            color: #111827;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            text-align: center;
            margin-bottom: 4px;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.03em;
            text-transform: uppercase;
          }
          .contact-bar {
            text-align: center;
            margin-bottom: 25px;
            font-size: 10px;
            color: #4b5563;
          }
          .contact-bar a {
            color: #4b5563;
            text-decoration: none;
          }
          .section-title {
            font-weight: bold;
            border-bottom: 1.5px solid #111827;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding-bottom: 2px;
          }
          .resume-item {
            margin-bottom: 12px;
          }
          .resume-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-bottom: 2px;
            font-size: 11px;
          }
          .resume-subtitle {
            margin: 0 0 4px 0;
            font-size: 10px;
            color: #374151;
          }
          .resume-grade {
            margin: 0;
            font-size: 10px;
            font-weight: 600;
            color: #111827;
          }
          .resume-header .right {
            font-weight: normal;
            font-size: 10px;
            font-style: italic;
            color: #4b5563;
          }
          ul {
            margin-top: 3px;
            margin-bottom: 0px;
            padding-left: 18px;
          }
          li {
            margin-bottom: 3.5px;
            font-size: 10px;
            color: #374151;
          }
          p {
            margin: 3px 0;
          }
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <h1>${portfolioData.personal.name}</h1>
        <div class="contact-bar">
          ${portfolioData.personal.location} | Phone: ${portfolioData.personal.phone} | 
          Email: <a href="mailto:${portfolioData.personal.email}">${portfolioData.personal.email}</a> <br />
          GitHub: <a href="${portfolioData.personal.github}" target="_blank">github.com/dadhanianisarg</a> | 
          LinkedIn: <a href="${portfolioData.personal.linkedin}" target="_blank">linkedin.com/in/nisarg-dadhania</a> | 
          LeetCode: <a href="${portfolioData.personal.leetcode}" target="_blank">leetcode.com/u/nisargdadhania</a>
        </div>

        <div class="section-title">Education</div>
        ${educationHtml}

        <div class="section-title">Experience</div>
        ${experienceHtml}

        <div class="section-title">Projects</div>
        ${projectsHtml}

        <div class="section-title">Technical Skills</div>
        ${skillsHtml}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
};
