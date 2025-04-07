'use client'

import { db } from "@/lib/firebase/firebaseConfig";
import { Project, Task, User } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from "react";


type ProjectContextProps = {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    searchItem: string;
    setSearchItem: Dispatch<SetStateAction<string>>;
  };

const ProjectContext = createContext<ProjectContextProps>({
    projects: [],
    setProjects: () => {},
    searchItem: '',
    setSearchItem: () => {},
})

export function ProjectProvider({children}: {children: React.ReactNode}) {
    const [projects, setProjects] = useState<Project[]>([])
    const [copyData, setCopyData] = useState<Project[]>([])
        
    const [searchItem, setSearchItem] = useState<string>('')


    useEffect(() => {
            async function isSearching() {
                const data = copyData ;

                if(searchItem){
                    const filtered = data.filter(project => project.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()))
                    setProjects(filtered)
                } else {
                    setProjects(copyData)
                }
            }
            isSearching();
        }, [searchItem])
    
        useEffect(() => {
            const unsubscribe =  onSnapshot(collection(db, 'projects'), (snapshot) => {
                const fetchedProjects: Project[] = [];
                snapshot.forEach((doc) => {
                    const projectData = doc.data() as Project;
                    projectData.id = doc.id;
                    fetchedProjects.push(projectData)
                })
                setProjects(fetchedProjects)
                setCopyData(fetchedProjects)
            });
            return () => unsubscribe();
        }, []);

    return (
        <ProjectContext.Provider value={
            { 
                projects, setProjects,
                searchItem, setSearchItem
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjectContext(){
    const context = useContext(ProjectContext);
    if (!context) throw new Error('useProjectsContext must be used within a ProjectsProvider');
    return context;
}