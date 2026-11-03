"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Task, TaskPriority, TaskType } from "@/types/task";

interface TaskModalProps {
  initialDate: string;
  taskToEdit?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskModal({
  initialDate,
  taskToEdit,
  onClose,
  onSave,
  onDelete,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState("");
  const [type, setType] = useState<TaskType>("task");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(taskToEdit.title);
      setDate(taskToEdit.date);
      setTime(taskToEdit.time || "");
      setType(taskToEdit.type);
      setPriority(taskToEdit.priority);
      setNotes(taskToEdit.notes || "");
    } else {
      setDate(initialDate);
    }
  }, [taskToEdit, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onSave({
      id: taskToEdit ? taskToEdit.id : `t-${Date.now()}`,
      title: title.trim(),
      date,
      time,
      type,
      priority,
      notes: notes.trim(),
      completed: taskToEdit ? taskToEdit.completed : false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-mono-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-mono-300 shadow-2xl max-w-md w-full overflow-hidden">
        <div className="px-5 py-4 border-b border-mono-200 flex items-center justify-between bg-mono-50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-mono-900">
            {taskToEdit ? "Edit Schedule Entry" : "Create New Plan Item"}
          </h3>
          <button
            onClick={onClose}
            className="text-mono-400 hover:text-mono-900 p-1 rounded hover:bg-mono-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
              Task or Milestone Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete System Architecture Document"
              className="w-full px-3 py-2 text-sm border border-mono-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mono-900 bg-white placeholder-mono-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
                Target Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-mono-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mono-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
                Time (Optional)
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-mono-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mono-900 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="w-full px-3 py-1.5 text-xs border border-mono-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mono-900 bg-white"
              >
                <option value="task">Deliverable / Task</option>
                <option value="event">Meeting / Event</option>
                <option value="milestone">Key Milestone</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-1.5 text-xs border border-mono-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mono-900 bg-white"
              >
                <option value="high">High (Critical)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
              Notes / Success Criteria
            </label>
            <textarea
              rows={2.5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Define deliverables or dependencies..."
              className="w-full px-3 py-2 text-xs border border-mono-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mono-900 bg-white placeholder-mono-400"
            />
          </div>

          <div className="pt-3 border-t border-mono-200 flex items-center justify-between">
            {taskToEdit && (
              <button
                type="button"
                onClick={() => onDelete(taskToEdit.id)}
                className="px-3 py-1.5 text-xs text-mono-600 border border-mono-300 hover:border-black hover:text-black rounded transition"
              >
                Delete
              </button>
            )}
            <div className="flex items-center space-x-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs border border-mono-300 text-mono-700 rounded hover:bg-mono-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-mono-950 text-white rounded font-medium hover:bg-mono-800 transition shadow-sm"
              >
                Save Entry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}