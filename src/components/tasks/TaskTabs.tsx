import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card } from '../ui/card'
import { formattedDate, getStatusColor, Task } from '@/types'
import { TaskFormDialog } from './TaskFormDialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { StatusBadge } from '../shared/StatusBadge'
import { Badge } from '../ui/badge'
import { PriorityBadge } from '../shared/PriorityBadge'
import { CheckCircle } from 'lucide-react'
import { useProjectContext, useTaskContext } from '@/context'
import { mockUsers } from '@/data/mockData'


function TaskItem({ tasks, value } : { tasks: Task[],  value: string  }) {
    const { projects } = useProjectContext()

    function getProjectName(projectId: string){
        const projectFound = projects.find(project =>  project.id === projectId)
        return projectFound?.name
    }

    //mock users
    const getUser = (taskId?: string, userId?: string) => {
        const task = tasks.find(t => t.id == taskId);
        const user = mockUsers.find(u => u.id == task?.assigneeId);
        return user;
    }


    return (
        <>
        {tasks.length >= 1 ? (
            <TabsContent value={value}>
                <div className='flex flex-col gap-y-4'>
                    {tasks.map((task) => (
                        <Card key={task.id} className={`px-4 dark:border-muted-foreground border-t- border-l-4 bg- ${getStatusColor(task.status)}`}>
                            <div className="flex justify-between w-full">
                                <div className="flex gap-x-5">
                                    <CheckCircle size={22} color={task.status == 'completed'? "green" : 'gray'} />
                                    <div className="-mt-2">
                                        <span className="text-lg font-semibold">{task.title}</span>
                                        <p className="text-muted-foreground">{task.description}</p>

                                        <div className="space-x-2 mt-2">
                                            <StatusBadge status={task.status} />
                                            <PriorityBadge priority={task.priority} />
                                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {getProjectName(task.projectId)}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-flow-row gap-y-3">
                                    <div className="flex gap-2 items-center justify-center">
                                        <TaskFormDialog  action="edit" task={task} />
                                        <TaskFormDialog  action="delete" taskId={task.id} />
                                    </div>

                                    <Avatar className="h-10 w-10 mx-auto">
                                        <AvatarImage src={getUser(task.id, task.assigneeId)?.avatar} alt="@projectMember"  />
                                        <AvatarFallback className={``}>NA</AvatarFallback>
                                    </Avatar>
                                    <span className="dark:text-muted-foreground">{formattedDate(task.dueDate?.toString())}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        ) : (
            <TabsContent value={value}>
                <span>nao ha tarefas</span>
            </TabsContent>
        )}
        </>
    );
}

export const TasksTabs = () => {
    const { tasks } = useTaskContext()
    const { projects } = useProjectContext()

    const filterTasksByStatus = (status: string) => {
        const filteredTasks = tasks.filter((tasks) => tasks.status === status)
        return filteredTasks;
    }

  return (
    <div>
        <Tabs defaultValue='all'>
            <TabsList className=''>
                <TabsTrigger value='all'> Todas {tasks.length} </TabsTrigger>
                <TabsTrigger value='pending'> Pendente {filterTasksByStatus('pending').length} </TabsTrigger>
                <TabsTrigger value='in_progress'> Em andamento {filterTasksByStatus('in_progress').length}</TabsTrigger>
                <TabsTrigger value='completed'> Concluídas {filterTasksByStatus('completed').length} </TabsTrigger>
            </TabsList>

            <TaskItem tasks={tasks} value='all'/>
            <TaskItem tasks={filterTasksByStatus('pending')} value='pending'/>
            <TaskItem tasks={filterTasksByStatus('in_progress')} value='in_progress'/>
            <TaskItem tasks={filterTasksByStatus('completed')} value='completed'/>

            {!tasks || !filterTasksByStatus('') && <span>vazio</span>}
        </Tabs>
    </div>
  )
}