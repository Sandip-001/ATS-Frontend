"use client";

import { useParams } from "next/navigation";
import { mockJobs, mockApplicants } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplicantProfilePage() {
  const { slug, applicantId } = useParams<{
    slug: string;
    applicantId: string;
  }>();

  // jobId from slug (e.g. "1-ui-ux-designer")
  const jobId = slug?.split("-")[0];
  const job = mockJobs.find((j) => j.id === jobId);
  const applicant = mockApplicants.find((a) => a.id === applicantId);

  if (!job || !applicant) {
    return <div className="p-6 text-red-500">Applicant not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Paused":
        return "bg-yellow-100 text-yellow-700";
      case "Draft":
        return "bg-blue-100 text-blue-700";
      case "Closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-violet-600">
          {job.title}
        </h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>

      {/* Profile Card */}
      <motion.div
        className="bg-white border rounded-xl shadow-md overflow-hidden grid md:grid-cols-[1fr_auto_2fr] gap-6 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left: Candidate Info */}
        <div className="flex flex-col items-center  text-center md:text-left space-y-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt={applicant.name}
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold">{applicant.name}</h2>
            <p className="text-violet-600 font-medium">
              {applicant.experience}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Button className="bg-violet-600 text-white hover:bg-violet-700">
              Message
            </Button>
            <Button className="bg-green-100 text-green-700 hover:bg-green-200">
              Shortlist
            </Button>
            <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              Schedule Interview
            </Button>
            <Button className="bg-red-100 text-red-700 hover:bg-red-200">
              Reject
            </Button>
          </div>

          {/* Contact Info (starts under actions now) */}
          <div className="space-y-2 text-gray-600 text-sm w-full">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-violet-600" />{" "}
              {applicant.location}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-violet-600" />{" "}
              sarahjohnson@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-violet-600" /> +251 912 345 678
            </p>
            <p className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-violet-600" />{" "}
              linkedin.com/in/sarahjohnson
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {["Figma", "User Research", "Wireframing", "Prototyping"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Divider (only for md+ screens) */}
        <div className="hidden md:block w-px bg-gray-200"></div>

        {/* Right: Application Info */}
        <div className="space-y-6">
          {/* Application Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Application Overview</h3>
            <p>
              <strong>Job Title:</strong> {job.title}
            </p>
            <p>
              <strong>Applied On:</strong> {applicant.submitted}
            </p>
            <p>
              <strong>Application Status: </strong>
              <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                {applicant.status}
              </span>
            </p>
          </div>

          {/* Professional Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Professional Overview
            </h3>
            <p>
              <strong>Expected Salary:</strong> $45/hour
            </p>
            <p>
              <strong>Work Type:</strong> Hybrid preferred
            </p>
            <p className="mt-2 text-gray-700">
              I’m excited about the opportunity to design seamless mobile
              experiences. I bring 4+ years of experience working on fintech and
              e-commerce platforms.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                <strong>UI Designer – EthioSoft Inc. (2022–Present)</strong>
                <br />
                Designed and tested user flows for a banking app used by 500k+
                customers.
              </li>
              <li>
                <strong>UX Intern – OrangeLab (2021)</strong>
                <br />
                Assisted in redesigning a travel booking app UI.
              </li>
            </ul>
          </div>

          {/* Resume */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Resume & Attachments</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-violet-600 hover:underline">
                📄 Resume.pdf
              </a>
              <a href="#" className="text-violet-600 hover:underline">
                📦 Portfolio.zip
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
