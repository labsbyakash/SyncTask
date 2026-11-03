// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import MetricBar from "@/components/MetricBar";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import DayModal from "@/components/DayModal";
import TaskModal from "@/components/TaskModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import { Task } from "@/types/task";
import { DEFAULT_SAMPLE_TASKS, SYSTEM_TODAY_STR } from "@/data/defaultTasks";

const STORAGE_KEY = "CHRONOS_MINIMAL_TASKS_2026";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [taskModalState, setTaskModalState] = useState<{
    open: boolean;
    date: string;
    task?: Task | null;
  }>({ open: false, date: SYSTEM_TODAY_STR, task: null });
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state after mount to avoid SSR mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTasks(JSON.parse(saved));
      } else {
        setTasks(DEFAULT_SAMPLE_TASKS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_TASKS));
      }
    } catch {
      setTasks(DEFAULT_SAMPLE_TASKS);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const isTaskOverdue = (task: Task) => {
    if (task.completed) return false;
    return task.date < SYSTEM_TODAY_STR;
  };

  const handleToggleComplete = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextState = !t.completed;
        triggerToast(nextState ? "Task marked as completed" : "Task marked pending");
        return { ...t, completed: nextState };
      }
      return t;
    });
    saveTasks(updated);
  };

  const handleSaveTask = (savedTask: Task) => {
    const exists = tasks.some((t) => t.id === savedTask.id);
    let nextTasks: Task[];
    if (exists) {
      nextTasks = tasks.map((t) => (t.id === savedTask.id ? savedTask : t));
      triggerToast("Plan item updated");
    } else {
      nextTasks = [...tasks, savedTask];
      triggerToast("New milestone added to calendar");
    }
    saveTasks(nextTasks);
    setTaskModalState({ open: false, date: SYSTEM_TODAY_STR, task: null });
  };

  const handleDeleteTask = (id: string) => {
    const nextTasks = tasks.filter((t) => t.id !== id);
    saveTasks(nextTasks);
    triggerToast("Item deleted");
    if (taskModalState.open) {
      setTaskModalState({ open: false, date: SYSTEM_TODAY_STR, task: null });
    }
  };

  const handleResetData = () => {
    saveTasks([...DEFAULT_SAMPLE_TASKS]);
    setCurrentDate(new Date(2026, 10, 1));
    setIsResetOpen(false);
    triggerToast("Calendar restored to November 2026 baseline");
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <>
      <Toast message={toastMessage} />

      <Header
        onOpenNewTask={() =>
          setTaskModalState({ open: true, date: SYSTEM_TODAY_STR, task: null })
        }
        onOpenReset={() => setIsResetOpen(true)}
      />

      <MetricBar tasks={tasks} isTaskOverdue={isTaskOverdue} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col lg:flex-row gap-6">
        <Calendar
          currentDate={currentDate}
          onNavigateMonth={(delta) => {
            const next = new Date(currentDate);
            next.setMonth(next.getMonth() + delta);
            setCurrentDate(next);
          }}
          onGoToToday={() => {
            setCurrentDate(new Date(2026, 10, 1));
            triggerToast("Navigated to November 2026");
          }}
          tasks={tasks}
          onSelectDay={(dateStr) => setSelectedDate(dateStr)}
          onQuickAddTask={(dateStr) =>
            setTaskModalState({ open: true, date: dateStr, task: null })
          }
          isTaskOverdue={isTaskOverdue}
          systemTodayStr={SYSTEM_TODAY_STR}
        />

        <Sidebar
          tasks={tasks}
          isTaskOverdue={isTaskOverdue}
          onToggleComplete={handleToggleComplete}
          onSelectDay={(dateStr) => setSelectedDate(dateStr)}
          systemTodayStr={SYSTEM_TODAY_STR}
        />
      </main>

      {selectedDate && (
        <DayModal
          dateStr={selectedDate}
          tasks={tasks}
          onClose={() => setSelectedDate(null)}
          onAddTask={(dateStr) =>
            setTaskModalState({ open: true, date: dateStr, task: null })
          }
          onEditTask={(task) => {
            setSelectedDate(null);
            setTaskModalState({ open: true, date: task.date, task });
          }}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          isTaskOverdue={isTaskOverdue}
        />
      )}

      {taskModalState.open && (
        <TaskModal
          initialDate={taskModalState.date}
          taskToEdit={taskModalState.task}
          onClose={() =>
            setTaskModalState({ open: false, date: SYSTEM_TODAY_STR, task: null })
          }
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      {isResetOpen && (
        <ConfirmModal
          onClose={() => setIsResetOpen(false)}
          onConfirm={handleResetData}
        />
      )}
    </>
  );
}