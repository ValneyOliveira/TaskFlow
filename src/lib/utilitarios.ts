// Ordenar por data de prazo, os mais próximos primeiro

import { Project } from "@/app/types/project";

const getDeadlines = (activeProjects: any) => {

    const upcomingDeadlines = [...activeProjects].sort((a, b) => 
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      ).slice(0, 3);

      return upcomingDeadlines;
}


const formatDate = (project: any) => {
    const formattedDate = new Date(project.deadline).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return formattedDate;
}


