"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Task } from "@/types/task";

interface CalendarProps {
  currentDate: Date;
  onNavigateMonth: (delta: number) => void;
  onGoToToday: () => void;
  tasks: Task[];
  onSelectDay: (dateStr: string) => void;
  onQuickAddTask: (dateStr: string) => void;
  isTaskOverdue: (task: Task) => boolean;
  systemTodayStr: string;
}

export default function Calendar({
  currentDate,
  onNavigateMonth,
  onGoToToday,
  tasks,
  onSelectDay,
  onQuickAddTask,
  isTaskOverdue,
  systemTodayStr,
}: CalendarProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const quarter = Math.floor(month / 3) + 1;

  // Generate calendar days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { dayNum: number; dateStr: string; isOtherMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const date = new Date(year, month - 1, d);
    const dateStr = date.toISOString().split("T")[0];
    cells.push({ dayNum: d, dateStr, isOtherMonth: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ dayNum: d, dateStr, isOtherMonth: false });
  }

  const totalCellsNeeded = cells.length > 35 ? 42 : 35;
  const remaining = totalCellsNeeded - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const dateStr = `${month + 2 > 12 ? year + 1 : year}-${String((month + 2) % 12 || 12).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ dayNum: d, dateStr, isOtherMonth: true });
  }

  return (
    <div className="flex-1 bg-white rounded-xl border border-mono-200 shadow-sm p-4 sm:p-6 flex flex-col">
      {/* Controls & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-mono-200 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold tracking-tight text-mono-950">
              {monthNames[month]} {year}
            </h2>
            <span className="text-xs font-mono bg-mono-100 text-mono-700 px-2 py-0.5 rounded border border-mono-200">
              Q{quarter} Plan
            </span>
          </div>
          <p className="text-xs text-mono-500 mt-0.5">
            Track sequential targets, deadlines & execution bottlenecks
          </p>
        </div>

        <div className="flex items-center space-x-1.5 no-print">
          <button
            onClick={() => onNavigateMonth(-1)}
            className="p-2 border border-mono-200 rounded-md hover:bg-mono-100 text-mono-700 hover:text-black transition"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onGoToToday}
            className="px-3 py-1.5 border border-mono-200 rounded-md text-xs font-medium hover:bg-mono-100 text-mono-800 transition"
          >
            Today
          </button>
          <button
            onClick={() => onNavigateMonth(1)}
            className="p-2 border border-mono-200 rounded-md hover:bg-mono-100 text-mono-700 hover:text-black transition"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-px border border-mono-200 bg-mono-200 rounded-t-lg overflow-hidden text-center text-xs font-semibold text-mono-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-mono-50 py-2.5">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-px border-x border-b border-mono-200 bg-mono-200 rounded-b-lg overflow-hidden flex-1">
        {cells.map(({ dayNum, dateStr, isOtherMonth }, idx) => {
          const isToday = dateStr === systemTodayStr;
          const dayTasks = tasks.filter((t) => t.date === dateStr);
          const hasOverdue = dayTasks.some((t) => isTaskOverdue(t));

          return (
            <div
              key={idx}
              onClick={() => onSelectDay(dateStr)}
              className={`day-cell p-2 flex flex-col justify-between cursor-pointer group transition relative ${
                isOtherMonth
                  ? "bg-mono-50/70 text-mono-400"
                  : "bg-white text-mono-900 hover:bg-mono-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                    isToday
                      ? "bg-mono-950 text-white font-bold"
                      : hasOverdue
                      ? "border border-mono-950 text-mono-950"
                      : "text-mono-800"
                  }`}
                >
                  {dayNum}
                </span>

                {hasOverdue && (
                  <span className="text-[9px] uppercase tracking-tighter font-bold bg-mono-950 text-white px-1 rounded">
                    DELAY
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAddTask(dateStr);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition p-0.5 hover:bg-mono-200 rounded text-mono-700 no-print"
                  title={`Add task to ${dateStr}`}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Tasks list inside day */}
              <div className="space-y-1 flex-1 overflow-hidden">
                {dayTasks.slice(0, 3).map((task) => {
                  const overdue = isTaskOverdue(task);
                  return (
                    <div
                      key={task.id}
                      className={`text-[10px] px-1.5 py-0.5 rounded border truncate flex items-center gap-1 transition ${
                        task.completed
                          ? "line-through bg-mono-100 text-mono-400 border-mono-200"
                          : overdue
                          ? "border-dashed border-mono-950 bg-mono-100 font-medium text-mono-950"
                          : task.type === "milestone"
                          ? "bg-mono-950 text-white border-mono-950 font-semibold"
                          : "bg-white border-mono-300 text-mono-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          task.completed
                            ? "bg-mono-300"
                            : overdue
                            ? "bg-mono-950"
                            : task.type === "milestone"
                            ? "bg-white"
                            : "border border-mono-600"
                        }`}
                      />
                      <span className="truncate">
                        {task.time ? `${task.time} ` : ""}
                        {task.title}
                      </span>
                    </div>
                  );
                })}
                {dayTasks.length > 3 && (
                  <div className="text-[9px] font-semibold text-mono-500 pl-1">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Legend */}
      <div className="mt-4 pt-3 border-t border-mono-100 flex flex-wrap items-center justify-between text-[11px] text-mono-500 gap-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-mono-900 bg-white" />
            <span>Task</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-mono-950" />
            <span>Event / Milestone</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-mono-900 bg-mono-100" />
            <span className="font-medium text-mono-900">Delayed / Overdue</span>
          </div>
        </div>
        <span className="text-mono-400">Click any day cell to view or add scheduled tasks</span>
      </div>
    </div>
  );
}