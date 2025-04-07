import { db } from "@/lib/firebase/adminConfig";
import { Task, Status } from "@/types";
import { auth, firestore } from "firebase-admin";

export async function getTasks(projectId: string) {
    const snapshot = await db.collection('tasks')
        .where('projectId', '==', projectId)
        .get();
    
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

export async function saveTask(formdata: any, projectId: string, userId: string) {
    const newTask: Task = {
        id: '',
        title: formdata.title,
        description: formdata.description,
        status: formdata.status,
        priority: formdata.priority,
        dueDate: formdata.dueDate,
        projectId: projectId,
        assigneeId: formdata.assigneeId,
        createdAt: new Date(),
    };

    const docRef = await db.collection('tasks').add({...newTask, userId: userId});
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