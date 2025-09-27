"use client";

import { useState } from "react";
import { Job } from "./_components/JobRow";
import { mockJobs } from "@/services/Constants";
import JobFilters from "./_components/JobFilters";
import JobTable from "./_components/JobTable";
import JobPagination from "./_components/JobPagination";

export default function AllRequisitions() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
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
        if (newFilters.Applicants === "0-5") return job.applicants >= 0 && job.applicants <= 5;
        if (newFilters.Applicants === "6-10") return job.applicants >= 6 && job.applicants <= 10;
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

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-violet-600">All Job Summary Table</h1>

      <JobFilters onFilterChange={handleFilterChange} activeFilters={activeFilters} />

      <JobTable jobs={displayedJobs} />

      <JobPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}