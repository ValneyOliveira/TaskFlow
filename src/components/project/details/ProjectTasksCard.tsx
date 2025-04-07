'use client'

import React from 'react'
import { useProjectContext, useTaskContext } from '@/context'

import * as Lucide from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'



const ProjectTasksCard = ({ projectId }: { projectId: string}) => {
  const { projects } = useProjectContext()
  const projectTasks = projects.find(project => project.id === projectId)?.tasks

  return (
    <div className='col-span-full'>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tarefas do Projeto</CardTitle>
          <Button size="sm" >
            <Lucide.Plus className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </CardHeader>
        <CardContent>
          {projectTasks?.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma tarefa cadastrada para este projeto.</p>
          ) : (
            <div className="space-y-4">
              {projectTasks?.map(task => (
                <div key={task.id}>
                
                    <span>test</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectTasksCard