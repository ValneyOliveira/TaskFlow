import React from 'react'

import { ProjectFormDialog } from '@/components/ProjectFormDialog';

import { ProjectDetailsCard } from '@/components/project/details/ProjectDetailsCard';
import { ProjectMembersCard } from '@/components/project/details/ProjectMembersCard';
import ProjectTasksCard from '@/components/project/details/ProjectTasksCard';
import { ProjectDetailsHeader } from '@/components/project/details/ProjectDetailsHeader';


export default async function ProjectDetails({ params }: { params: Promise<{ id: string }>}){
    const { id } = await params

    return (
        <div className='pb-2'>
            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-2  space-y-1 '>                        
                        <ProjectDetailsHeader projectId={id}/>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        <ProjectFormDialog action='form' projectId={id} actionName='edit'/>
                        <ProjectFormDialog action='trash' projectId={id} actionName='delete'/>
                    </div>
                </div>
            </div>

            <div className='grid lg:grid-cols-2 gap-8 my-5'>
                <ProjectDetailsCard projectId={id}/>
                <ProjectMembersCard projectId={id}/>
                <ProjectTasksCard projectId={id}/>
            </div>
        </div>
    )
}