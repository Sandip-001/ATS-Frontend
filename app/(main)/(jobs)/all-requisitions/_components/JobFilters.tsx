"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";

interface JobFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  activeFilters: Record<string, string>;
}

const filters = {
  Location: ["Remote", "New York", "San Francisco", "Chicago", "Austin", "Atlanta", "Dallas"],
  Status: ["Active", "Paused", "Draft", "Closed"],
  Date: ["Newest", "Oldest"],
  Applicants: ["0-5", "6-10", "10+"],
};

export default function JobFilters({ onFilterChange, activeFilters }: JobFiltersProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {Object.entries(filters).map(([key, options]) => (
        <DropdownMenu key={key}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {activeFilters[key] ? `${key}: ${activeFilters[key]}` : key}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options.map((opt) => (
              <DropdownMenuItem
                key={opt}
                onClick={() => onFilterChange(key, opt)}
                className="flex items-center justify-between"
              >
                {opt}
                {activeFilters[key] === opt && <Check className="w-4 h-4 text-violet-600" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </motion.div>
  );
}