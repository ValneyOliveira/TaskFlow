'use client'

import React from 'react'
import * as Lucide from 'lucide-react';

import { ProjectCard } from '@/components/project/ProjectCard';
import { Input } from '@/components/ui/input';
import { Project } from '@/types';
import { getProjects } from '@/app/actions/projectAction';
import { ProjectFormDialog } from '@/components/ProjectFormDialog';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';


export default function Projects(){
    const [projects, setProjects] = React.useState<Project[]>([])
    const [searchItem, setSearchItem] = React.useState<string>('')

    React.useEffect(() => {
        async function isSearching() {
            let copyData = await getProjects()
            if(searchItem){
                const filtered = copyData.filter(project => project.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()))
                setProjects(filtered)
            } else {
                setProjects(copyData)
            }
        }
        isSearching();
    }, [searchItem])

    React.useEffect(() => {
        const unsubscribe =  onSnapshot(collection(db, 'projects'), (snapshot) => {
            const fetchedProjects: Project[] = [];
            snapshot.forEach((doc) => {
                const projectData = doc.data() as Project;
                projectData.id = doc.id;
                fetchedProjects.push(projectData)
            })

            setProjects(fetchedProjects)
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className=''>
            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold tracking-tight'>Projetos</h1>
                        <p className='text-muted-foreground text-sm'>Gerencie seus projetos e acompanhe o progresso.</p>
                    </div>
                    <ProjectFormDialog action='form' actionName='Criar projeto'/>
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
                    <ProjectCard project={project} key={index}/>
                ))}
            </div>
        </div>
    )
}