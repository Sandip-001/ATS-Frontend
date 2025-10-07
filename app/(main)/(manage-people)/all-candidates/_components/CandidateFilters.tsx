"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface CandidateFiltersProps {
  activeFilters: {
    location?: string;
    industry?: string;
    experience?: string;
    skills?: string;
    rate?: string;
    availability?: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearAll: () => void;
}

const filterOptions = {
  Location: ["All Locations", "Remote", "Onsite", "Hybrid", "Freelance"],
  Industry: ["All Industries", "Technology", "Design", "Marketing", "Research", "Engineering"],
  Experience: ["All Levels", "Junior (0-5 years)", "Mid-level (5-10 years)", "Senior (10+ years)"],
  Skills: ["All Skills", "Figma", "React", "JavaScript", "Python", "UI Design", "User Research"],
  Rate: ["All Rates", "$0-$30/hr", "$30-$50/hr", "$50-$70/hr", "$70+/hr"],
  Availability: ["All Availability", "Immediate", "2 Weeks", "1 Month", "2+ Months"]
};

export default function CandidateFilters({ 
  activeFilters, 
  onFilterChange, 
  onClearAll 
}: CandidateFiltersProps) {
  const activeFilterCount = Object.values(activeFilters).filter(
    value => value && value.trim() !== "" && !value.startsWith("All")
  ).length;

  const clearIndividualFilter = (filterType: string) => {
    onFilterChange(filterType, "");
  };

  return (
    <motion.div
      className="flex flex-wrap items-center gap-3 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {Object.entries(filterOptions).map(([key, options]) => {
        const filterKey = key.toLowerCase();
        const filterValue = activeFilters[filterKey as keyof typeof activeFilters];
        const isActive = filterValue && !filterValue.startsWith("All");

        return (
          <div key={key} className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`
                    flex items-center gap-2 text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100' 
                      : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                    }
                  `}
                >
                  {key}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {options.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => onFilterChange(filterKey, option)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{option}</span>
                    {filterValue === option && (
                      <Check className="w-4 h-4 text-purple-600" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isActive && (
              <button
                onClick={() => clearIndividualFilter(filterKey)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        );
      })}

      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
        >
          Clear all ({activeFilterCount})
        </Button>
      )}
    </motion.div>
  );
}