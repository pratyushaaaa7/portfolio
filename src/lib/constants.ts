export const SITE = {
  name: "Pratyusha",
  title: "Full Stack Developer",
  email: "pratyushaaaa7@gmail.com",
  phone: "+91 6284208955",
  github: "https://github.com/pratyushaaaa7",
  linkedin: "https://www.linkedin.com/in/pratyusha-mishra",
  resumePath: "/resume.pdf",
} as const;

/** Public GitHub username for contribution graph — override via NEXT_PUBLIC_GITHUB_USERNAME */
export const GITHUB_USERNAME = "pratyushaaaa7" as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "activity", label: "Activity" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const GLOBAL_BADGES = [
  "Push Notifications Enabled",
  "Real-Time System",
  "Cross-Platform Compatible",
  "Production Deployed",
  "Enterprise Grade",
  "Cloud Hosted",
  "Dockerized Infrastructure",
  "Responsive Architecture",
] as const;

export const HERO_ROLES = [
  "MERN Stack Developer",
  "React Native Developer",
  "Full Stack Engineer",
  "DevOps Enthusiast",
  "TypeScript Developer",
] as const;

export const HERO_TECH_BADGES = [
  "React",
  "Node.js",
  "TypeScript",
  "Docker",
  "MongoDB",
  "Next.js",
  "React Native",
] as const;

export const STATS = [
  { label: "Years of experience", value: "2+", hint: "Shipping production software" },
  { label: "Applications developed", value: "5+", hint: "Both iOS and Android" },
  { label: "Technologies", value: "35+", hint: "Across the full stack" },
  { label: "Websites shipped", value: "5+", hint: "Across different Tech Stacks" },
] as const;

export const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    accent: "from-indigo-500/30 to-indigo-600/20",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 94 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Redux", level: 88 },
      { name: "Context API", level: 90 },
      { name: "Expo", level: 87 },
      { name: "Bootstrap", level: 85 },
      { name: "MUI", level: 86 },
    ],
  },
  {
    title: "Backend",
    accent: "from-indigo-500/30 to-indigo-600/20",
    items: [
      { name: "Node.js", level: 93 },
      { name: "Express.js", level: 92 },
      { name: "REST APIs", level: 94 },
      { name: "JWT", level: 91 },
      { name: "Passport.js", level: 86 },
    ],
  },
  {
    title: "Databases",
    accent: "from-indigo-500/30 to-indigo-600/20",
    items: [
      { name: "MongoDB", level: 92 },
      { name: "Firebase", level: 88 },
      { name: "MySQL", level: 84 },
      { name: "S3 Storage", level: 87 },
    ],
  },
  {
    title: "DevOps & Deployment",
    accent: "from-indigo-500/30 to-indigo-600/20",
    items: [
      { name: "Docker", level: 90 },
      { name: "Nginx", level: 88 },
      { name: "PM2", level: 89 },
      { name: "CI/CD", level: 87 },
      { name: "VPS", level: 91 },
      { name: "AWS", level: 84 },
      { name: "SSL/TLS", level: 90 },
      { name: "Linux", level: 88 },
      { name: "Cron Jobs", level: 85 },
      { name: "SSH", level: 90 },
    ],
  },
  {
    title: "Tools",
    accent: "from-indigo-500/30 to-indigo-600/20",
    items: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 93 },
      { name: "Postman", level: 90 },
      { name: "Figma", level: 82 },
      { name: "npm", level: 91 },
    ],
  },
] as const;

export const EXPERIENCE = [
  {
    company: "WAL+L",
    role: "Software Development Engineer",
    duration: "July 2025 – Present",
    highlights: [
      "Built a full MERN-stack product management application",
      "Developed secure REST APIs with JWT authentication",
      "Implemented role-based access control",
      "Improved workflow efficiency by 30%",
      "Improved API performance by 25%",
      "Managed VPS deployment using Docker, Nginx, PM2",
      "Configured SSL, firewall, backups, and monitoring",
    ],
  },
  {
    company: "Hobit Technologies",
    role: "Software Development Engineer",
    duration: "Jan 2025 – Jun 2025",
    highlights: [
      "Worked on React Native and React products",
      "Built 40+ modular components",
      "Integrated push notifications and Razorpay",
      "Developed dashboards and booking systems",
      "Improved productivity and onboarding systems",
    ],
  },
] as const;

export type ProjectFilter = "all" | "mobile" | "web" | "fullstack";

export const PROJECTS = [
  {
    slug: "workflo-mobile",
    title: "WorkFlo Application",
    subtitle: "Enterprise project management — mobile",
    category: "mobile" as const,
    featured: true,
    description:
      "A large-scale enterprise-grade project management and workflow automation mobile application developed for real-world organizational usage.",
    features: [
      "Real-time dashboards",
      "Role-based authentication and authorization",
      "Dynamic forms and modules",
      "Issue tracking system",
      "MOM (Minutes of Meeting) management",
      "ILR management",
      "Push notification system",
      "Real-time updates",
      "Secure JWT authentication",
      "Cloud/VPS deployment",
      "Scalable backend architecture",
      "Cross-platform mobile support",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
      "Nginx",
      "PM2",
      "JWT Authentication",
      "Firebase Notifications",
      "VPS Deployment",
    ],
    architecture:
      "Containerized services behind Nginx, PM2 process orchestration, MongoDB replica-ready schemas, JWT-secured APIs, Firebase Cloud Messaging for push delivery, and observability-friendly VPS hardening.",
    highlights: [
      "Production-grade enterprise application",
      "Supports 75+ users",
      "Push notification compatibility",
      "Optimized for Android and iOS",
      "Real-time workflow automation",
      "Docker + VPS production deployment",
      "Scalable modular architecture",
    ],
    github: "https://github.com/pratyushaaaa7/WorkFlo",
    live: "https://example.com/",
    galleryLabels: [
      "Dashboard",
      "Dynamic forms",
      "Reports",
      "Notifications",
      "Authentication",
      "Admin modules",
    ],
    mockup: "phone" as const,
  },
  {
    slug: "staynest",
    title: "StayNest Website",
    subtitle: "Property rental & booking platform",
    category: "web" as const,
    featured: false,
    description:
      "A modern property rental and booking platform with secure authentication, responsive UX, and a hardened backend integration layer.",
    features: [
      "Property listing system",
      "Booking workflows",
      "User authentication",
      "Role-based access",
      "REST API integration",
      "Responsive UI",
      "Secure backend architecture",
    ],
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    architecture:
      "MVC-oriented Express API with MongoDB models, Bootstrap-driven responsive views, and JWT-ready session patterns for scalable rental operations.",
    highlights: [
      "End-to-end rental flows",
      "Responsive property browsing",
      "Secure REST integrations",
      "Production-minded error handling",
    ],
    github: "https://github.com/",
    live: "https://example.com/",
    galleryLabels: ["Listings", "Property details", "Booking", "Responsive layouts"],
    mockup: "desktop" as const,
  },
  {
    slug: "workflo-web",
    title: "WorkFlo Website",
    subtitle: "Enterprise workflows — web platform",
    category: "fullstack" as const,
    featured: false,
    description:
      "A modern responsive web platform for the WorkFlo ecosystem, tuned for desktop and enterprise workflows with modular, API-driven architecture.",
    features: [
      "Responsive admin dashboards",
      "Real-time modules",
      "Project management workflows",
      "Authentication system",
      "Role-based access control",
      "Report management",
      "Dynamic UI modules",
      "Push notification compatible architecture",
      "API-driven scalable backend",
      "Cloud deployment infrastructure",
    ],
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
      "Nginx",
      "PM2",
    ],
    architecture:
      "Modular Next.js frontend with secure session handling, Express services, MongoDB persistence, Dockerized runtime, Nginx reverse proxy, and PM2-managed Node processes for resilient production traffic.",
    highlights: [
      "Fully responsive web application",
      "Enterprise-grade architecture",
      "Push notification compatible design",
      "Production-ready deployment pipeline",
      "Scalable modular frontend",
      "Secure authentication system",
    ],
    github: "https://github.com/",
    live: "https://example.com/",
    status: "Work in progress",
    galleryLabels: ["Dashboard", "Analytics", "Forms", "Admin panels", "Reports", "RBAC"],
    mockup: "desktop" as const,
  },
] as const;

export const STRENGTHS = [
  "Full Stack Development",
  "Mobile App Development",
  "Responsive UI/UX",
  "DevOps & Deployment",
  "API Architecture",
  "Cloud Deployment",
  "Real-Time Systems",
  "Push Notification Systems",
  "Enterprise Applications",
  "Scalable Backend Systems",
] as const;
