"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface JobFormData {
  jobTitle: string;
  employmentType: string;
  jobCategory: string;
  experienceLevel: string;
  jobLocation: string;
  salaryMin: string;
  salaryMax: string;
  workType: string;
  jobDescription: string;
  requiredSkills: string[];
  applicationDeadline: string;
  resumeRequired: boolean;
  coverLetterRequired: boolean;
  autoResponseMessage: string;
}

const jobTitles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "Mobile Developer",
  "QA Engineer",
  "Marketing Manager",
];

const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const jobCategories = [
  "Design",
  "Development",
  "Marketing",
  "Sales",
  "Product",
  "Engineering",
  "Data Science",
  "Operations",
  "Human Resources",
  "Finance",
];

const experienceLevels = ["Entry", "Intermediate", "Senior"];

const locations = [
  "New York, NY, USA",
  "San Francisco, CA, USA",
  "London, UK",
  "Toronto, ON, Canada",
  "Berlin, Germany",
  "Sydney, Australia",
  "Remote",
  "Kolkata, West Bengal, India",
  "Mumbai, Maharashtra, India",
  "Bangalore, Karnataka, India",
];

const skillsOptions = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "JavaScript",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "User Research",
  "HTML/CSS",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Vue.js",
  "Angular",
  "Flutter",
  "React Native",
  "Swift",
];

export default function CreateRequisition() {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    employmentType: "",
    jobCategory: "",
    experienceLevel: "",
    jobLocation: "",
    salaryMin: "",
    salaryMax: "",
    workType: "on-site",
    jobDescription: "",
    requiredSkills: [],
    applicationDeadline: "",
    resumeRequired: true,
    coverLetterRequired: false,
    autoResponseMessage: "Thanks for applying...",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log("Form cancelled");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post A Job</h1>
          <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-purple-600 font-medium">
              Use AI
            </Button>
            <Button variant="ghost" className="text-purple-600 font-medium">
              Preview
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {/* Job Title */}
            <div className="space-y-2">
              <Label
                htmlFor="jobTitle"
                className="text-sm font-medium text-gray-700"
              >
                Job Title
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("jobTitle", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select the Job title" />
                </SelectTrigger>
                <SelectContent>
                  {jobTitles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Employment Type and Job Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="employmentType"
                  className="text-sm font-medium text-gray-700"
                >
                  Employment Type
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("employmentType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Full-time, Part-time, Contract, Internship" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="jobCategory"
                  className="text-sm font-medium text-gray-700"
                >
                  Job Category
                </Label>
                <Input
                  placeholder="e.g., Design, Development"
                  value={formData.jobCategory}
                  onChange={(e) =>
                    handleInputChange("jobCategory", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Experience Level and Job Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="experienceLevel"
                  className="text-sm font-medium text-gray-700"
                >
                  Experience Level
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("experienceLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Entry, Intermediate, Senior" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="jobLocation"
                  className="text-sm font-medium text-gray-700"
                >
                  Job Location
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("jobLocation", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="City, State, Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary Range and Work Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="salaryRange"
                  className="text-sm font-medium text-gray-700"
                >
                  Salary Range
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    value={formData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                    className="flex-1"
                  />
                  <span className="self-center text-gray-400">-</span>
                  <Input
                    placeholder="Max"
                    value={formData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Work Type
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="workType"
                      value="on-site"
                      checked={formData.workType === "on-site"}
                      onChange={(e) =>
                        handleInputChange("workType", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm">On-site</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="workType"
                      value="remote"
                      checked={formData.workType === "remote"}
                      onChange={(e) =>
                        handleInputChange("workType", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm">Remote</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="workType"
                      value="hybrid"
                      checked={formData.workType === "hybrid"}
                      onChange={(e) =>
                        handleInputChange("workType", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm">Hybrid</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Job Description and Required Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="jobDescription"
                  className="text-sm font-medium text-gray-700"
                >
                  Job Description
                </Label>
                <Textarea
                  placeholder="Describe the role, daily tasks, company..."
                  value={formData.jobDescription}
                  onChange={(e) =>
                    handleInputChange("jobDescription", e.target.value)
                  }
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Required Skills
                </Label>
                <Select onValueChange={addSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skills" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillsOptions.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected Skills */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.requiredSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Preferences */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Application Preferences
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Application Deadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) =>
                      handleInputChange("applicationDeadline", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="resumeRequired" className="text-sm">
                      Resume Required
                    </Label>
                    <Switch
                      id="resumeRequired"
                      checked={formData.resumeRequired}
                      onCheckedChange={(checked) =>
                        handleInputChange("resumeRequired", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="coverLetterRequired" className="text-sm">
                      Cover Letter Required
                    </Label>
                    <Switch
                      id="coverLetterRequired"
                      checked={formData.coverLetterRequired}
                      onCheckedChange={(checked) =>
                        handleInputChange("coverLetterRequired", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-Response Message */}
            <div className="space-y-2">
              <Label
                htmlFor="autoResponseMessage"
                className="text-sm font-medium text-gray-700"
              >
                Auto-Response Message
              </Label>
              <Textarea
                placeholder="Thanks for applying..."
                value={formData.autoResponseMessage}
                onChange={(e) =>
                  handleInputChange("autoResponseMessage", e.target.value)
                }
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
