import React from 'react'

import { ProjectCardList } from '@/components/project/ProjectCardList';
import { ProjectFormDialog } from '@/components/ProjectFormDialog';
import { SearchProject } from '@/components/project/SearchProject';

export default function Projects(){

    return (
        <div className=''>
            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold tracking-tight'>Projetos</h1>
                        <p className='text-muted-foreground text-sm'>Gerencie seus projetos e acompanhe o progresso.</p>
                    </div>
                    <ProjectFormDialog action='form' actionName='new'>
                        Novo Projeto
                    </ProjectFormDialog>
                </div>
                <SearchProject />
            </div>

            <ProjectCardList />
        </div>
    )
}
