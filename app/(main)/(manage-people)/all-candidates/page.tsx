"use client";

import { useState, useMemo } from "react";
import { candidatesData } from "@/services/candidatesData";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import CandidateFilters from "./_components/CandidateFilters";
import CandidateCard from "./_components/CandidateCard";

export default function CandidatesPage() {
  const [activeFilters, setActiveFilters] = useState<{
    location?: string;
    industry?: string;
    experience?: string;
    skills?: string;
    rate?: string;
    availability?: string;
  }>({});
  
  const [searchQuery, setSearchQuery] = useState("");

  // Filter candidates based on active filters and search
  const filteredCandidates = useMemo(() => {
    let filtered = [...candidatesData];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(query) ||
        candidate.title.toLowerCase().includes(query) ||
        candidate.bio.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Apply location filter
    if (activeFilters.location && !activeFilters.location.startsWith("All")) {
      filtered = filtered.filter(candidate =>
        candidate.location === activeFilters.location ||
        candidate.workType === activeFilters.location
      );
    }

    // Apply industry filter
    if (activeFilters.industry && !activeFilters.industry.startsWith("All")) {
      filtered = filtered.filter(candidate =>
        candidate.industry === activeFilters.industry
      );
    }

    // Apply experience filter
    if (activeFilters.experience && !activeFilters.experience.startsWith("All")) {
      filtered = filtered.filter(candidate =>
        candidate.experience === activeFilters.experience
      );
    }

    // Apply skills filter
    if (activeFilters.skills && !activeFilters.skills.startsWith("All")) {
      filtered = filtered.filter(candidate =>
        candidate.skills.includes(activeFilters.skills!)
      );
    }

    // Apply rate filter
    if (activeFilters.rate && !activeFilters.rate.startsWith("All")) {
      const rateRanges: { [key: string]: [number, number] } = {
        "$0-$30/hr": [0, 30],
        "$30-$50/hr": [30, 50],
        "$50-$70/hr": [50, 70],
        "$70+/hr": [70, 1000]
      };
      
      const range = rateRanges[activeFilters.rate];
      if (range) {
        filtered = filtered.filter(candidate =>
          candidate.rate >= range[0] && candidate.rate <= range[1]
        );
      }
    }

    // Apply availability filter
    if (activeFilters.availability && !activeFilters.availability.startsWith("All")) {
      filtered = filtered.filter(candidate =>
        candidate.availability === activeFilters.availability
      );
    }

    return filtered;
  }, [candidatesData, activeFilters, searchQuery]);

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value && !value.startsWith("All") ? value : undefined
    }));
  };

  const handleClearAll = () => {
    setActiveFilters({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Search Talent
              </h1>
              <p className="text-lg text-gray-600">
                {filteredCandidates.length}+ Candidates
              </p>
            </div>

            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Candidate
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name, title, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-base"
            />
          </div>

          {/* Filters */}
          <CandidateFilters
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
        </motion.div>

        {/* Candidates Grid */}
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 px-4"
          >
            <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              We couldn't find any candidates matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredCandidates.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 px-8 py-6 text-base font-semibold"
            >
              Load More Candidates
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}