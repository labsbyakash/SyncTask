"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ onClose, onConfirm }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-mono-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-mono-300 shadow-xl max-w-sm w-full p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-mono-100 border border-mono-300 text-mono-900 mx-auto flex items-center justify-center mb-3">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-sm text-mono-950">Reset Sample Schedule?</h3>
        <p className="text-xs text-mono-500 mt-1 mb-4">
          This will reload sample tasks for November 2026 and replace custom entries.
        </p>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs border border-mono-300 rounded text-mono-700 hover:bg-mono-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-xs bg-mono-950 text-white rounded hover:bg-mono-800 font-medium"
          >
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
}