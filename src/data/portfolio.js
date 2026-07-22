/*
 * Portfolio Data — Single source of truth for all content.
 * Extracted from Prasanna Godiyal's resume.
 */

export const personalInfo = {
  name: "Prasanna Godiyal",
  firstName: "Prasanna",
  lastName: "Godiyal",
  initials: "PG",
  title: "Full-Stack Developer",
  tagline: "Building scalable web applications with modern stacks — from real-time systems to ML-powered platforms.",
  email: "godiyalprasanna16@gmail.com",
  phone: "+91-8595475736",
  location: "New Delhi, India",
  github: "https://github.com/PrasannaGodiyal3903",
  linkedin: "https://linkedin.com/in/prasanna-godiyal",
  leetcode: "https://leetcode.com/prasannagodiyal",
  resumePath: "/resume.pdf",
};

export const aboutMe = {
  paragraphs: [
    "I'm a Computer Science undergraduate at Jaypee Institute of Information Technology, passionate about building full-stack web applications that solve real problems. My work spans the entire stack — from crafting responsive React interfaces to engineering robust Node.js backends with real-time capabilities.",
    "I'm particularly drawn to backend development, generative AI, and AI-assisted software engineering. Whether it's implementing live driver tracking with Socket.io, building ML-powered prediction platforms, or automating CI/CD pipelines, I enjoy turning complex ideas into clean, production-ready code.",
  ],
};

export const skills = {
  "Languages": [
    "C", "C++", "Python", "JavaScript", "SQL",
  ],
  "Frontend": [
    "React.js", "Tailwind CSS", "DaisyUI", "HTML5", "CSS3", "Axios",
  ],
  "Backend": [
    "Node.js", "Express.js", "Flask", "REST APIs", "JWT",
  ],
  "Databases & Caching": [
    "MongoDB", "Redis", "PostgreSQL",
  ],
  "DevOps & Tools": [
    "Git", "GitHub", "Postman", "Docker", "CI/CD", "Vercel", "AWS",
  ],
  "ML / AI": [
    "Scikit-learn", "Gradient Boosting", "Ensemble Learning", "GPT-2", "HuggingFace",
  ],
};

export const projects = [
  
  {
    title: "InsightFlow AI — AI-Powered Business Intelligence Platform",
    description: "AI-Powered Business Intelligence Dashboard — Upload CSV data and ask questions in natural language.",
    longDescription: "InsightFlow AI is a full-stack Business Intelligence application that lets users upload CSV datasets and ask questions about their data using natural language. The AI analyzes the data, generates visualizations, and provides actionable business insights.",
    techStack: ["Python", "FastAPI", "React", "TypeScript", "LangGraph", "Google Gemini"],
    github: "https://github.com/PrasannaGodiyal3903/InsightFlow-AI",
    live: "https://insight-flow-ai-five.vercel.app/",
    featured: true,
    color: "#64ffda",
  },
  {
    title: "Thinkboard",
    description: "Production-ready full-stack note-taking application with rate-limited APIs, Redis caching, and JWT authentication.",
    longDescription: "A CRUD application engineered with MongoDB, Express.js, React, and Node.js featuring JWT-based authentication and RESTful API design. Integrated Upstash Redis rate limiting supporting up to 100 req/min per user, a component-based UI with Tailwind CSS and DaisyUI, and automated CI/CD deployment on Render with zero-downtime releases.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Redis", "JWT", "Tailwind CSS", "CI/CD"],
    github: "https://github.com/PrasannaGodiyal3903/mern-notetakingapp",
    live: "https://mern-notetakingapp-xpv6.onrender.com/",
    featured: true,
    color: "#c9f31d",
  },
  {
    title: "AirIQ",
    description: "ML-powered AQI prediction platform achieving 97% R² accuracy with real-time forecasting dashboard and interactive visualizations.",
    longDescription: "Trained and evaluated multiple supervised ML models, achieving 97% R² accuracy using Gradient Boosting Regressor on real environmental data. Built a hybrid ensemble learning pipeline to improve predictive stability, and developed Flask REST APIs for low-latency real-time AQI inference with an interactive analytics dashboard.",
    techStack: ["Python", "Flask", "Scikit-learn", "Gradient Boosting", "REST APIs"],
    github: "https://github.com/PrasannaGodiyal3903/AirIQ--Air-Quality-Analysis-and-Prediction-Platform",
    live: "",
    featured: true,
    color: "#ff6b6b",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Jaypee Institute of Information Technology, Noida",
    duration: "2023 – 2027 (Expected)",
    details: "CGPA: 7.59 | Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks",
  },
  {
    degree: "CBSE Class XII",
    field: "Science",
    institution: "Vikas Bharati Public School, Delhi",
    duration: "2022",
    details: "Score: 92%",
  },
  {
    degree: "CBSE Class X",
    field: "",
    institution: "Vikas Bharati Public School, Delhi",
    duration: "2020",
    details: "Score: 88%",
  },
];

export const experience = [
  {
    role: "Student Coordinator",
    organization: "Training & Placement Cell — JIIT Noida",
    duration: "2026 – Present",
    description: "Managing scheduling and communication for placement activities and student engagement events. Organizing technical workshops to improve student placement readiness.",
  },
];

export const certifications = [
  "JPMorgan Chase & Co. Software Engineering Virtual Experience Program — Forage",
  "HackerRank SQL (Basic) Certification",
  "The Complete Full-Stack Web Development Bootcamp — Udemy",
];

export const achievements = [
  {
    title: "350+ DSA Problems Solved",
    description: "Solved 350+ problems across arrays, graphs, dynamic programming, and trees on LeetCode, GeeksforGeeks, and CodeChef. Regular participant in competitive coding contests.",
  },
];

export const codingProfiles = [
  { name: "LeetCode", url: "https://leetcode.com/prasannagodiyal", handle: "prasannagodiyal" },
  { name: "CodeChef", url: "https://codechef.com/users/prasannagodiyal", handle: "prasannagodiyal" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf", external: true },
];
