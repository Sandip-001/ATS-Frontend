import { Job } from "@/app/(main)/(jobs)/all-requisitions/_components/JobRow";
import {
  LayoutDashboard,
 
  BarChart3,
  Settings,
  FileText,
  UserPlus,
  Users,
  CalendarCheck,
  Briefcase,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Manage Jobs",
    icon: Briefcase,
    subMenu: [
      {
        name: "All Requisitions",
        path: "/all-requisitions",
      },
      {
        name: "Create Requisitions",
        path: "/create-requisition",
      },
      {
        name: "My Requisitions",
        path: "/my-requisitions",
      },
      {
        name: "Interview",
        path: "/interviews",
      },
    ],
  },
  {
    name: "Manage People",
    icon: Users,
    subMenu: [
      {
        name: "All Candidates",
        path: "/all-candidates",
      },
      {
        name: "Create Candidates",
        path: "/create-candidate",
      },
      {
        name: "Interact Candidates",
        path: "/interact-candidates",
      },
    ],
  },
  {
    name: "Measure Performance",
    icon: BarChart3,
    subMenu: [
      {
        name: "Hiring Metrics",
        path: "/hiring-metrics",
      },
      {
        name: "Interview",
        path: "/performance/interview",
      },
    ],
  },
  {
    name: "Administration",
    icon: Settings,
    subMenu: [
      {
        name: "User Management",
        path: "/admin/user-management",
      },
      {
        name: "Company Profile",
        path: "/company-profile",
      },
      {
        name: "Employee",
        path: "/employee",
      },
      /*{
        name: "Job Templates",
        path: "/admin/job-templates",
      },*/
    ],
  },
];




// constants/overviewData.ts
export const userInfo = {
  name: "Robert Allen",
  role: "HR Manager",
  avatar: "/user.png",
};

export const statsData = [
  {
    title: "Total Employee",
    count: 560,
    change: "+12%",
    positive: true,
    updatedOn: "July 16, 2023",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Total Applicant",
    count: 1050,
    change: "+5%",
    positive: true,
    updatedOn: "July 14, 2023",
    icon: <UserPlus className="w-6 h-6" />,
  },
  {
    title: "Today Attendance",
    count: 470,
    change: "-8%",
    positive: false,
    updatedOn: "July 14, 2023",
    icon: <CalendarCheck className="w-6 h-6" />,
  },
  {
    title: "Total Projects",
    count: 250,
    change: "+12%",
    positive: true,
    updatedOn: "July 10, 2023",
    icon: <Briefcase className="w-6 h-6" />,
  },
];

export const attendanceTable = [
  {
    name: "Leslie Watson",
    role: "Team Lead - Design",
    type: "Office",
    checkIn: "09:27 AM",
    status: "On Going",
    avatar: "/avatars/1.png",
  },
  {
    name: "Darlene Robertson",
    role: "Web Designer",
    type: "Office",
    checkIn: "10:15 AM",
    status: "Leave",
    avatar: "/avatars/2.png",
  },
  {
    name: "Jacob Jones",
    role: "Medical Assistant",
    type: "Remote",
    checkIn: "10:24 AM",
    status: "Leave",
    avatar: "/avatars/3.png",
  },
  {
    name: "Kathryn Murphy",
    role: "Marketing Coordinator",
    type: "Office",
    checkIn: "09:10 AM",
    status: "On Time",
    avatar: "/avatars/4.png",
  },
  {
    name: "Leslie Alexander",
    role: "Data Analyst",
    type: "Office",
    checkIn: "09:15 AM",
    status: "On Time",
    avatar: "/avatars/5.png",
  },
  {
    name: "Ronald Richards",
    role: "Python Developer",
    type: "Remote",
    checkIn: "09:29 AM",
    status: "On Time",
    avatar: "/avatars/6.png",
  },
  {
    name: "Jenny Wilson",
    role: "React JS Developer",
    type: "Remote",
    checkIn: "11:30 AM",
    status: "Leave",
    avatar: "/avatars/7.png",
  },
];

export const scheduleData = [
  {
    date: "2025-07-06",
    events: [
      {
        time: "09:30",
        title: "UI/UX Designer",
        task: "Practical Task Review",
      },
      {
        time: "12:00",
        title: "Magento Developer",
        task: "Resume Review",
      },
      {
        time: "01:30",
        title: "Sales Manager",
        task: "Final HR Round",
      },
    ],
  },
  {
    date: "2025-07-07",
    events: [
      {
        time: "09:30",
        title: "Front-end Developer",
        task: "Practical Task Review",
      },
      {
        time: "11:00",
        title: "React JS",
        task: "TL Meeting",
      },
      {
        time: "09:30",
        title: "Front-end Developer",
        task: "Practical Task Review",
      },
      {
        time: "11:00",
        title: "React JS",
        task: "TL Meeting",
      },
      {
        time: "09:30",
        title: "Front-end Developer",
        task: "Practical Task Review",
      },
      {
        time: "11:00",
        title: "React JS",
        task: "TL Meeting",
      },
      {
        time: "09:30",
        title: "Front-end Developer",
        task: "Practical Task Review",
      },
      {
        time: "11:00",
        title: "React JS",
        task: "TL Meeting",
      },
    ],
  },
];



export const mockJobs: Job[] = [
  {
    id: "1",
    title: "UI/UX Designer",
    location: "Remote",
    applicants: 10,
    status: "Active",
    postedOn: "Mar 20, 2025",
  },
  {
    id: "2",
    title: "React Developer",
    location: "New York",
    applicants: 5,
    status: "Paused",
    postedOn: "Mar 5, 2025",
  },
  {
    id: "3",
    title: "Data Analyst",
    location: "San Francisco",
    applicants: 0,
    status: "Draft",
    postedOn: "Not yet published",
  },
  {
    id: "4",
    title: "Sales Executive",
    location: "Chicago",
    applicants: 8,
    status: "Active",
    postedOn: "Apr 30, 2025",
  },
  {
    id: "5",
    title: "Content Writer",
    location: "Hybrid",
    applicants: 3,
    status: "Closed",
    postedOn: "Feb 15, 2025",
  },
  {
    id: "6",
    title: "Graphic Designer",
    location: "Los Angeles",
    applicants: 6,
    status: "Active",
    postedOn: "Apr 28, 2025",
  },
  {
    id: "7",
    title: "Product Manager",
    location: "Austin",
    applicants: 7,
    status: "Paused",
    postedOn: "Mar 10, 2025",
  },
  {
    id: "8",
    title: "DevOps Engineer",
    location: "Seattle",
    applicants: 0,
    status: "Draft",
    postedOn: "Not yet published",
  },
  {
    id: "9",
    title: "HR Coordinator",
    location: "Atlanta",
    applicants: 9,
    status: "Closed",
    postedOn: "Mar 5, 2025",
  },
  {
    id: "10",
    title: "Backend Developer",
    location: "Boston",
    applicants: 9,
    status: "Active",
    postedOn: "Apr 22, 2025",
  },
];



export const mockApplicants = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "UI/UX Designer",
    name: "Sarah Johnson",
    experience: "4 yrs – Mobile App UI/UX",
    location: "New York",
    submitted: "Mar 20, 2025",
    status: "New",
  },
  {
    id: "2",
    jobId: "1",
    jobTitle: "UI/UX Designer",
    name: "Michael Smith",
    experience: "3 yrs – SaaS Platforms",
    location: "California",
    submitted: "Apr 15, 2025",
    status: "Shortlisted",
  },
  {
    id: "3",
    jobId: "1",
    jobTitle: "UI/UX Designer",
    name: "Emily Davis",
    experience: "5 yrs – Fintech UI",
    location: "California",
    submitted: "May 10, 2025",
    status: "Interviewed",
  },
  {
    id: "4",
    jobId: "2",
    jobTitle: "React Developer",
    name: "David Brown",
    experience: "2 yrs – React + Next.js",
    location: "Illinois",
    submitted: "Jun 5, 2025",
    status: "Rejected",
  },
  {
    id: "5",
    jobId: "2",
    jobTitle: "React Developer",
    name: "Laura Wilson",
    experience: "6 yrs – HealthTech Apps",
    location: "Florida",
    submitted: "Jul 18, 2025",
    status: "Shortlisted",
  },
  {
    id: "6",
    jobId: "3",
    jobTitle: "Data Analyst",
    name: "James Taylor",
    experience: "4 yrs – Mobile Banking",
    location: "Washington",
    submitted: "Aug 22, 2025",
    status: "New",
  },
  {
    id: "7",
    jobId: "3",
    jobTitle: "Data Analyst",
    name: "Patricia Miller",
    experience: "3 yrs – Startup Analytics",
    location: "Texas",
    submitted: "Sep 30, 2025",
    status: "New",
  },
  {
    id: "8",
    jobId: "4",
    jobTitle: "Sales Executive",
    name: "Robert Garcia",
    experience: "7 yrs – EdTech Sales",
    location: "Massachusetts",
    submitted: "Oct 14, 2025",
    status: "Shortlisted",
  },
  {
    id: "9",
    jobId: "4",
    jobTitle: "Sales Executive",
    name: "John Martinez",
    experience: "5 yrs – B2B Sales",
    location: "District of Columbia",
    submitted: "Nov 28, 2025",
    status: "Interviewed",
  },
  {
    id: "10",
    jobId: "5",
    jobTitle: "Content Writer",
    name: "William Hernandez",
    experience: "2.5 yrs – Technical Writing",
    location: "Arizona",
    submitted: "Dec 1, 2025",
    status: "Rejected",
  },
];




export const companyData = {
  id:"1",
  name: "TechNest Innovations Inc.",
  avatar: "https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg",
  industry: "Information Technology & Services",
  location: "New York, USA",
  website: "www.companysite.com",
  companySize: "51–200 employees",
  currency: "EUR",
  founded: "2017",
  about:
    "TechNest Innovations is a cutting-edge technology company delivering high-quality web and mobile solutions to clients worldwide. Our team of expert developers, designers, and strategists collaborate closely with businesses to build scalable, user-focused products. We value creativity, agility, and transparency.",
  socials: {
    linkedin: "https://linkedin.com/company/technest",
    twitter: "https://x.com/technest",
    facebook: "https://facebook.com/technest",
  },
  testimonials: [
    {
      name: "Sarah Johnson",
      comment:
        "Working with TechNest has been a transformative experience! Their team is highly skilled and professional.",
    },
    {
      name: "David Miller",
      comment:
        "Outstanding web development service — timely delivery and perfect communication.",
    },
  ],
};
