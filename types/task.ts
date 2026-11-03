export type TaskType = "task" | "event" | "milestone";
export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: TaskType;
  priority: TaskPriority;
  completed: boolean;
  notes?: string;
}