// constants/candidatesData.ts

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  workType: "Remote" | "Onsite" | "Hybrid";
  rate: number;
  rateType: "hr" | "month" | "project";
  matchScore: number;
  bio: string;
  skills: string[];
  industry: string;
  experience: string;
  availability: "Immediate" | "2 Weeks" | "1 Month" | "2+ Months";
}

export const candidatesData: Candidate[] = [
  {
    id: "1",
    name: "Samantha K. Brown",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    title: "UI/UX Designer",
    location: "Remote",
    workType: "Remote",
    rate: 45,
    rateType: "hr",
    matchScore: 99,
    bio: "Senior Software Engineer with 10 years experience in AI and Machine Learning",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
    industry: "Technology",
    experience: "Senior (10+ years)",
    availability: "Immediate"
  },
  {
    id: "2",
    name: "James T. Lee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    title: "Product Designer",
    location: "Onsite",
    workType: "Onsite",
    rate: 50,
    rateType: "hr",
    matchScore: 80,
    bio: "Creative Product Designer with a focus on mobile applications and...",
    skills: ["Sketch", "Interaction Design", "Concept Development", "Visual Design"],
    industry: "Design",
    experience: "Mid-level (5-10 years)",
    availability: "2 Weeks"
  },
  {
    id: "3",
    name: "Olivia H. Carter",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    title: "Web Developer",
    location: "Remote",
    workType: "Remote",
    rate: 55,
    rateType: "hr",
    matchScore: 75,
    bio: "Front-end developer with expertise in React and responsive design",
    skills: ["HTML/CSS", "JavaScript", "Frameworks", "User Interfaces"],
    industry: "Technology",
    experience: "Mid-level (5-10 years)",
    availability: "Immediate"
  },
  {
    id: "4",
    name: "David R. Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    title: "Product Designer",
    location: "Remote",
    workType: "Remote",
    rate: 48,
    rateType: "hr",
    matchScore: 75,
    bio: "Versatile designer skilled in user experience and interaction design",
    skills: ["Figma", "Wireframing", "User Testing", "Visual Prototyping"],
    industry: "Design",
    experience: "Mid-level (5-10 years)",
    availability: "1 Month"
  },
  {
    id: "5",
    name: "Sophia L. Zhang",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    title: "Content Strategist",
    location: "Freelance",
    workType: "Remote",
    rate: 42,
    rateType: "hr",
    matchScore: 75,
    bio: "Creative content strategist focusing on customer engagement and SEO",
    skills: ["Contentful", "SEO", "Copywriting", "Editorial Planning"],
    industry: "Marketing",
    experience: "Mid-level (5-10 years)",
    availability: "Immediate"
  },
  {
    id: "6",
    name: "Liam A. Wilson",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    title: "UX Researcher",
    location: "Remote",
    workType: "Remote",
    rate: 50,
    rateType: "hr",
    matchScore: 40,
    bio: "UX researcher with a strong background in usability testing and analytics",
    skills: ["UserTesting", "Data Analysis", "Survey Design", "Persona Development"],
    industry: "Research",
    experience: "Mid-level (5-10 years)",
    availability: "2 Weeks"
  },
  {
    id: "7",
    name: "Ava M. Johnson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    title: "Visual Designer",
    location: "Onsite",
    workType: "Onsite",
    rate: 52,
    rateType: "hr",
    matchScore: 75,
    bio: "Visual designer specializing in branding and interactive experiences",
    skills: ["Adobe XD", "UI Design", "Graphic Arts", "Animation"],
    industry: "Design",
    experience: "Senior (10+ years)",
    availability: "Immediate"
  },
  {
    id: "8",
    name: "Ethan C. Moore",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    title: "Service Designer",
    location: "Remote",
    workType: "Remote",
    rate: 57,
    rateType: "hr",
    matchScore: 75,
    bio: "Service designer focused on improving customer experiences across various...",
    skills: ["Miro", "Journey Mapping", "Stakeholder Workshops", "Prototyping"],
    industry: "Design",
    experience: "Senior (10+ years)",
    availability: "1 Month"
  },
  {
    id: "9",
    name: "Mia J. Taylor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    title: "Interaction Designer",
    location: "Remote",
    workType: "Remote",
    rate: 54,
    rateType: "hr",
    matchScore: 75,
    bio: "Innovative interaction designer with expertise in user flow optimization and...",
    skills: ["InVision", "User Flows", "Accessibility Testing", "Visual Storytelling"],
    industry: "Design",
    experience: "Mid-level (5-10 years)",
    availability: "2 Weeks"
  },
  {
    id: "10",
    name: "Noah V. Smith",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Graphic Designer",
    location: "Freelance",
    workType: "Remote",
    rate: 46,
    rateType: "hr",
    matchScore: 10,
    bio: "Graphic designer known for creating eye-catching visuals and brand identities",
    skills: ["Canva", "Branding", "Print Design", "Digital Illustration"],
    industry: "Design",
    experience: "Junior (0-5 years)",
    availability: "Immediate"
  },
  {
    id: "11",
    name: "Emma L. Davis",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    title: "Full Stack Developer",
    location: "Remote",
    workType: "Remote",
    rate: 65,
    rateType: "hr",
    matchScore: 92,
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    industry: "Technology",
    experience: "Senior (10+ years)",
    availability: "Immediate"
  },
  {
    id: "12",
    name: "William K. Anderson",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
    title: "Data Scientist",
    location: "Onsite",
    workType: "Onsite",
    rate: 70,
    rateType: "hr",
    matchScore: 88,
    bio: "Data scientist specializing in machine learning and predictive analytics",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    industry: "Technology",
    experience: "Senior (10+ years)",
    availability: "2+ Months"
  }
];