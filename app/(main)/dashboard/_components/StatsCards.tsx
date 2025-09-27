"use client";

import { motion } from "framer-motion";
import { statsData } from "@/services/Constants";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {statsData.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
        >
          {/* Top Row: Icon + Title */}
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gray-100 text-indigo-500">
              {stat.icon}
            </div>
            <h3 className="text-gray-500 font-medium">{stat.title}</h3>
          </div>

          {/* Middle Row: Count + Change */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
            <div
              className={`flex items-center px-2 py-1 rounded-lg text-sm font-semibold ${
                stat.positive
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {stat.positive ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {stat.change}
            </div>
          </div>

          {/* Bottom Row: Update Info */}
          <div className="mt-4 border-t pt-2">
            <p className="text-xs text-gray-400">Update: {stat.updatedOn}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
