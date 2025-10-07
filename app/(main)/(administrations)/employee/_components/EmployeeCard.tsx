"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee, contractTypeColors, departmentColors } from "@/services/employeeData";

interface EmployeeCardProps {
  employee: Employee;
  index: number;
}

export default function EmployeeCard({ employee, index }: EmployeeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative group"
    >
      {/* Contract Type Badge */}
      <div className="absolute top-4 left-4">
        <Badge className={`${contractTypeColors[employee.contractType]} font-medium text-xs px-3 py-1`}>
          {employee.contractType}
        </Badge>
      </div>

      {/* More Options */}
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
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

      {/* Employee Info */}
      <div className="flex flex-col items-center text-center mt-8 mb-4">
        <Avatar className="h-20 w-20 mb-3 ring-4 ring-gray-100">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-400 text-white text-xl font-semibold">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {employee.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {employee.email}
        </p>

        {/* Department and Role */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className={`inline-flex items-center ${departmentColors[employee.department]}`}>
            <span className="w-2 h-2 rounded-full bg-current mr-1.5"></span>
            <span className="text-sm font-medium">{employee.department}</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">{employee.role}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Payroll</span>
          <span className="text-sm font-medium text-gray-900">{employee.payroll}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Join Date</span>
          <span className="text-sm font-medium text-gray-900">{employee.joinDate}</span>
        </div>
      </div>
    </motion.div>
  );
}