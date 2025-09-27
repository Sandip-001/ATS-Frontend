"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { day: "Mon", Office: 60, Remote: 30 },
  { day: "Tue", Office: 70, Remote: 40 },
  { day: "Wed", Office: 50, Remote: 20 },
  { day: "Thu", Office: 80, Remote: 50 },
  { day: "Fri", Office: 65, Remote: 35 },
  { day: "Sat", Office: 55, Remote: 25 },
  { day: "Sun", Office: 40, Remote: 10 },
];

export default function AttendanceChart() {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Attendance Overview</h2>
        <select className="border rounded-lg px-3 py-1 text-sm">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Animate bars with stagger */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="Office"
              fill="#6366f1"
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            />
            <Bar
              dataKey="Remote"
              fill="#f59e0b"
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}