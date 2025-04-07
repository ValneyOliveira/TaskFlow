import React from 'react'
import Link from 'next/link';

import { ProjectFormDialog } from '@/components/ProjectFormDialog';

import * as Lucide from 'lucide-react'
import { translateStatusText } from '@/types';
import { Button } from '@/components/ui/button';
import { ProjectDetailsCard } from '@/components/project/ProjectDetailsCard';
import { ProjectMembersCard } from '@/components/project/ProjectMembersCard';
import { mockUsers } from '@/data/mockData';
import { getProjects } from '@/app/actions/projectAction';
import ProjectTasksCard from '@/components/project/ProjectTasksCard';


export default async function ProjectDetails({ params }: { params: Promise<{ id: string }>}){
    const { id } = await params

    const projects = await getProjects()
    const filteredProject = projects.find(project => project.id === id)!
    const members = mockUsers

    return (
        <div className=''>
            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2  space-y-1 '>
                        <Button asChild className='h-8 w-8'>
                            <Link href={'/projects'}>
                                <Lucide.ArrowLeft />
                            </Link>
                        </Button>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-2xl font-bold tracking-tight'>{filteredProject.name}</h1>
                                <span className='text-[9px] py-0.5 px-1 rounded-md dark:bg-primary dark:text-black'>
                                    {translateStatusText(filteredProject.status)}
                                </span>
                            </div>
                            <p className='text-muted-foreground text-sm'>Gerencie seus projetos e acompanhe o progresso.</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-x-4'>
                        <ProjectFormDialog action='form' project={filteredProject} actionName='Editar'/>
                        <ProjectFormDialog action='trash' projectId={id} actionName='Excluir'/>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-8 my-5'>
                <ProjectDetailsCard 
                    project={filteredProject}
                />
                <ProjectMembersCard 
                    project={filteredProject}
                    members={members}
                />
                <ProjectTasksCard projectTasks={filteredProject.tasks}/>
            </div>
        </div>
    )
}