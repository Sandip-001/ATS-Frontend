"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Share2,
  Trash2,
  MoreVertical,
  ChevronDown,
  CalendarIcon,
} from "lucide-react";
import { mockJobs, mockApplicants } from "@/services/Constants";
import JobPagination from "../../all-requisitions/_components/JobPagination";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";

export default function JobDetailsPage() {
  const { slug } = useParams<{ slug: string }>(); // e.g. "1-ui-ux-designer"
  const jobId = slug.split("-")[0];
  const job = mockJobs.find((j) => j.id === jobId);

  if (!job) return <div className="p-6 text-red-500">Job not found</div>;

  let applicants = mockApplicants.filter((a) => a.jobId === jobId);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [experienceFilter, setExperienceFilter] = useState<number | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 5;

  // Apply filters
  if (statusFilter) {
    applicants = applicants.filter((a) => a.status === statusFilter);
  }
  if (experienceFilter) {
    applicants = applicants.filter((a) =>
      a.experience.startsWith(`${experienceFilter}`)
    );
  }
  if (locationFilter) {
    applicants = applicants.filter((a) => a.location === locationFilter);
  }
  if (dateFilter) {
    const formattedDate = format(dateFilter, "MMM d, yyyy");
    applicants = applicants.filter((a) => a.submitted === formattedDate);
  }

  const totalPages = Math.ceil(applicants.length / applicantsPerPage);
  const displayedApplicants = applicants.slice(
    (currentPage - 1) * applicantsPerPage,
    currentPage * applicantsPerPage
  );

  // Status counts for summary
  const statusCounts = {
    New: mockApplicants.filter((a) => a.jobId === jobId && a.status === "New")
      .length,
    Shortlisted: mockApplicants.filter(
      (a) => a.jobId === jobId && a.status === "Shortlisted"
    ).length,
    Interviewed: mockApplicants.filter(
      (a) => a.jobId === jobId && a.status === "Interviewed"
    ).length,
    Rejected: mockApplicants.filter(
      (a) => a.jobId === jobId && a.status === "Rejected"
    ).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-violet-600 flex items-center gap-3">
          {job.title}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === "Active"
                ? "bg-green-100 text-green-700"
                : job.status === "Paused"
                ? "bg-yellow-100 text-yellow-700"
                : job.status === "Draft"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>
        </h1>

        <p className="text-gray-500 mt-1">
          {job.location} • {job.postedOn} • {job.applicants} Applicants
        </p>
      </div>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {statusFilter || "Status"} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["New", "Shortlisted", "Interviewed", "Rejected"].map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Experience */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {experienceFilter ? `${experienceFilter} yrs` : "Experience"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[1, 2, 3, 4, 5].map((yr) => (
              <DropdownMenuItem
                key={yr}
                onClick={() => setExperienceFilter(yr)}
              >
                {yr} yrs
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Location */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {locationFilter || "Location"} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[...new Set(mockApplicants.map((a) => a.location))].map((loc) => (
              <DropdownMenuItem
                key={loc}
                onClick={() => setLocationFilter(loc)}
              >
                {loc}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {dateFilter ? format(dateFilter, "MMM d, yyyy") : "Date"}
              <CalendarIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={dateFilter || undefined}
              onSelect={(date) => setDateFilter(date ?? null)}
            />
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {(statusFilter || experienceFilter || locationFilter || dateFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              setStatusFilter(null);
              setExperienceFilter(null);
              setLocationFilter(null);
              setDateFilter(null);
            }}
            className="text-sm text-red-500"
          >
            Clear Filters
          </Button>
        )}
      </motion.div>

      {/* Status Summary */}
      <motion.div
        className="flex flex-wrap gap-6 text-sm font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-blue-600">New ({statusCounts.New})</span>
        <span className="text-green-600">
          Shortlisted ({statusCounts.Shortlisted})
        </span>
        <span className="text-purple-600">
          Interviewed ({statusCounts.Interviewed})
        </span>
        <span className="text-red-600">Rejected ({statusCounts.Rejected})</span>
      </motion.div>

      {/* Applicants Table */}
      <motion.div
        className="overflow-x-auto border rounded-lg shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Candidate</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Location</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedApplicants.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center gap-2 font-medium">
                  <Link
                    href={`/my-requisitions/${slug}/${a.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Image
                      src={`/user.png`}
                      alt={a.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    {a.name}
                  </Link>
                </td>
                <td className="p-3">{a.experience}</td>
                <td className="p-3">{a.location}</td>
                <td className="p-3">{a.submitted}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      a.status === "New"
                        ? "bg-blue-100 text-blue-600"
                        : a.status === "Shortlisted"
                        ? "bg-green-100 text-green-600"
                        : a.status === "Interviewed"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="p-3 flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <div className="mt-4">
        <JobPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
