'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Lucide from 'lucide-react'


import * as Component from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Status, Task } from '@/types'
import { Textarea } from '../ui/textarea'
import { SelectForm } from './SelectForm'
import { deleteTask, saveTask, updateTask } from '@/app/actions/taskAction'
import { auth } from '@/lib/firebase/firebaseConfig'
import { useProjectContext } from '@/context'


interface TaskFormProps {
    action?: string,
    task?: Task,
    taskId?: string,
    text?: string
}

export const TaskFormDialog = ({ action, task, taskId, text } : TaskFormProps ) => {
    const { projects } = useProjectContext()
    const user = auth.currentUser?.uid
    
    const [name, setName] = React.useState<string>(task ? task.title : '');
    const [description, setDescription] = React.useState<string>(task ? task.description : '')
    
    const [status, setStatus] = React.useState<string>(task? task.status : 'pending')
    const [priority, setPriority] = React.useState<string>('low')
    const [projectId, setProjectId] = useState('')
    const [member, setMember] = useState('')

    let newTask = {
        title: name,
        description: description,
        status: status as Status,
        priority: priority,
        projectId: task && projectId.replace(' ', '').length == 0 ? task.projectId : projectId,
        assigneeId: 'id-usuario',
        userId: user
    }


    
    async function handleSaveTask(e: FormEvent){
        e.preventDefault();
        await saveTask(newTask)
    }

    async function handleUpdateTask(e: FormEvent, taskId: string){
        e.preventDefault();
        await updateTask(newTask, taskId)
    }

    async function deleteTaskById(taskId: string) {
        await deleteTask(taskId)
    }


    return (
        <>
        {action !== 'delete' ? (
            <Component.Dialog>
                <Component.DialogTrigger asChild className='hover:cursor-pointer p-2'>
                    <div className={`flex items-center gap-x-0.5 rounded-sm ${action !== 'edit'? 'bg-blue-500' : 'hover:text-white'} hover:bg-blue-400`}>
                        {action === 'edit'? (
                            <Lucide.Edit size={16} />
                        ) : (
                            <Lucide.Plus size={16} color='#ffffff'/>
                        )}
                        <span className='text-sm text-white'>{text}</span>
                    </div>
                </Component.DialogTrigger>

                <Component.DialogContent>
                    <Component.DialogHeader>
                    <Component.DialogTitle>{action === 'edit'? 'Editar Tarefa': 'Criar Nova Tarefa'}</Component.DialogTitle>
                    <Component.DialogDescription>
                        {action === 'edit'? 'Edite os detalhes da sua tarefa abaixo.' : 'Preencha os detalhes da sua nova tarefa abaixo.'}
                        
                    </Component.DialogDescription>
                    </Component.DialogHeader>

                    <form className='w-full flex flex-col' onSubmit={task? (e) => handleUpdateTask(e, task.id) : (e) => handleSaveTask(e)}>
                        <div className='space-y-3'>
                            <Label>Título</Label>
                            <Input placeholder='Título da tarefa'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name='taskName'
                            />                            
                        </div>

                        <div className='space-y-3 mt-7'>
                            <Label>Descrição</Label>
                            <Textarea placeholder="Descrição da tarefa" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name='description'
                            />
                        </div>

                        <div className=''>
                            <div className='mt-7 grid grid-cols-2 gap-4'>
                                <SelectForm 
                                    states={status}
                                    setStates={setStatus} 
                                    label='Status' 
                                    defaultValue='pending' 
                                    selectedType='status'
                                />
                                <SelectForm 
                                    states={priority}
                                    setStates={setPriority} 
                                    label='Prioridade' 
                                    defaultValue='low' 
                                    selectedType='priority'
                                />                                
                            </div>
                            <div>
                                <SelectForm 
                                    states={projectId}
                                    setStates={setProjectId} 
                                    label='Projeto' 
                                    defaultValue={''} 
                                    // filterProjectOrTask(projectId) + ''
                                    selectedType='projects'
                                />
                                <SelectForm 
                                    states={member}
                                    setStates={setMember} 
                                    label='Responsável' 
                                    defaultValue={''} 
                                    selectedType='member'
                                />
                            </div>
                            
                        </div>
                        <Component.DialogTrigger asChild>
                            <Button type='submit' className='max-w-max self-end bg-blue-500 text-white'>{action === 'edit'? 'Salvar Alterações' : 'Criar Tarefa'}</Button>
                        </Component.DialogTrigger>
                    </form>
                </Component.DialogContent>

            </Component.Dialog>
        ) : (
            <Component.Dialog>
                <Component.DialogTrigger onClick={() => deleteTaskById(taskId!)} asChild className='hover:cursor-pointer text-red-500 hover:bg-blue-400 hover:text-white p-2'>
                    <div className={`flex items-center gap-x-0.5 rounded-sm `}>
                        <Lucide.Trash size={16} />
                    </div>
                </Component.DialogTrigger>
            </Component.Dialog>
        )}
        </>
    )
}