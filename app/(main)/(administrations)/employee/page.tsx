"use client";

import React, { useState, useMemo } from "react";
import { employeesData, Employee, ContractType, Department } from "@/services/employeeData";

import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import EmployeeCard from "./_components/EmployeeCard";
import EmployeeListView from "./_components/EmployeeListView";
import EmployeeFilters from "./_components/EmployeeFilters";

type ViewMode = "card" | "list";

export default function EmployeePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | "All">("All");
  const [selectedContractType, setSelectedContractType] = useState<ContractType | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search employees
  const filteredEmployees = useMemo(() => {
    let filtered = [...employeesData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.payroll.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query) ||
          emp.role.toLowerCase().includes(query)
      );
    }

    // Department filter
    if (selectedDepartment !== "All") {
      filtered = filtered.filter((emp) => emp.department === selectedDepartment);
    }

    // Contract type filter
    if (selectedContractType !== "All") {
      filtered = filtered.filter((emp) => emp.contractType === selectedContractType);
    }

    return filtered;
  }, [searchQuery, selectedDepartment, selectedContractType]);

  // Sort function
  const handleSort = (sortType: "name" | "date" | "department") => {
    // This will trigger a re-render with sorted data
    const sorted = [...employeesData];
    
    switch (sortType) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "date":
        sorted.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        break;
      case "department":
        sorted.sort((a, b) => a.department.localeCompare(b.department));
        break;
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment, selectedContractType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee</h1>
              <p className="text-gray-600">View and manage employee</p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 ${
                  viewMode === "list"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <List className="w-4 h-4" />
                List View
              </Button>
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-2 ${
                  viewMode === "card"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Card View
              </Button>
            </div>
          </div>

          {/* Employee Count and Filters */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Total Employee Count */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Employee : </p>
                  <p className="text-lg font-bold text-gray-900">
                    {filteredEmployees.length} persons
                  </p>
                </div>
              </div>

              {/* Filters Component */}
              <div className="flex-1 lg:max-w-2xl">
                <EmployeeFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedDepartment={selectedDepartment}
                  onDepartmentChange={setSelectedDepartment}
                  selectedContractType={selectedContractType}
                  onContractTypeChange={setSelectedContractType}
                  onSort={handleSort}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Employee List/Cards */}
        {paginatedEmployees.length > 0 ? (
          <>
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedEmployees.map((employee, index) => (
                  <EmployeeCard key={employee.id} employee={employee} index={index} />
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <EmployeeListView employees={paginatedEmployees} />
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              {/* Results Info */}
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of{" "}
                {filteredEmployees.length} entries
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* Back Button */}
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 border-gray-200 hover:border-gray-300 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-gray-500">...</span>
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => handlePageChange(page as number)}
                          className={`min-w-[40px] h-10 ${
                            currentPage === page
                              ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          {page}
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 border-gray-200 hover:border-gray-300 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100"
          >
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Employees Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}