import { ProjectProvider } from "./ProjectContext";
import { TaskProvider } from "./TaskContext";


export default function AppWrapper({children}: {children: React.ReactNode}) {

    return (
        <ProjectProvider>
            <TaskProvider>
                {children}
            </TaskProvider>
        </ProjectProvider>
    )
    
}