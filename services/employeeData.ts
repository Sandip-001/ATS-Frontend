
export type ContractType = "Full-time" | "Part-time" | "Freelance" | "Internship";
export type Department = "Finance" | "Engineer" | "Product" | "Marketing" | "Design" | "HR" | "Sales";

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: Department;
  role: string;
  payroll: string;
  joinDate: string;
  contractType: ContractType;
}

export const employeesData: Employee[] = [
  {
    id: "1",
    name: "Jane Cooper",
    email: "janecoop@gmail.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    department: "Finance",
    role: "Sr. Accountant",
    payroll: "121948ASH3",
    joinDate: "Feb 23, 2025",
    contractType: "Full-time"
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    email: "brooklynsmms@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    department: "Engineer",
    role: "Lead. Back End Dev",
    payroll: "BHABHD127",
    joinDate: "Feb 18, 2025",
    contractType: "Freelance"
  },
  {
    id: "3",
    name: "Leslie Alexander",
    email: "alexanderls@gmail.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    department: "Product",
    role: "Jr. Technical Product",
    payroll: "18219ADANJ",
    joinDate: "Dec 25, 2024",
    contractType: "Internship"
  },
  {
    id: "4",
    name: "Esther Howard",
    email: "esthrhoward@gmail.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    department: "Finance",
    role: "Lead. Accountant",
    payroll: "MMZKAO811",
    joinDate: "Jan 10, 2025",
    contractType: "Part-time"
  },
  {
    id: "5",
    name: "Cameron Williamson",
    email: "williamcm@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    department: "Engineer",
    role: "Sr. DevOps",
    payroll: "HSASH8188",
    joinDate: "Mar 30, 2025",
    contractType: "Freelance"
  },
  {
    id: "6",
    name: "Albert Flores",
    email: "albertflrs@gmail.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    department: "Marketing",
    role: "Jr. Digital Marketing",
    payroll: "NXAHC1100",
    joinDate: "Oct 4, 2024",
    contractType: "Part-time"
  },
  {
    id: "7",
    name: "Annette Black",
    email: "annetblack@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    department: "Engineer",
    role: "Jr. Front End Dev",
    payroll: "SJABV81742",
    joinDate: "Dec 19, 2024",
    contractType: "Internship"
  },
  {
    id: "8",
    name: "Darlene Robertson",
    email: "darlenerobert@gmail.com",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    department: "Marketing",
    role: "Sr. Content Writer",
    payroll: "71738KAON",
    joinDate: "Jan 28, 2025",
    contractType: "Full-time"
  },
  {
    id: "9",
    name: "Grande Ariana",
    email: "grandeari@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    department: "Product",
    role: "Lead. Product Manager",
    payroll: "JAHDG6661",
    joinDate: "Feb 12, 2025",
    contractType: "Full-time"
  },
  {
    id: "10",
    name: "Arlene McCoy",
    email: "mccoyarlene@gmail.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    department: "Product",
    role: "Sr. UI/UX Designer",
    payroll: "LAKDB9137",
    joinDate: "Nov 10, 2024",
    contractType: "Part-time"
  },
  {
    id: "11",
    name: "Robert Fox",
    email: "robertfox@gmail.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    department: "Design",
    role: "Sr. Graphic Designer",
    payroll: "MKDH8291A",
    joinDate: "Sep 15, 2024",
    contractType: "Full-time"
  },
  {
    id: "12",
    name: "Theresa Webb",
    email: "theresawebb@gmail.com",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
    department: "HR",
    role: "HR Manager",
    payroll: "HRWT9182B",
    joinDate: "Aug 22, 2024",
    contractType: "Full-time"
  },
  {
    id: "13",
    name: "Kristin Watson",
    email: "kristinwatson@gmail.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    department: "Sales",
    role: "Sales Executive",
    payroll: "SLKW7291C",
    joinDate: "Jul 18, 2024",
    contractType: "Freelance"
  },
  {
    id: "14",
    name: "Kathryn Murphy",
    email: "kathrynmurphy@gmail.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    department: "Finance",
    role: "Jr. Financial Analyst",
    payroll: "FNKM8193D",
    joinDate: "Jun 30, 2024",
    contractType: "Internship"
  },
  {
    id: "15",
    name: "Ralph Edwards",
    email: "ralphedwards@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    department: "Engineer",
    role: "Full Stack Developer",
    payroll: "ENRE8291E",
    joinDate: "May 12, 2024",
    contractType: "Full-time"
  }
];

export const contractTypeColors: Record<ContractType, string> = {
  "Full-time": "bg-blue-100 text-blue-700 border-blue-200",
  "Part-time": "bg-pink-100 text-pink-700 border-pink-200",
  "Freelance": "bg-green-100 text-green-700 border-green-200",
  "Internship": "bg-purple-100 text-purple-700 border-purple-200"
};

export const departmentColors: Record<Department, string> = {
  "Finance": "text-purple-600",
  "Engineer": "text-orange-600",
  "Product": "text-red-600",
  "Marketing": "text-cyan-600",
  "Design": "text-green-600",
  "HR": "text-blue-600",
  "Sales": "text-yellow-600"
};