'use server'

import { db } from "@/lib/firebase/adminConfig";
import { Project, Task } from "@/types";
import { firestore } from "firebase-admin";

export async function getProjects() {
    const snapshot = await db.collection('projects').get();
    const projects: Project[] = [];
    
    snapshot.forEach(doc => {
        const projectData = doc.data() as Project;

        if (projectData.createdAt instanceof firestore.Timestamp) {
            projectData.createdAt = projectData.createdAt.toDate();
        }

        projectData.id = doc.id;
        projects.push(projectData);
    });
    return projects;
};

export async function saveProject(formdata: any) {
    
    const newProject = {
        id: '',  
        name: formdata.name,
        description: formdata.description,
        status: formdata.status,
        progress: 0,
        dueDate: formdata.dueDate,
        createdAt: new Date(),
        tasks: [],
        memberIds: [],
    };

    const docRef = await db.collection('projects').add(newProject);
}

export async function updateProject(formdata: any, id: string) {
    const updatedProject: Partial<Project> = {
        ...formdata,
    };
    
    await db.collection('projects').doc(id).update(updatedProject);
}

export async function deleteProject(id: string) {
    await db.collection('projects').doc(id).delete();
}

export async function addMemberToProject(projectId: string, memberId: string[]) {
    const projectRef = db.collection('projects').doc(projectId);
    
    await projectRef.update({
        memberIds: firestore.FieldValue.arrayUnion(...memberId),
    });
}

export async function removeProjectMember(projectId: string, memberId: string) {
    const projectRef = db.collection('projects').doc(projectId);

    await projectRef.update({
        memberIds: firestore.FieldValue.arrayRemove(memberId),
    });
}

export async function addTaskToProject(projectId: string, task: Task) {
    const projectRef = db.collection('projects').doc(projectId);
    const newTaskRef = db.collection('tasks').doc();  // Cria uma nova tarefa
    await newTaskRef.set(task);

    await projectRef.update({
        tasks: firestore.FieldValue.arrayUnion(newTaskRef.id),
    });
}

export async function removeTaskFromProject(projectId: string, taskId: string) {
    const projectRef = db.collection('projects').doc(projectId);
    await projectRef.update({
        tasks: firestore.FieldValue.arrayRemove(taskId),
    });
}