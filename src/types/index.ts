
export type Status = "pending" | "in_progress" | "completed" | "canceled";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
}


export const translateStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Pendente"
      break;
    case "in_progress":
      return "Em Andamento"
      break;
    case "completed":
      return "Concluído"
      break;
    case "canceled":
      return "Cancelado"
      break;
  }
}