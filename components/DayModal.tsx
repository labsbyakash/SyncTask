"use client";

import React from "react";
import { Plus, X, Clock, Pencil, Trash2, CalendarCheck } from "lucide-react";
import { Task } from "@/types/task";

interface DayModalProps {
  dateStr: string;
  tasks: Task[];
  onClose: () => void;
  onAddTask: (dateStr: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
  isTaskOverdue: (task: Task) => boolean;
}

export default function DayModal({
  dateStr,
  tasks,
  onClose,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  isTaskOverdue,
}: DayModalProps) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const clickedDate = new Date(y, m - 1, d);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayTasks = tasks.filter((t) => t.date === dateStr);

  return (
    <div className="fixed inset-0 z-50 bg-mono-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-mono-300 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-mono-200 flex items-center justify-between bg-mono-50">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-mono-400">
              {days[clickedDate.getDay()]}
            </span>
            <h3 className="text-lg font-bold text-mono-950">
              {months[m - 1]} {d}, {y}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onAddTask(dateStr)}
              className="px-2.5 py-1 text-xs bg-mono-950 text-white rounded hover:bg-mono-800 transition flex items-center gap-1 font-medium"
            >
              <Plus className="w-3 h-3" />
              <span>Add Here</span>
            </button>
            <button
              onClick={onClose}
              className="text-mono-400 hover:text-mono-900 p-1 rounded hover:bg-mono-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {dayTasks.length === 0 ? (
            <div className="py-8 text-center text-mono-400">
              <CalendarCheck className="w-8 h-8 mx-auto mb-2 text-mono-300" />
              <p className="text-xs">No tasks scheduled for this date.</p>
              <button
                onClick={() => onAddTask(dateStr)}
                className="mt-3 px-3 py-1.5 text-xs bg-mono-950 text-white rounded font-medium hover:bg-mono-800 transition"
              >
                Create an Entry
              </button>
            </div>
          ) : (
            dayTasks.map((task) => {
              const overdue = isTaskOverdue(task);
              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-lg border flex items-start justify-between gap-3 transition ${
                    task.completed
                      ? "bg-mono-50 border-mono-200"
                      : overdue
                      ? "bg-mono-50/70 border-mono-950"
                      : "bg-white border-mono-300 hover:border-mono-400"
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleComplete(task.id)}
                      className="mt-1 w-4 h-4 rounded text-mono-950 border-mono-400 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-mono-950"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold ${
                            task.completed
                              ? "line-through text-mono-400"
                              : "text-mono-950"
                          }`}
                        >
                          {task.title}
                        </span>
                        {overdue && (
                          <span className="text-[9px] uppercase font-bold tracking-tight bg-mono-950 text-white px-1.5 py-0.5 rounded">
                            Delayed
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 flex-wrap text-[10px] text-mono-500 font-medium">
                        {task.time && (
                          <span className="flex items-center gap-1 border border-mono-200 px-1.5 py-0.5 rounded bg-white">
                            <Clock className="w-3 h-3" /> {task.time}
                          </span>
                        )}
                        <span className="uppercase tracking-wider border border-mono-200 px-1.5 py-0.5 rounded bg-white text-mono-600">
                          {task.type}
                        </span>
                        <span className="border border-mono-200 px-1.5 py-0.5 rounded bg-white text-mono-600">
                          {task.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>

                      {task.notes && (
                        <p className="text-[11px] text-mono-500 mt-2 bg-mono-100 p-2 rounded">
                          {task.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEditTask(task)}
                      className="p-1 text-mono-400 hover:text-mono-900 rounded hover:bg-mono-200 transition"
                      title="Edit Task"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1 text-mono-400 hover:text-mono-900 rounded hover:bg-mono-200 transition"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-mono-200 bg-mono-50 flex items-center justify-between text-xs text-mono-500">
          <span>
            {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"} scheduled
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-mono-300 rounded hover:bg-white text-mono-800 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}