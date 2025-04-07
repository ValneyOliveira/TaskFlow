
import { getProjects } from '@/app/actions/projectAction';
import { ToggleTheme } from '@/components/buttons/ToggleTheme'
import { StatsCard } from '@/components/shared/StatsCard';
import { mockTasks, mockUsers } from '@/data/mockData';
import * as Lucide from 'lucide-react';


export default async function Dashboard(){
    // Calculate stats
    const totalProjects = (await getProjects()).length;
    const completedProjects = (await getProjects()).filter(p => p.status === "completed").length;
    const inProgressProjects = (await getProjects()).filter(p => p.status === "in_progress").length;

    const totalTasks = mockTasks.length;
    const completedTasks = mockTasks.filter(t => t.status === "completed").length;
    const pendingTasks = mockTasks.filter(t => t.status === "pending").length;
    const inProgressTasks = mockTasks.filter(t => t.status === "in_progress").length;

    const totalMembers = mockUsers.length;

   
    
    {/* <ToggleTheme /> */}
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm">Visão geral dos seus projetos e tarefas.</p>
            </div>
      
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                    title='total'
                    description=''
                    value={totalProjects} 
                    icon={Lucide.FolderKanban}
                />
                <StatsCard 
                    title="Projetos em Andamento" 
                    value={inProgressProjects} 
                    icon={Lucide.Clock}
                    description={`${Math.round((inProgressProjects/totalProjects)*100)}% dos projetos`}
                    />
                <StatsCard 
                    title="Tarefas Pendentes" 
                    value={pendingTasks + inProgressTasks} 
                    icon={Lucide.LayoutGrid}
                    description={`${Math.round(((pendingTasks + inProgressTasks)/totalTasks)*100)}% das tarefas`}
                    />
                <StatsCard 
                    title="Membros de Equipe" 
                    value={totalMembers} 
                    icon={Lucide.Users}
                    description="Colaboradores ativos"
                />
            </div>
        </div>
    )
}