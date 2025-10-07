"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee, contractTypeColors, departmentColors } from "@/services/employeeData";
import { motion } from "framer-motion";

interface EmployeeListViewProps {
  employees: Employee[];
}

export default function EmployeeListView({ employees }: EmployeeListViewProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Scrollable Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Payroll
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Department
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Joining Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Contract Type
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee, index) => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-400 text-white font-semibold text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {employee.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Payroll */}
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {employee.payroll}
                </td>

                {/* Department */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center ${departmentColors[employee.department]} whitespace-nowrap`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-1.5"></span>
                    <span className="text-sm font-medium">{employee.department}</span>
                  </span>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-sm text-gray-700" title={employee.role}>
                  <span className="truncate block max-w-[200px]">
                    {employee.role}
                  </span>
                </td>

                {/* Join Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600 whitespace-nowrap">
                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                    {employee.joinDate}
                  </div>
                </td>

                {/* Contract Type */}
                <td className="px-6 py-4">
                  <Badge className={`${contractTypeColors[employee.contractType]} font-medium text-xs whitespace-nowrap`}>
                    {employee.contractType}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}