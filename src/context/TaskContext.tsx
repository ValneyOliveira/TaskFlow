'use client'

import { db } from "@/lib/firebase/firebaseConfig";
import { Task } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from "react";


type TaskProps = {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>> | undefined;
    //
    listProject: string[];
    setListProjects: Dispatch<SetStateAction<string[]>> | undefined; 
    //
    searchItem: string;
    setSearchItem: Dispatch<SetStateAction<string>>;
    //
    filterByName: string; 
    setFilterByName: Dispatch<SetStateAction<string>> | undefined; 
  };

const TaskContext = createContext<TaskProps>({
    tasks: [],
    setTasks: undefined,
    listProject: [],
    setListProjects: undefined,
    searchItem: '',
    setSearchItem: () => {},
    filterByName: '',
    setFilterByName: undefined
})

export function TaskProvider({children}: {children: React.ReactNode}) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [listProject, setListProjects] = useState<string[]>([])
        
    const [searchItem, setSearchItem] = useState<string>('')
    const [filterByName, setFilterByName] = useState<string>('')

    useEffect(() => {
        const unsubscribe =  onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const fetchedTasks: Task[] = [];
            snapshot.forEach((doc) => {
                const taskData = doc.data() as Task;
                taskData.id = doc.id;
                fetchedTasks.push(taskData)
            })
            console.log(fetchedTasks)

            setTasks(fetchedTasks)
        });
        
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        function fetchedTasks(){
            if(searchItem) {
                const filter = tasks.filter(task => task.title.toLowerCase().includes(searchItem.toLowerCase())
                || task.priority.toLowerCase().includes(searchItem.toLowerCase()) || task.status.toLowerCase().includes(searchItem.toLowerCase())
            ); setTasks(filter) }

            else if(filterByName) {
                const filter = tasks.filter(task => task.title.toLowerCase().includes(searchItem.toLowerCase()))
                setTasks(filter)
            } else { setTasks(tasks) }

        }
        fetchedTasks();
    }, [searchItem, filterByName])


    return (
        <TaskContext.Provider value={
            { 
                tasks, setTasks, 
                listProject, setListProjects, 
                searchItem, setSearchItem, 
                filterByName, setFilterByName,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext(){
    return useContext(TaskContext);
}