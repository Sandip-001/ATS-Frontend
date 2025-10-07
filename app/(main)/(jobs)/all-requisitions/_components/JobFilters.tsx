"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface JobFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  onClearAll: () => void;
  activeFilters: Record<string, string>;
}

const filters = {
  Location: ["Remote", "New York", "San Francisco", "Chicago", "Austin", "Atlanta", "Dallas"],
  Status: ["Active", "Paused", "Draft", "Closed"],
  Date: ["Newest", "Oldest"],
  Applicants: ["0-5", "6-10", "10+"],
};

export default function JobFilters({ onFilterChange, activeFilters, onClearAll }: JobFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeFilterCount = Object.keys(activeFilters).length;

  const clearAllFilters = () => {
    Object.keys(activeFilters).forEach(filterType => {
      onFilterChange(filterType, "");
    });
  };

  return (
    <>
      {/* Desktop Filters */}
      <motion.div
        className="hidden lg:flex flex-wrap gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {Object.entries(filters).map(([key, options]) => (
          <DropdownMenu key={key}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className={`flex items-center gap-2 text-sm ${
                  activeFilters[key] 
                    ? 'border-violet-300 bg-violet-50 text-violet-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {activeFilters[key] ? `${key}: ${activeFilters[key]}` : key}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {options.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  onClick={() => onFilterChange(key, opt)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  {opt}
                  {activeFilters[key] === opt && <Check className="w-4 h-4 text-violet-600" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            onClick={onClearAll} 
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Clear all ({activeFilterCount})
          </Button>
        )}
      </motion.div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              onClick={onClearAll}
              className="text-sm text-gray-600"
            >
              Clear all
            </Button>
          )}
        </div>

        {showMobileFilters && (
          <motion.div
            className="space-y-3 p-4 bg-gray-50 rounded-lg border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(filters).map(([key, options]) => (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`flex items-center gap-2 text-sm w-full ${
                        activeFilters[key] 
                          ? 'border-violet-300 bg-violet-50 text-violet-700' 
                          : 'border-gray-300'
                      }`}
                    >
                      <span className="truncate">
                        {activeFilters[key] ? `${key}: ${activeFilters[key]}` : key}
                      </span>
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {options.map((opt) => (
                      <DropdownMenuItem
                        key={opt}
                        onClick={() => onFilterChange(key, opt)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        {opt}
                        {activeFilters[key] === opt && <Check className="w-4 h-4 text-violet-600" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}