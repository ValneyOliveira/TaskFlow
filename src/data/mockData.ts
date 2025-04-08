import { Project, Task, User } from "@/types";

// Usuários mock
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "João Silva",
    email: "joao@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "user-2",
    name: "Maria Oliveira",
    email: "maria@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",

  },
  {
    id: "user-3",
    name: "Pedro Santos",
    email: "pedro@example.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",

  },
  {
    id: "user-4",
    name: "Ana Costa",
    email: "ana@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  
  },
  {
    id: "user-5",
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  
  }
];

// Tarefas mock
//  const mockTasks: Task[] = [
//   {
//     id: "task-1",
//     title: "Criar wireframes",
//     description: "Criar wireframes para todas as páginas do aplicativo.",
//     status: "completed",
//     priority: "high",
//     dueDate: new Date(2023, 5, 20),
//     projectId: "project-1",
//     assigneeId: "user-1",
//     createdAt: new Date(2023, 5, 10)
//   },
//   {
//     id: "task-2",
//     title: "Implementar autenticação",
//     description: "Implementar sistema de login e registro.",
//     status: "in_progress",
//     priority: "high",
//     dueDate: new Date(2023, 6, 5),
//     projectId: "project-1",
//     assigneeId: "user-3",
//     createdAt: new Date(2023, 5, 15)
//   },
  
// ];