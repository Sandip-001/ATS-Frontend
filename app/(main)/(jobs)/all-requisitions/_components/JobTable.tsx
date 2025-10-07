"use client";

import JobRow, { Job } from "./JobRow";
import { motion } from "framer-motion";
import { Pencil, Trash2, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugifyJob } from "@/utils/slugify";
import Link from "next/link";
import { useState } from "react";

interface JobTableProps {
  jobs: Job[];
}

export default function JobTable({ jobs }: JobTableProps) {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Paused": return "bg-yellow-100 text-yellow-700";
      case "Draft": return "bg-blue-100 text-blue-700";
      case "Closed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const selectAllJobs = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs.map(job => job.id));
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <input 
                  type="checkbox" 
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  onChange={selectAllJobs}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold">Job Title</th>
              <th className="px-4 py-3 text-left font-semibold">Location</th>
              <th className="px-4 py-3 text-left font-semibold">Applicants</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Posted On</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="p-4 bg-gray-100 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={selectedJobs.length === jobs.length && jobs.length > 0}
              onChange={selectAllJobs}
              className="rounded border-gray-300"
            />
            <span className="font-semibold text-gray-700">
              {selectedJobs.length > 0 ? `${selectedJobs.length} selected` : `${jobs.length} jobs`}
            </span>
          </div>
        </div>

        {/* Mobile Job Cards */}
        <div className="divide-y divide-gray-200">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="p-4 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                {/* Checkbox */}
                <input 
                  type="checkbox" 
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => toggleJobSelection(job.id)}
                  className="rounded border-gray-300 mt-1"
                />

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  {/* Job Title and Status */}
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      href={`/my-requisitions/${slugifyJob(job.id, job.title)}`}
                      className="font-semibold text-violet-600 hover:underline text-base leading-tight"
                    >
                      {job.title}
                    </Link>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Location and Applicants */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {job.applicants} applicants
                      </span>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="text-xs text-gray-500 mb-3">
                    Posted: {job.postedOn}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {jobs.length === 0 && (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </motion.div>
  );
}