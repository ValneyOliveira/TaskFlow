'use client'

import { db } from "@/lib/firebase/firebaseConfig";
import { Task } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from "react";


type TaskProps = {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>> | undefined;
    //
    searchItem: string;
    setSearchItem: Dispatch<SetStateAction<string>>;
    //
    filterByProjectId: string; 
    setFilterByProjectId: Dispatch<SetStateAction<string>> | undefined; 
  };

const TaskContext = createContext<TaskProps>({
    tasks: [],
    setTasks: undefined,
    searchItem: '',
    setSearchItem: () => {},
    filterByProjectId: '',
    setFilterByProjectId: undefined
})

export function TaskProvider({children}: {children: React.ReactNode}) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [copyTasks, setCopyTasks] = useState<Task[]>([])
        
    const [searchItem, setSearchItem] = useState<string>('')
    const [filterByProjectId, setFilterByProjectId] = useState<string>('all')

    useEffect(() => {
        function isSearching() {
            const data = copyTasks;
            if(searchItem){
                const filtered = data.filter(task => task.title.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()))
                setTasks(filtered)
            } else if(filterByProjectId){
                const filtered = data.filter(task => task.projectId == filterByProjectId)
                if(filterByProjectId !== 'all') { setTasks(filtered) } else { setTasks(data) }
            }
            else { setTasks(data) }
        }
        isSearching();
    }, [searchItem, filterByProjectId])

    useEffect(() => {
        const unsubscribe =  onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const fetchedTasks: Task[] = [];
            snapshot.forEach((doc) => {
                const taskData = doc.data() as Task;
                taskData.id = doc.id;
                fetchedTasks.push(taskData)
            })
            setTasks(fetchedTasks)
            setCopyTasks(fetchedTasks)
        });
        
        return () => unsubscribe();
    }, []);


    return (
        <TaskContext.Provider value={
            { 
                tasks, setTasks,
                searchItem, setSearchItem, 
                filterByProjectId, setFilterByProjectId,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext(){
    return useContext(TaskContext);
}