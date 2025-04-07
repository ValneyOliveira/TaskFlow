import { Task } from '@/types'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar,  AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

import * as Lucide from 'lucide-react'
import TaskItem from '../tasks/TaskItem'


const ProjectTasksCard = ({ projectTasks }: { projectTasks: Task[] }) => {

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
          {projectTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma tarefa cadastrada para este projeto.</p>
          ) : (
            <div className="space-y-4">
              {projectTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectTasksCard