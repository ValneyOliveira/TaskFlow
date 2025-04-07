'use client'

import React  from 'react'
import * as Lucide from 'lucide-react';

import { ProjectCard } from '@/components/ProjectCard';
import { getProjects } from '@/app/actions/projectAction';
import { Input } from '@/components/ui/input';
import { Project } from '@/types';
import { mockUsers } from '@/data/mockData';
import { OpenDialog } from '@/components/OpenDialog';


export default function Projects(){
    const [projects, setProjects] = React.useState<Project[]>([])
    const [searchItem, setSearchItem] = React.useState<string>('')

    React.useEffect(() => {
        async function filterItem(){
            const projects = await getProjects();
            if(searchItem){
                const filteredProject = projects.filter(project => project.name.includes(searchItem))
                setProjects(filteredProject);

            } else {
                setProjects(projects);
            }
        }
        filterItem();
    }, [searchItem])
        
    return (
        <div className=''>
            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold tracking-tight'>Projetos</h1>
                        <p className='text-muted-foreground text-sm'>Gerencie seus projetos e acompanhe o progresso.</p>
                    </div>
                    
                    <OpenDialog action='form'/>
                 
                </div>

                <div className='relative'>
                    <Lucide.Search className='absolute left-1 top-[11px] h-4' />
                    <Input 
                        type='text' 
                        value={searchItem} 
                        onChange={(e) => setSearchItem(e.target.value)}
                        className='my-5 indent-4'
                        placeholder='Buscar Projetos...'
                    />

                </div>

            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {projects.map((project, index) => (
                    <ProjectCard project={project} users={mockUsers} key={index}/>

                ))}
            </div>
        </div>
    )
}