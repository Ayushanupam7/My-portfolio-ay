// ==============================
// 🧑‍💻 Personal Info
// ==============================
export const personalInfo = {
  name: "Ayush Anupam",
  tagline: "Frontend Developer | UX Designer | Innovator",
  education: "B.Tech in AI & ML",
  school10th: "Indian Public School, Hajipur",
  school12th: "R.B.S College, Hajipur",
  college: "G H Raisoni College of Engineering and Management",
  percentage10th: "80%",
  percentage12th: "66%",
  cgpa: "8.65 (Till 2nd Year)",
  year10th: "2020",
  year12th: "2022",
  graduationYear: "2026",
  goal:
    "To become a skilled Frontend / Full-Stack Developer with strong design & UX skills, creating impactful digital experiences.",
  email: "ayushanupamofficial7@gmail.com",
  phone: "+91-XXXXXXXXXX",
  location: "Pune, Maharashtra",
  linkedin: "https://www.linkedin.com/in/ayush-anupam-shrivastava/",
  github: "https://github.com/Ayushanupam7",
  instagram: "https://www.instagram.com/_ayushanupam_7/#",
  twitter: "https://x.com/Ayushanupam77",
  portfolio: "https://ayushanupam.vercel.app",
  resume: "./assets/Resume.pdf",
  profileImage: "/assets/profile.jpeg",
  about:
    "Passionate frontend developer with a strong foundation in modern web technologies. I love creating beautiful, responsive, and user-friendly applications. Currently exploring full-stack development while deepening my expertise in React and TypeScript.",
};

// ==============================
// 🛠 Skills
// ==============================
export const skills = {
  languages: ["Java", "C++", "JavaScript", "TypeScript", "Python"],
  frontend: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Next.js"],
  backend: ["Node.js", "Express.js", "REST APIs"],
  database: ["PostgreSQL", "MongoDB", "SQLite"],
  tools: [
    "Drizzle ORM",
    "React Router",
    "Framer Motion",
    "Git",
    "GitHub",
    "VS Code",
    "Figma",
  ],
  libraries: ["React Query", "Zod", "React Hook Form", "Chart.js"],
  other: [
    "Data Structures & Algorithms",
    "UI/UX Design",
    "Responsive Design",
    "Web Performance",
    "SEO",
  ],
};

export const softSkills = [
  "Fast Learner",
  "Effective Communicator",
  "Creative Problem Solver",
  "Leadership",
  "Team Collaboration",
  "Time Management",
  "Adaptability",
  "Attention to Detail",
];

// ==============================
// 🏗 Projects
// ==============================
export const projects = [
  {
    id: 1,
    title: "AY Store - Web App Marketplace",
    description:
      "A modern web application store inspired by Play Store UI, featuring app cards, trending sections, categories, modals, dark mode, and secure downloads. Built with vanilla web technologies for optimal performance.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Local Storage API"],
    imageUrl: "./assets/aystore.png",
    liveUrl: "https://aystore.netlify.app/",
    githubUrl: "https://github.com/Ayushanupam7/aystore.git",
    featured: true,
    category: "frontend",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "A responsive portfolio website showcasing my skills, projects, and achievements. Features smooth animations, dark mode toggle, and optimized performance across all devices.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "./assets/portfolio.png",
    liveUrl: "https://ayushanupam.netlify.app/",
    githubUrl: "https://github.com/Ayushanupam7/My-portfolio-ay.git",
    featured: true,
    category: "frontend",
  },
  {
    id: 3,
    title: "Expense Tracker Pro",
    description:
      "A comprehensive financial management application for tracking expenses and savings with intuitive UI, real-time calculations, data visualization, and export capabilities.",
    techStack: ["HTML", "CSS", "JavaScript", "Chart.js", "Local Storage"],
    imageUrl: "./assets/expence.png",
    liveUrl: "https://expencetrackerv4.netlify.app/",
    githubUrl: "https://github.com/Ayushanupam7/Personal-Expence-Meter.git",
    featured: true,
    category: "frontend",
  },
  {
    id: 4,
    title: "Study Mania - Learning Platform",
    description:
      "Full-stack study management application featuring dashboard, flashcards, study planner, progress analytics, and organized learning modules for students.",
    techStack: ["React", "Express.js", "Drizzle ORM", "SQLite", "Tailwind CSS"],
    imageUrl:
      "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/Ayushanupam7/Study-Mania",
    featured: true,
    category: "fullstack",
  },
  {
    id: 5,
    title: "🛡️ Smart Mask, Age & Gender Detection with Object Recognition",
    description:
      "A real-time AI-based surveillance system using computer vision that detects faces, classifies mask status 😷 or ❌, estimates age and gender, and recognizes objects. Features an Info Board displaying live stats, no-mask alert banners, auto snapshot capture, and video recording.",
    techStack: ["OpenCV", "TensorFlow", "Python", "Deep Learning", "Computer Vision"],
    imageUrl: "./assets/maskdetection.jpg",
    liveUrl: "",
    githubUrl: "https://github.com/Ayushanupam7/Mask-Detction",
    featured: false,
    category: "AI/ML",
  },
];

// ==============================
// 🏆 Achievements
// ==============================
export const achievements = [
  {
    id: 1,
    title: "2nd Prize - Kashti 2025 Ad Mad Show",
    description: "Won 2nd Prize in Ad Mad Show, Kashti 2025 at PSIT Kanpur.",
    date: "2025-03-05",
    icon: "award",
    link: "https://www.google.com/",
    images: ["/assets/profile.jpeg"],
  },
  {
    id: 2,
    title: "Poster Creation Award - National Science Day",
    description:
      "Created an award-winning scientific poster on 'AI in Modern Healthcare' that was selected among top 10 entries in the National Science Day celebration.",
    date: "2025-02-28",
    icon: "award",
    link: "https://www.google.com/",
    venue: "College Event",
  },
  {
    id: 3,
    title: "Web Development Intern - WeMakeScholars",
    description:
      "Completed a 3-month internship focusing on frontend development, student portal enhancements, and implementing responsive design patterns for better user experience.",
    date: "2024-12-01",
    icon: "briefcase",
    duration: "3 months",
  },
  {
    id: 4,
    title: "Hackathon Finalist - CodeForGood 2024",
    description:
      "Reached finals in a 24-hour hackathon by developing a community service application for local NGOs using React and Node.js.",
    date: "2024-08-20",
    icon: "code",
    venue: "Online Hackathon",
  },
];

// ==============================
// 🎓 Certificates
// ==============================
export const certificates = [
  {
    id: 1,
    title: "Advanced Web Development Bootcamp",
    issuer: "Udemy",
    date: "2024-08-15",
    certificateUrl: "#",
    imageUrl:
      "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    title: "React & TypeScript Mastery",
    issuer: "Frontend Masters",
    date: "2024-09-20",
    certificateUrl: "#",
    imageUrl:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
    skills: ["React", "TypeScript", "Advanced Patterns"],
  },
];

// ==============================
// 🗣 Testimonials
// ==============================
export const testimonials = [
  {
    id: 1,
    name: "Akarsh Anupam",
    role: "Student",
    company: "akarsheditz_",
    image: "./assets/akarsh.jpg",
    comment:
      "Impressive problem-solving skills and clean code architecture. I'm interested in collaborating on future projects - Ayush shows great potential for full-stack development.",
    rating: 5,
    email: "akarshanupam@gmail.com",
    timestamp: new Date("2025-10-10T10:40:00"),
  },
  {
    id: 2,
    name: "Emily Davis",
    role: "UI/UX Designer",
    company: "DesignStudio Pro",
    image: "https://i.pravatar.cc/150?img=9",
    comment:
      "The visual design and user experience in Ayush's projects are outstanding. He has a great eye for aesthetics combined with technical implementation skills.",
    rating: 4,
    email: "emily.d@designstudiopro.com",
    timestamp: new Date("2025-10-11T11:00:00"),
  },
  {
    id: 3,
    name: "David Martinez",
    role: "Tech Lead",
    company: "CodeCraft Inc",
    image: "https://i.pravatar.cc/150?img=13",
    comment:
      "Solid foundation in React and modern JavaScript. The Study Mania project particularly showcases good full-stack architecture decisions and clean code organization.",
    rating: 5,
    email: "david.m@codecraft.io",
    timestamp: new Date("2025-10-11T12:00:00"),
  },
];

// ==============================
// 💼 Experience
// ==============================
export const experience = [
  {
    id: 1,
    role: "Web Development Intern",
    company: "WeMakeScholars",
    duration: "Sept 2024 - Dec 2024",
    location: "Remote",
    description: [
      "Developed and maintained responsive web pages using HTML, CSS, and JavaScript",
      "Collaborated with design team to implement UI/UX improvements",
      "Optimized website performance and loading speeds",
      "Participated in code reviews and agile development processes",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git", "Figma"],
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Self-Employed",
    duration: "Jan 2024 - Present",
    location: "Remote",
    description: [
      "Built custom websites and web applications for local businesses",
      "Implemented responsive designs and cross-browser compatibility",
      "Provided technical consulting and maintenance services",
      "Managed client relationships and project timelines",
    ],
    technologies: ["React", "Tailwind CSS", "JavaScript", "Node.js"],
  },
];

// ==============================
// 🎓 Education
// ==============================
export const education = [
  {
    id: 1,
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    institution: "G H Raisoni College of Engineering and Management, Pune",
    duration: "2022 - 2026",
    grade: "CGPA: 8.65/10 (Till 2nd Year)",
    achievements: [
      "Class Representative for AI/ML Department",
      "Active participant in coding competitions and tech events",
    ],
  },
  {
    id: 2,
    degree: "Higher Secondary (12th Grade)",
    institution: "R.B.S College, Hajipur",
    duration: "2020 - 2022",
    grade: "66%",
    achievements: [
      "Science Stream with Computer Science",
      "Participated in school science exhibitions",
    ],
  },
  {
    id: 3,
    degree: "Secondary School (10th Grade)",
    institution: "Indian Public School, Hajipur",
    duration: "2020",
    grade: "80%",
    achievements: [
      "School Topper in Computer Science",
      "Active in extracurricular activities",
    ],
  },
];
