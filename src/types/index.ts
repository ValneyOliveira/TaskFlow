import { format } from "date-fns";

export type Status = "pending" | "in_progress" | "completed" | "canceled";
export type MemberRole = "viewer" | "editor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // role: MemberRole;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  progress: number;
  dueDate?: Date | string;
  createdAt: Date;
  tasks: Task[];
  memberIds: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  projectId: string;
  assigneeId?: string;
  createdAt: Date;
  userId: string
}

export interface UserProfile {
  uid: string
  email?: string,
  phoneNumber?: string,
  emailVerified: true;
  password?: string;
  displayName?: string;
  photoURL?: string,
}

export function formattedDate(stringDate: string | undefined ) {
  const date = new Date(stringDate!)
  if(!stringDate) {
    return null
  } else {

    return format(date, "dd/MM/yyyy");
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case "low":
      return "border-l-green-400 dark:border-l-green-900";
    case "medium":
      return "border-l-yellow-400 dark:border-l-yellow-900";
    case "high":
      return "border-l-red-400 dark:border-l-red-900";
    default:
      return "border-l-gray-400 dark:border-l-gray-900";
  }
}

export function getStatusColor(status: string) {
  const statusColorMap: any = {
    pending: "border-l-gray-400 dark:border-l-gray-900",
    in_progress: "border-l-blue-400 dark:border-l-blue-900",
    completed: "border-l-green-400 dark:border-l-green-900",
    canceled: "border-l-red-400 dark:border-l-red-900"
  };

  return statusColorMap[status] || null;
}


