'use client'

import { formattedDate, Project } from '@/types'
import React from 'react'
import { ProgressBar } from '../../shared/ProgressBar'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

import * as Lucide from 'lucide-react'

import { useProjectContext, useTaskContext } from '@/context'


export const ProjectDetailsCard = ({ projectId }: {projectId: string}) => {
    const { projects } = useProjectContext()
    const { tasks } = useTaskContext()
    const filteredProject = projects.find(project => project.id === projectId)

    const filteredTasks = tasks.filter(task => task.projectId == projectId)

    const progress = filteredTasks.length === 0 
    ? 0 : 
    (filteredTasks.filter(task => task.status === 'completed').length / filteredTasks.length) * 100


  return (
    <>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className='text-2xl'>
                    Detalhes do Projeto
                </CardTitle>
            </CardHeader>
            <CardContent>
                                  
                <ProgressBar value={Number(progress.toFixed(2))} className='-mt-3 mb-4'/>
                <div>
                    <div className=' text-sm grid grid-cols-2 gap-4'>
                        <div className='flex items-center gap-x-2'>
                            <Lucide.Calendar size={16} className=''/>
                            <span className='text-[12px]'>Data de Criação: {formattedDate(filteredProject?.createdAt.toString())}</span>
                        </div>
                  
                        <div className='flex items-center gap-x-2'>
                            <Lucide.Calendar size={16}/>
                            <span className='text-[12px]'>Data de Entrega: {formattedDate(filteredProject?.dueDate?.toString())}</span>
                        </div>
                        <div className='flex items-center flex-wrap  gap-x-2'>
                            <Lucide.Check size={16}/>
                            <span className='text-[12px] max-w-[120px] md:max-w-max'>Tarefas Concluídas: {filteredTasks?.filter(tasks => tasks.status == 'completed').length}/{filteredTasks?.length}</span>
                       </div>
                        <div className='flex items-center gap-x-2 '>
                            <Lucide.Users size={16}/>
                            <span className='text-[12px]'>Membros: {filteredProject?.memberIds.length}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
  )
}