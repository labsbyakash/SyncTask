"use client";

import React from "react";
import { Info } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none bg-mono-950 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center space-x-2 border border-mono-800 ${
        message ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <Info className="w-4 h-4 text-mono-300" />
      <span>{message || ""}</span>
    </div>
  );
}