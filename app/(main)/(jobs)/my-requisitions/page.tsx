"use client";

import { useState } from "react";
import JobFilters from "../all-requisitions/_components/JobFilters";
import JobTable from "../all-requisitions/_components/JobTable";
import JobPagination from "../all-requisitions/_components/JobPagination";
import { mockJobs } from "@/services/Constants";
import { Job } from "../all-requisitions/_components/JobRow";

export default function MyRequisitions() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const jobsPerPage = 5;

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);

    let jobs = [...mockJobs];

    // Apply filters one by one
    if (newFilters.Status) {
      jobs = jobs.filter((job) => job.status === newFilters.Status);
    }

    if (newFilters.Location) {
      jobs = jobs.filter((job) => job.location === newFilters.Location);
    }

    if (newFilters.Applicants) {
      jobs = jobs.filter((job) => {
        if (newFilters.Applicants === "0-5")
          return job.applicants >= 0 && job.applicants <= 5;
        if (newFilters.Applicants === "6-10")
          return job.applicants >= 6 && job.applicants <= 10;
        if (newFilters.Applicants === "10+") return job.applicants > 10;
        return true;
      });
    }

    if (newFilters.Date) {
      jobs = jobs.filter((job) => job.postedOn !== "Not yet published");
      jobs.sort((a, b) => {
        const dateA = new Date(a.postedOn).getTime();
        const dateB = new Date(b.postedOn).getTime();
        return newFilters.Date === "Newest" ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
    setFilteredJobs(mockJobs); // reset jobs to full list
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-violet-600">
            My Jobs
          </h1>
        </div>

        {/* Filters - Responsive */}
        <div className="mb-6">
          <JobFilters
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            onClearAll={handleClearAllFilters}
          />
        </div>

        {/* Table */}
        <div className="mb-6">
          <JobTable jobs={displayedJobs} />
        </div>

        {/* Pagination */}
        <JobPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
