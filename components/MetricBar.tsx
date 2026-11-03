"use client";

import React from "react";
import { Layers, CheckCircle, AlertCircle, PieChart } from "lucide-react";
import { Task } from "@/types/task";

interface MetricBarProps {
  tasks: Task[];
  isTaskOverdue: (task: Task) => boolean;
}

export default function MetricBar({ tasks, isTaskOverdue }: MetricBarProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter((t) => isTaskOverdue(t)).length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="border-b border-mono-200 bg-mono-50 py-3 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-mono-900">
          <div className="bg-white p-3 rounded-lg border border-mono-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-mono-400 block">
                Total Tasks
              </span>
              <span className="text-xl font-bold tracking-tight">{total}</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-mono-200 flex items-center justify-center text-mono-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-mono-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-mono-400 block">
                Completed
              </span>
              <span className="text-xl font-bold tracking-tight">{completed}</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-mono-200 flex items-center justify-center text-mono-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-mono-300 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-mono-950"></div>
            <div className="pl-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-mono-500 block">
                Delayed / Overdue
              </span>
              <span className="text-xl font-bold tracking-tight">{overdue}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-mono-950 text-white flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-mono-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-mono-400 block">
                Completion Rate
              </span>
              <span className="text-xl font-bold tracking-tight">{rate}%</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-mono-200 flex items-center justify-center text-mono-600">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}