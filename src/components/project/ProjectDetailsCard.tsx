'use client'

import { Project } from '@/types'
import React from 'react'
import { ProgressBar } from '../shared/ProgressBar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

import * as Lucide from 'lucide-react'

import { format } from "date-fns";

interface ProjectDetailsCardProps {
    project: Project
}

export const ProjectDetailsCard = ({project}: ProjectDetailsCardProps) => {
 
    function formattedDate(stringDate: string | undefined ) {
        const date = new Date(stringDate!)
        return format(date, "dd/MM/yyyy");
    }

  return (
    <>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className='text-2xl'>
                    Detalhes do Projeto
                </CardTitle>
            </CardHeader>
            <CardContent>
                                  
                <ProgressBar value={project.progress} className='-mt-3 mb-4'/>
                <div>
                    <div className=' text-sm grid grid-cols-2 gap-4'>
                        <div className='flex items-center gap-x-2'>
                            <Lucide.Calendar size={16} className=''/>
                            <span className='text-[12px]'>Data de Criação: {formattedDate(project.createdAt.toString())}</span>
                        </div>
                  
                        <div className='flex items-center gap-x-2'>
                            <Lucide.Calendar size={16}/>
                            <span className='text-[12px]'>Data de Entrega: {formattedDate(project.dueDate?.toString())}</span>
                        </div>
                        <div className='flex items-center flex-wrap  gap-x-2'>
                            <Lucide.Check size={16}/>
                            <span className='text-[12px] max-w-[120px] md:max-w-max'>Tarefas Concluídas: {project.tasks.filter(tasks => tasks.status == 'completed').length}/{project.tasks.length}</span>
                       </div>
                        <div className='flex items-center gap-x-2 '>
                            <Lucide.Users size={16}/>
                            <span className='text-[12px]'>Membros: {project.memberIds.length}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
  )
}