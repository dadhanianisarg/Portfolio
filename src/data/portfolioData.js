export const portfolioData = {
  personal: {
    name: "Nisarg Dadhania",
    title: "Software Engineer",
    subtitle: "AI Research | Backend Systems | Full Stack Development",
    email: "nisargdadhania04@gmail.com",
    phone: "9714270666",
    github: "https://github.com/dadhanianisarg",
    linkedin: "https://www.linkedin.com/in/nisarg-dadhania-9a992b314/",
    leetcode: "https://leetcode.com/u/nisargdadhania/",
    location: "Vellore, Tamil Nadu",
    resumeUrl: "https://drive.google.com/drive/folders/1AWF13H5SabSskh970XApLr_Vt1PcrMLV?usp=drive_link",
    tagline: "Building scalable backend systems, AI-powered applications, and full-stack web platforms.",
    bio: "Computer Science student at VIT with a strong focus on high-throughput backend engineering, distributed databases, automated cloud DevOps pipelines, and AI search systems. Proven experience in designing robust RESTful APIs, orchestrating container workflows, and researching multimodal AI retrieval modules.",
    education: [
      {
        institution: "Vellore Institute of Technology",
        degree: "B.Tech in Computer Science and Engineering",
        period: "August 2023 – Present",
        location: "Vellore, Tamil Nadu",
        grade: "CGPA: 9.51"
      },
      {
        institution: "Shri C. C. Shah Sarvajanik English High School",
        degree: "GSEB Class 12th",
        period: "June 2022 – May 2023",
        location: "Surat, Gujarat",
        grade: "Percentage: 80.15%"
      },
      {
        institution: "Shri C. C. Shah Sarvajanik English High School",
        degree: "GSEB Class 10th",
        period: "June 2020 – May 2021",
        location: "Surat, Gujarat",
        grade: "Percentage: 85.33%"
      }
    ]
  },
  
  skills: [
    { name: "C++", category: "Programming Languages", level: "Experienced" },
    { name: "C", category: "Programming Languages", level: "Experienced" },
    { name: "Java", category: "Programming Languages", level: "Experienced" },
    { name: "Python", category: "Programming Languages", level: "Experienced" },
    
    { name: "React.js", category: "Frontend Development", level: "Experienced" },
    { name: "Tailwind CSS", category: "Frontend Development", level: "Experienced" },
    { name: "JavaScript", category: "Frontend Development", level: "Experienced" },
    { name: "HTML & CSS", category: "Frontend Development", level: "Experienced" },
    
    { name: "Node.js", category: "Backend & Systems", level: "Experienced" },
    { name: "Express.js", category: "Backend & Systems", level: "Experienced" },
    { name: "MongoDB", category: "Backend & Systems", level: "Experienced" },
    
    { name: "Git & GitHub", category: "DevOps & Cloud", level: "Experienced" },
    { name: "Postman", category: "DevOps & Cloud", level: "Experienced" },
    { name: "AWS", category: "DevOps & Cloud", level: "Comfortable" },
    { name: "Docker", category: "DevOps & Cloud", level: "Experienced" },
    { name: "Kubernetes", category: "DevOps & Cloud", level: "Comfortable" }
  ],

  experience: [
    {
      company: "Samsung PRISM Program",
      role: "AI Research Intern",
      period: "Jun 2026 – Present",
      location: "Remote / Samsung R&D Institute",
      highlights: [
        "Developing a multimodal AI retrieval pipeline supporting image, text, audio, and video data.",
        "Building backend pipelines for automated summarization, metadata generation, and semantic search.",
        "Implementing vector embeddings and retrieval workflows for scalable enterprise search systems."
      ],
      description: "Collaborated under direct guidance from Samsung Research India scientists on next-generation search frameworks. Researched and structured high-dimensional vector database indexations and metadata extraction pipelines. Built automated summarizers using Transformers, enabling unified multimodal search across heterogeneous enterprise assets."
    },
    {
      company: "Ciphernutz IT Services",
      role: "Software Development Intern",
      period: "May 2026 – Jul 2026",
      location: "Surat, Gujarat",
      highlights: [
        "Developed backend APIs using Node.js, Express.js, and MongoDB for client web applications.",
        "Implemented client-requested features and integrated REST APIs with frontend modules.",
        "Assisted in deploying backend services on AWS and configuring application environments."
      ],
      description: "Successfully delivered key backend modules for scale-focused client portals using Express and MongoDB. Configured secure server routing paths and API endpoints, documented payloads in Postman, and managed deployments onto AWS EC2 instances with proxy configurations."
    },
    {
      company: "Orail Services (OptigoApps)",
      role: "Frontend Intern",
      period: "May 2025 – June 2025",
      location: "Surat, Gujarat",
      highlights: [
        "Developed frontend enhancements for a cloud-based Jewellery ERP platform using React.js, JavaScript, and Tailwind CSS.",
        "Implemented client-requested UI features and bug fixes across multiple ERP modules while maintaining code consistency.",
        "Connected frontend components with REST APIs and assisted in integrating backend responses for dynamic data rendering."
      ],
      description: "Contributed to the core UI layout of OptigoApps' ERP platforms. Streamlined dashboard panels, validated data entry forms, managed API responses inside React state objects, and improved load performance by refactoring stylesheet overrides."
    }
  ],

  projects: [
    {
      id: "coursecraft",
      title: "CourseCraft",
      subtitle: "Online Learning Platform",
      description: "A full-stack Ed-Tech platform supporting student and instructor roles, enabling course creation, enrollment, content consumption, and rating through a responsive React.js interface.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Razorpay", "Cloudinary"],
      github: "https://github.com/dadhanianisarg/CourseCraft",
      demo: "https://course-craft-frontend-xi.vercel.app/",
      features: [
        "Built a full-stack Ed-Tech platform supporting student and instructor roles, enabling course creation, enrollment, content consumption, and rating through a responsive React.js interface.",
        "Developed a secure backend using Node.js and Express.js with JWT authentication, OTP-based email verification, password recovery, and role-based access control.",
        "Designed RESTful APIs and MongoDB schemas for users and courses; integrated Razorpay for payments and Cloudinary for cloud-based media management to ensure scalable content delivery."
      ],
      challenges: {
        problem: "Securing student/instructor boundaries, handling concurrent enrollments, and integrating third-party payment checkouts without transaction discrepancies.",
        resolution: "Developed cookie-based JWT authentications with verification gates. Integrated MongoDB transactions inside Express APIs to guarantee payment state synchronization with user access logs."
      },
      architecture: {
        nodes: [
          { id: "react", label: "React UI", x: 10, y: 50, desc: "Handles frontend UI and user state." },
          { id: "express", label: "Express API", x: 45, y: 50, desc: "API routing, validation, JWT auth." },
          { id: "mongo", label: "MongoDB", x: 80, y: 80, desc: "Saves courses, auth hashes, enrollment maps." },
          { id: "cloud", label: "Razorpay/Cloudinary", x: 80, y: 20, desc: "Handles payment triggers & media assets." }
        ],
        connections: [
          { from: "react", to: "express", label: "HTTPS / JSON" },
          { from: "express", to: "mongo", label: "Mongoose Query" },
          { from: "express", to: "cloud", label: "REST SDK Webhook" }
        ]
      },
      contribution: "Built the secure JWT gateway, formulated MongoDB schemas with relational validation, integrated Cloudinary file uploads, and developed the course enrollment UI flow.",
      futureImprovements: [
        "Incorporate live video conferencing for lecture streams.",
        "Add automated student progress reports and completion certificates."
      ]
    },
    {
      id: "devops-pipeline",
      title: "Corporate CI/CD DevOps Pipeline",
      subtitle: "Automated GitOps Infrastructure",
      description: "Designed and implemented an end-to-end CI/CD pipeline using Jenkins Declarative Pipeline, automating build, testing, SonarQube analysis, Trivy scanning, Nexus publishing, Docker image creation, and Kubernetes deployment.",
      techStack: ["Jenkins", "Docker", "Kubernetes", "SonarQube", "Nexus", "Prometheus", "Grafana", "Trivy"],
      github: "https://github.com/dadhanianisarg",
      demo: "",
      features: [
        "Designed and implemented an end-to-end CI/CD pipeline using Jenkins Declarative Pipeline, automating build, testing, SonarQube analysis, Trivy scanning, Nexus publishing, Docker image creation, and Kubernetes deployment.",
        "Provisioned and configured a secure Kubernetes cluster using kubeadm with Master/Worker nodes, implemented RBAC and Jenkins-to-Kubernetes authentication, containerized SonarQube and Nexus, and enforced credential-based secure deployments.",
        "Integrated monitoring and alerting using Prometheus, Node Exporter, Blackbox Exporter, and Grafana dashboards to track application and system metrics, along with automated email notifications for pipeline status and deployment events."
      ],
      challenges: {
        problem: "Synchronizing master/worker nodes securely, passing tokens across Jenkins to K8s without leaks, and monitoring internal services efficiently.",
        resolution: "Set up role-based access control (RBAC) rules. Deployed Blackbox and Node Exporters inside K8s pods to push telemetry metrics to Prometheus server panels."
      },
      architecture: {
        nodes: [
          { id: "git", label: "Git Commit", x: 5, y: 50, desc: "Trigger pipeline on merge." },
          { id: "jenkins", label: "Jenkins Master", x: 30, y: 50, desc: "Builds, scans, and triggers K8s manifest." },
          { id: "sonar", label: "SonarQube & Trivy", x: 55, y: 20, desc: "Static security check." },
          { id: "nexus", label: "Nexus Registry", x: 55, y: 80, desc: "Publishes built artifacts." },
          { id: "k8s", label: "Kubeadm Cluster", x: 85, y: 50, desc: "Deploys to master/worker nodes." }
        ],
        connections: [
          { from: "git", to: "jenkins", label: "Webhook Trigger" },
          { from: "jenkins", to: "sonar", label: "SAST Scan" },
          { from: "jenkins", to: "nexus", label: "Push Registry" },
          { from: "jenkins", to: "k8s", label: "Kubectl Deploy" }
        ]
      },
      contribution: "Provisioned the Kubeadm cluster, configured RBAC access tokens, and compiled the declarative Jenkinsfile pipeline script covering static audits and metric collection dashboards.",
      futureImprovements: [
        "Transition cluster deployments to GitOps using ArgoCD sync rules.",
        "Implement automated rolling updates with zero downtime."
      ]
    },
    {
      id: "coordina",
      title: "Coordina",
      subtitle: "Project Management System",
      description: "Architected a multi-tenant backend using Node.js, Express.js, and MongoDB, implementing Google OAuth and email/password authentication with secure cookie-based session handling.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Google OAuth", "Socket.io"],
      github: "https://github.com/dadhanianisarg/Team-Management-Portal",
      demo: "https://team-management-portal-three.vercel.app/",
      features: [
        "Architected a multi-tenant backend using Node.js, Express.js, and MongoDB, implementing Google OAuth and email/password authentication with secure cookie-based session handling.",
        "Designed and implemented role-based access control (Owner, Admin, Member), workspace isolation, member invitations, and analytics endpoints for team-level insights.",
        "Built RESTful APIs for projects, epics, and tasks with full CRUD operations, advanced filtering, pagination, and MongoDB transactions with seeded data to ensure data consistency and reliability."
      ],
      challenges: {
        problem: "Managing workspace isolation boundaries and avoiding multi-document consistency conflicts when updating sprint backlogs.",
        resolution: "Created structured role schemas and isolated member queries. Implemented MongoDB database sessions to enforce transactions across epics and tasks."
      },
      architecture: {
        nodes: [
          { id: "react", label: "React Portal", x: 10, y: 50, desc: "Workspace charts and boards." },
          { id: "express", label: "Express Server", x: 45, y: 50, desc: "API endpoints, session routers." },
          { id: "mongo", label: "MongoDB Atlas", x: 80, y: 80, desc: "Stores projects, tasks, user documents." },
          { id: "oauth", label: "Google OAuth API", x: 80, y: 20, desc: "Third-party sign-in verification." }
        ],
        connections: [
          { from: "react", to: "express", label: "HTTP Cookies" },
          { from: "express", to: "mongo", label: "Transactions" },
          { from: "express", to: "oauth", label: "Verification" }
        ]
      },
      contribution: "Designed and implemented the multi-tenant database hierarchy, managed Google OAuth routers, and configured transactional mongo gates to ensure ACID data properties.",
      futureImprovements: [
        "Incorporate real-time Slack/Discord status webhooks.",
        "Add interactive Gantt charts and Sprint burndown graphs."
      ]
    }
  ],

  dsa: {
    solvedCount: 900,
    leetcodeCount: 600,
    peakRating: 1837,
    contestRank: "Top 4.5%",
    badge: "Knight (LeetCode)",
    leetcodeUrl: "https://leetcode.com/u/nisargdadhania/",
    platforms: [
      { name: "LeetCode", solved: 600, rating: "1837 Peak", icon: "leetcode" },
      { name: "Codeforces", solved: 180, rating: "Specialist (1410)", icon: "codeforces" },
      { name: "GeeksforGeeks", solved: 120, rating: "Expert", icon: "gfg" }
    ]
  },

  achievements: [
    {
      title: "Branch Topper",
      subtitle: "B.Tech CSE Year 1",
      description: "Achieved the distinction of being the branch topper in the 1st year of B.Tech in Computer Science and Engineering at VIT.",
      icon: "Award"
    },
    {
      title: "LeetCode Knight Badge",
      subtitle: "Peak Rating: 1837",
      description: "Ranked in the top 2,500 globally in weekly LeetCode contests among over 30,000 active participants.",
      icon: "Code2"
    },
    {
      title: "900+ DSA Solutions",
      subtitle: "Algorithmic Problems Solved",
      description: "Successfully solved over 900 programming problems across LeetCode (600+ questions), Codeforces, and GeeksforGeeks.",
      icon: "Trophy"
    },
    {
      title: "Samsung PRISM Excellence",
      subtitle: "AI Multimodal Research Recognition",
      description: "Acknowledged for building highly optimized vector search structures and automated summarization indices under direct research guidance.",
      icon: "Cpu"
    }
  ]
};
