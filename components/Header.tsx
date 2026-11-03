"use client";

import React from "react";
import { Plus, Download, RotateCcw } from "lucide-react";

interface HeaderProps {
  onOpenNewTask: () => void;
  onOpenReset: () => void;
}

export default function Header({ onOpenNewTask, onOpenReset }: HeaderProps) {
  const handleExport = () => {
    window.print();
  };

  return (
    <header className="border-b border-mono-200 bg-white sticky top-0 z-30 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-mono-950 text-white flex items-center justify-center font-bold text-base tracking-tighter">
            C
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-mono-950 flex items-center gap-2">
              Chronos{" "}
              <span className="text-xs font-normal text-mono-400 border border-mono-200 rounded px-1.5 py-0.5">
                B&W Edition
              </span>
            </h1>
            <p className="text-[11px] text-mono-500 hidden sm:block">
              Timeline & Delay Risk Diagnostic
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenNewTask}
            className="inline-flex items-center px-3.5 py-1.5 rounded-md bg-mono-950 text-white text-xs font-medium hover:bg-mono-800 transition shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Add Task</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center px-3.5 py-1.5 rounded-md border border-mono-300 bg-white text-mono-900 text-xs font-medium hover:bg-mono-50 hover:border-mono-400 transition shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export / Print</span>
          </button>

          <button
            onClick={onOpenReset}
            title="Reset to sample data"
            className="p-1.5 rounded-md text-mono-400 hover:text-mono-900 hover:bg-mono-100 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}