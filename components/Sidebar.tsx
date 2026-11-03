"use client";

import React from "react";
import { Check, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";
import { Task } from "@/types/task";

interface SidebarProps {
  tasks: Task[];
  isTaskOverdue: (task: Task) => boolean;
  onToggleComplete: (id: string) => void;
  onSelectDay: (dateStr: string) => void;
  systemTodayStr: string;
}

export default function Sidebar({
  tasks,
  isTaskOverdue,
  onToggleComplete,
  onSelectDay,
  systemTodayStr,
}: SidebarProps) {
  const overdueTasks = tasks
    .filter((t) => isTaskOverdue(t))
    .sort((a, b) => a.date.localeCompare(b.date));

  const [tY, tM, tD] = systemTodayStr.split("-").map(Number);
  const todayDate = new Date(tY, tM - 1, tD);
  const nextWeekDate = new Date(todayDate);
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);

  const upcomingTasks = tasks
    .filter((t) => {
      const [y, m, d] = t.date.split("-").map(Number);
      const cur = new Date(y, m - 1, d);
      return cur >= todayDate && cur <= nextWeekDate;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-5 no-print">
      {/* Overdue */}
      <div className="bg-white rounded-xl border-2 border-mono-950 p-4 shadow-sm flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-mono-200">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-mono-950" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-mono-950">
              Delayed / Overdue
            </h3>
          </div>
          <span className="text-[10px] font-semibold bg-mono-950 text-white px-1.5 py-0.5 rounded">
            {overdueTasks.length}
          </span>
        </div>

        <p className="text-[11px] text-mono-500 my-2">
          Tasks past due date that demand immediate rescheduling or closure:
        </p>

        <div className="space-y-2 mt-1 max-h-56 overflow-y-auto pr-1">
          {overdueTasks.length === 0 ? (
            <div className="py-4 text-center border border-dashed border-mono-200 rounded-lg text-mono-400 text-xs">
              <Check className="w-4 h-4 mx-auto mb-1 text-mono-500" />
              <span>No delayed tasks! On track.</span>
            </div>
          ) : (
            overdueTasks.map((task) => (
              <div
                key={task.id}
                className="p-2.5 rounded-lg border-2 border-mono-950 bg-mono-50 flex items-center justify-between text-xs transition"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-mono-950 shrink-0" />
                    <span className="font-semibold text-mono-950 truncate">
                      {task.title}
                    </span>
                  </div>
                  <div className="text-[10px] text-mono-500 mt-1 flex items-center gap-2">
                    <span>
                      Due: <strong>{task.date}</strong>
                    </span>
                    <span className="text-mono-950 font-bold uppercase tracking-wider text-[9px] underline">
                      Delay Detected
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onToggleComplete(task.id)}
                  title="Mark Done"
                  className="p-1 hover:bg-mono-200 rounded text-mono-800 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-xl border border-mono-200 p-4 shadow-sm flex-1 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-mono-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-mono-700">
            Next 7 Days Agenda
          </h3>
          <span className="text-[10px] text-mono-400 font-mono">Upcoming</span>
        </div>
        <div className="space-y-2.5 mt-3 overflow-y-auto max-h-72 pr-1">
          {upcomingTasks.length === 0 ? (
            <div className="py-4 text-center border border-dashed border-mono-200 rounded-lg text-mono-400 text-xs">
              <span>No tasks in the immediate 7 days.</span>
            </div>
          ) : (
            upcomingTasks.map((task) => (
              <div
                key={task.id}
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                  task.completed
                    ? "bg-mono-100 text-mono-400 border-mono-200"
                    : "bg-white border-mono-200"
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div
                    className={`font-medium truncate ${
                      task.completed ? "line-through" : "text-mono-900"
                    }`}
                  >
                    {task.title}
                  </div>
                  <div className="text-[10px] text-mono-500 mt-0.5 flex items-center gap-2">
                    <span>{task.date}</span>
                    <span className="uppercase tracking-widest text-[9px] bg-mono-100 px-1 rounded">
                      {task.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectDay(task.date)}
                  className="text-mono-400 hover:text-mono-950 p-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-mono-50 rounded-xl border border-mono-200 p-3.5 text-xs text-mono-600">
        <div className="font-semibold text-mono-900 mb-1 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Strategic Planning Tip</span>
        </div>
        <p className="text-[11px] text-mono-500 leading-relaxed">
          Break large objectives into sequential day tasks. Check them off promptly
          to keep the delay score at 0.
        </p>
      </div>
    </aside>
  );
}