'use client'

import { formattedDate, Project } from '@/types'
import React from 'react'
import { ProgressBar } from '../../shared/ProgressBar'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

import * as Lucide from 'lucide-react'

import { useProjectContext } from '@/context'


// card detales/resumo do projeto
export const ProjectDetailsCard = ({ projectId }: {projectId: string}) => {
    const { projects } = useProjectContext()
    const filteredProject = projects.find(project => project.id === projectId)

  return (
    <>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className='text-2xl'>
                    Detalhes do Projeto
                </CardTitle>
            </CardHeader>
            <CardContent>
                                  
                <ProgressBar value={filteredProject?.progress ? filteredProject?.progress : 0} className='-mt-3 mb-4'/>
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
                            <span className='text-[12px] max-w-[120px] md:max-w-max'>Tarefas Concluídas: {filteredProject?.tasks.filter(tasks => tasks.status == 'completed').length}/{filteredProject?.tasks.length}</span>
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
