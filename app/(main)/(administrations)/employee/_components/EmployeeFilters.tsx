"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ContractType, Department } from "@/services/employeeData";

interface EmployeeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: Department | "All";
  onDepartmentChange: (value: Department | "All") => void;
  selectedContractType: ContractType | "All";
  onContractTypeChange: (value: ContractType | "All") => void;
  onSort: (sortType: "name" | "date" | "department") => void;
}

export default function EmployeeFilters({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedContractType,
  onContractTypeChange,
  onSort
}: EmployeeFiltersProps) {
  const departments: (Department | "All")[] = [
    "All",
    "Finance",
    "Engineer",
    "Product",
    "Marketing",
    "Design",
    "HR",
    "Sales"
  ];

  const contractTypes: (ContractType | "All")[] = [
    "All",
    "Full-time",
    "Part-time",
    "Freelance",
    "Internship"
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1 w-full lg:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search payroll or name"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11 bg-white border-gray-200 focus:border-orange-400 focus:ring-orange-400"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        {/* Filter Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-200 hover:border-gray-300"
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase">
              Department
            </div>
            {departments.map((dept) => (
              <DropdownMenuItem
                key={dept}
                onClick={() => onDepartmentChange(dept)}
                className={selectedDepartment === dept ? "bg-orange-50 text-orange-700" : ""}
              >
                {dept}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <div className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase">
              Contract Type
            </div>
            {contractTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => onContractTypeChange(type)}
                className={selectedContractType === type ? "bg-orange-50 text-orange-700" : ""}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-200 hover:border-gray-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSort("name")}>
              Sort by Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("date")}>
              Sort by Join Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("department")}>
              Sort by Department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}