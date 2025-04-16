
import { getProjects } from '@/app/actions/projectAction';
import { getTasks } from '@/app/actions/taskAction';
import { Panel } from '@/components/dashboard/Panel';
import { StatsCard } from '@/components/shared/StatsCard'
import { mockUsers } from '@/data/mockData';
import * as Lucide from 'lucide-react';


export default async function Dashboard(){
    const totalProjects = (await getProjects()).length;
    const inProgressProjects = (await getProjects()).filter(p => p.status === "in_progress").length;

    const totalTasks = (await getTasks()).length;
    const pendingTasks = (await getTasks()).filter(t => t.status === "pending").length;
    const inProgressTasks = (await getTasks()).filter(t => t.status === "in_progress").length;

    const totalMembers = mockUsers.length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm">Visão geral dos seus projetos e tarefas.</p>
            </div>
      
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                    title='Total de Projetos'
                    value={totalProjects} 
                    icon={Lucide.FolderKanban}
                    description='Projetos ativos e concluídos'
                />
                <StatsCard 
                    title="Projetos em Andamento" 
                    value={inProgressProjects} 
                    icon={Lucide.Clock}
                    description={`${(inProgressProjects/totalProjects)*100}% dos projetos`}
                    />
                <StatsCard 
                    title="Tarefas Pendentes" 
                    value={pendingTasks + inProgressTasks} 
                    icon={Lucide.LayoutGrid}
                    description={`${(pendingTasks + inProgressTasks)/totalTasks*100}% das tarefas`}
                    />
                <StatsCard 
                    title="Membros de Equipe" 
                    value={totalMembers} 
                    icon={Lucide.Users}
                    description="Colaboradores ativos"
                />
            </div>

            <Panel />
        </div>
    )
}