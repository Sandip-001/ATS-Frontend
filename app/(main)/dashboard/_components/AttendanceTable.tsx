"use client";
import { attendanceTable } from "@/services/Constants";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AttendanceTable() {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Attendance Overview</h2>
        <button className="text-primary text-sm font-medium border p-2 rounded-lg bg-gray-50">
          View All
        </button>
      </div>

      {/* Scrollable wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Employee Name</th>
              <th>Role</th>
              <th>Type</th>
              <th>Check In Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceTable.map((emp, idx) => (
              <motion.tr
                key={idx}
                className="border-t text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="py-3 flex items-center space-x-3">
                  <Image
                    src={"/user.png"}
                    alt={emp.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span>{emp.name}</span>
                </td>
                <td>{emp.role}</td>
                <td>{emp.type}</td>
                <td>{emp.checkIn}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === "On Time"
                        ? "bg-green-100 text-green-600"
                        : emp.status === "Leave"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
