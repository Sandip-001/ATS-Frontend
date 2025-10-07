"use client";
import { useAuth } from "@/app/provider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import StatsCards from "./_components/StatsCards";
import AttendanceChart from "./_components/AttendanceChart";
import AttendanceTable from "./_components/AttendanceTable";
import CalendarSchedule from "./_components/CalendarSchedule";

const Dashboard = () => {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth"); // redirect if not logged in
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="p-6 space-y-6">
        {/* First Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <StatsCards />
            <AttendanceChart />
          </div>

          {/* Right Side */}
          <div>
            <CalendarSchedule />
          </div>
        </div>

        {/* Second Section */}
        <div>
          <AttendanceTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
