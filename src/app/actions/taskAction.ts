'use server'
import { db } from "@/lib/firebase/adminConfig";
import { Task, Status } from "@/types";
import { firestore } from "firebase-admin";

// const snapshot = await db.collection('projects').get();
//     const projects: Project[] = [];
    
//     snapshot.forEach(doc => {
//         const projectData = doc.data() as Project;

//         if (projectData.createdAt instanceof firestore.Timestamp) {
//             projectData.createdAt = projectData.createdAt.toDate();
//         }

//         projectData.id = doc.id;
//         projects.push(projectData);
//     });
//     return projects;

export async function getTasks() {
    const snapshot = await db.collection('tasks').get();
    const tasks: Task[] = [];
    
    snapshot.forEach(doc => {
        const taskData = doc.data() as Task;

        // Convertendo o campo 'createdAt' para uma instância de Date
        if (taskData.createdAt instanceof firestore.Timestamp) {
            taskData.createdAt = taskData.createdAt.toDate();
        }

        taskData.id = doc.id;

        tasks.push(taskData);
    });
    
    return tasks;
}

export async function saveTask(data: any) {
    const newTask: Task = {
        id: '',
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        projectId: data.projectId,
        assigneeId: data.assigneeId,
        createdAt: new Date(),
        userId: data.userId
    };

    const docRef = await db.collection('tasks').add(newTask);
    console.log(`Tarefa criada com ID: ${docRef.id}`);
    return docRef.id;
}

export async function updateTask(data: any, taskId: string) {
    const updatedTask: Partial<Task> = {
        ...data,
    };
    
    await db.collection('tasks').doc(taskId).update(updatedTask);
    console.log(`Tarefa com ID ${taskId} atualizada.`);
}

export async function deleteTask(taskId: string) {
    await db.collection('tasks').doc(taskId).delete();
    console.log(`Tarefa com ID ${taskId} deletada.`);
}

export async function addMemberToTask(taskId: string, memberId: string) {
    const taskRef = db.collection('tasks').doc(taskId);
    await taskRef.update({
        assigneeId: memberId,
    });
    console.log(`Membro ${memberId} atribuído à tarefa ${taskId}`);
}

export async function removeMemberFromTask(taskId: string) {
    const taskRef = db.collection('tasks').doc(taskId);
    
    await taskRef.update({
        assigneeId: firestore.FieldValue.delete(),
    });
    console.log(`Membro removido da tarefa ${taskId}`);
}

export async function updateTaskStatus(taskId: string, status: Status) {
    const taskRef = db.collection('tasks').doc(taskId);

    await taskRef.update({
        status: status,
    });

    console.log(`Status da tarefa ${taskId} alterado para ${status}`);
}
