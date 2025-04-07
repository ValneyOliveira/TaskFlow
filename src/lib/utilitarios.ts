

const formatDate = (project: any) => {
    const formattedDate = new Date(project.deadline).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return formattedDate;
}


