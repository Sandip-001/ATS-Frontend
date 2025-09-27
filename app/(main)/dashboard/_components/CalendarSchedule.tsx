"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, parseISO, isWithinInterval } from "date-fns";
import { CalendarDays } from "lucide-react";
import { scheduleData } from "@/services/Constants";
import {motion} from "framer-motion"

export default function CalendarSchedule() {
  const [range, setRange] = useState<DateRange | undefined>();

  // Filter events within selected range
  const filteredData = scheduleData
    .filter((d) => {
      if (!range?.from || !range?.to) return false;
      const eventDate = parseISO(d.date);
      return isWithinInterval(eventDate, { start: range.from, end: range.to });
    })
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-full lg:h-[817px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* 🔹 Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold">My Schedule</h2>
        <CalendarDays className="w-6 h-6 text-blue-600" />
      </div>

      {/* 📅 Calendar (Fixed) */}
      <div className="w-full flex justify-center mb-4 shrink-0">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          className="w-full max-w-3xl border rounded-xl p-4 shadow-sm"
          captionLayout="dropdown"
        />
      </div>

      {/* 📋 Scrollable Schedule List */}
      <div className="flex-1 overflow-y-auto pr-2 mt-2">
        {range?.from && range?.to ? (
          filteredData.length > 0 ? (
            filteredData.map((day, index) => (
              <div key={index} className="mb-8">
                {/* 📆 Date Header */}
                <h3 className="text-lg font-semibold text-blue-600 mb-3 border-l-4 border-blue-500 pl-2">
                  {format(parseISO(day.date), "EEEE, MMM d yyyy")}
                </h3>

                {/* ⏱️ Events under this date */}
                <div className="space-y-4">
                  {day.events.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-start bg-blue-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                      <p className="text-sm text-blue-700 font-semibold w-20 shrink-0">
                        {event.time}
                      </p>
                      <div>
                        <p className="font-medium text-gray-800">
                          {event.title}
                        </p>
                        <p className="text-gray-600 text-sm">{event.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm mt-8">
              No events found for this range.
            </p>
          )
        ) : (
          <p className="text-gray-400 text-center text-sm mt-8">
            Please select a start and end date to view schedules.
          </p>
        )}
      </div>
    </motion.div>
  );
}
