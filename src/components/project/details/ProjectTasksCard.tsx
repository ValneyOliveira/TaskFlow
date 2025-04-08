'use client'

import React from 'react'
import { useProjectContext, useTaskContext } from '@/context'

import * as Lucide from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PriorityBadge } from '@/components/shared/PriorityBadge'

const ProjectTasksCard = ({ projectId }: { projectId: string}) => {
  const { projects } = useProjectContext()
  const { tasks } = useTaskContext()

  const projectTasks = projects.find(project => project.id === projectId)?.tasks
  const filteredTasks = tasks.filter(task => task.projectId === projectId)

  console.log('tarefas filtradas ---> ' + filteredTasks.length)

  return (
    <div className='col-span-full'>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className='text-2xl'>Tarefas do Projeto</CardTitle>
          <Button size="sm" >
            <Lucide.Plus className="mr-2 h-4 w-4" />
            <span >Nova Tarefa</span>
          </Button>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma tarefa cadastrada para este projeto.</p>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <div key={task.id} className='border p-2 shadow-sm rounded-sm'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-md font-semibold'>{task.title}</span>
                    <StatusBadge status={task.status}/>
                    <PriorityBadge priority={task.priority}/>
                  </div>
                  <p className='text-muted-foreground'>{task.description.length > 60 ? task.description.slice(0, 80) + '...' : task.description}</p>
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