import React from 'react';
import { Info, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Types
interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    data: number[];
  };
  showInfo?: boolean;
}

interface SkillData {
  name: string;
  icon: string;
  percentage: number;
  color: string;
}

interface ChartData {
  month: string;
  value: number;
}

// Dummy Data
const chartData: ChartData[] = [
  { month: 'APR', value: 120 },
  { month: 'S', value: 180 },
  { month: 'MAR', value: 150 },
  { month: 'APR', value: 280 },
  { month: 'MAY', value: 320 },
  { month: 'JUN', value: 220 },
  { month: 'JUL', value: 280 },
  { month: 'AUG', value: 120 },
  { month: 'SEP', value: 320 },
];

const weakestSkills: SkillData[] = [
  { name: 'PHP', icon: '🐘', percentage: 74, color: 'from-orange-500 via-red-500 to-pink-300' },
  { name: 'Laravel', icon: '🔴', percentage: 52, color: 'from-orange-500 via-red-400 to-pink-200' },
  { name: 'C++', icon: '💻', percentage: 36, color: 'from-orange-500 via-red-400 to-pink-200' },
];

const demandSkills: SkillData[] = [
  { name: 'AWS', icon: '☁️', percentage: 95, color: 'from-green-400 to-emerald-200' },
  { name: 'Node.JS', icon: '🟢', percentage: 92, color: 'from-green-400 to-emerald-200' },
  { name: 'Django', icon: '🎯', percentage: 89, color: 'from-green-400 to-emerald-200' },
];

// Components
const StatCard: React.FC<StatCardProps> = ({ title, value, trend, showInfo }) => (
  <Card className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {showInfo && <Info className="w-4 h-4 text-gray-400" />}
    </div>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <div className="flex items-center">
          <svg width="60" height="24" className="text-blue-500">
            <polyline
              points={trend.data.map((val, idx) => `${idx * 12},${24 - val}`).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
            />
          </svg>
        </div>
      )}
    </div>
  </Card>
);

const BarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card className="p-6 bg-white rounded-xl shadow-sm col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-900">Active Job</h3>
        <Select defaultValue="month">
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end justify-between h-64 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 h-full justify-end">
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const SkillBar: React.FC<{ skill: SkillData; type: 'weak' | 'demand' }> = ({ skill, type }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
      {skill.icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.percentage}% Correct</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all`}
          style={{ width: `${skill.percentage}%` }}
        />
      </div>
    </div>
  </div>
);

const SkillsCard: React.FC<{ title: string; skills: SkillData[]; type: 'weak' | 'demand' }> = ({
  title,
  skills,
  type,
}) => (
  <Card className="p-6 bg-white rounded-xl shadow-sm">
    <h3 className="text-sm font-medium text-gray-900 mb-6">{title}</h3>
    <div>
      {skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} type={type} />
      ))}
    </div>
  </Card>
);

// Main Dashboard Component
const ReportingAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Reporting & Analytics</h1>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Timeframe:</label>
              <Select defaultValue="all-time">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All-time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All-time</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">People:</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="developers">Developers</SelectItem>
                  <SelectItem value="designers">Designers</SelectItem>
                  <SelectItem value="managers">Managers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Topic:</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Applications" value="27000" />
          <StatCard title="Excellent Candidates" value="3,200" />
          <StatCard title="Avg. Processing Time" value="2h 34m" />
          <StatCard
            title="Average Score"
            value="64%"
            trend={{ value: "+2%", data: [12, 8, 14, 10, 16, 18] }}
            showInfo
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Current Knowledge"
            value="86%"
            trend={{ value: "+5%", data: [10, 12, 8, 14, 16, 18] }}
          />
          <StatCard
            title="Excellent Candidates"
            value="+34%"
            trend={{ value: "+12%", data: [8, 10, 12, 9, 15, 17] }}
          />
          <BarChart data={chartData} />
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillsCard title="Weakest Skills" skills={weakestSkills} type="weak" />
          <SkillsCard title="Most In-Demand Skills" skills={demandSkills} type="demand" />
        </div>
      </div>
    </div>
  );
};

export default ReportingAnalytics;