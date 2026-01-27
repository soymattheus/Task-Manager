// status-config.ts
import { TaskStatus } from "@/types/task";
import { Clock, PlayCircle, CheckCircle2, XCircle } from "lucide-react";

export const STATUS_CONFIG = {
  "Not Started": {
    icon: Clock,
    styles: {
      card: "border-l-4 border-gray-400 bg-gray-50",
      title: "text-gray-700",
      description: "text-gray-500",
    },
  },
  Started: {
    icon: PlayCircle,
    styles: {
      card: "border-l-4 border-blue-500 bg-blue-50",
      title: "text-blue-700",
      description: "text-blue-600",
    },
  },
  Completed: {
    icon: CheckCircle2,
    styles: {
      card: "border-l-4 border-green-500 bg-green-50",
      title: "text-green-700",
      description: "text-green-600",
    },
  },
  Canceled: {
    icon: XCircle,
    styles: {
      card: "border-l-4 border-red-500 bg-red-50",
      title: "text-red-700",
      description: "text-red-600",
    },
  },
};

export const STATUS_STYLES: Record<
  TaskStatus,
  {
    column: string;
    card: string;
  }
> = {
  "Not Started": {
    column: "bg-gray-50 border-gray-300",
    card: "border-gray-300",
  },
  Started: {
    column: "bg-blue-50 border-blue-300",
    card: "border-blue-300",
  },
  Completed: {
    column: "bg-green-50 border-green-300",
    card: "border-green-300",
  },
  Canceled: {
    column: "bg-red-50 border-red-300",
    card: "border-red-300",
  },
};
