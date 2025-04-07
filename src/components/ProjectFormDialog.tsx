'use client'

import React, { FormEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { deleteProject, saveProject, updateProject } from '@/app/actions/projectAction'

import * as Component from "@/components/ui/dialog"
import * as Lucide from 'lucide-react'
import * as Select from './ui/select'

import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Project } from '@/types'
import { Textarea } from './ui/textarea'




interface OpenDialogProps {
    action: string,
    project?: Project,
    projectId?: string,
    actionName?: string
}

export const ProjectFormDialog = ({ action, project, projectId, actionName } : OpenDialogProps ) => {
    const router = useRouter()
    const pathname = usePathname()
    const [name, setName] = React.useState<string>(project? project.name : '');
    const [description, setDescription] = React.useState<string>(project? project.description : '')
    const [status, setStatus] = React.useState<string>(project? project.status : 'pending')
    const [dueDate, setDueDate] = React.useState<any>(project? project?.dueDate?.toLocaleString() : Date.now())

    
    async function handleSaveProject(e: FormEvent){
        e.preventDefault();
        saveProject({name, description, status, dueDate })
    }

    async function handleUpdateProject(e: FormEvent, projectId: string | undefined){
        e.preventDefault();

        if(projectId) {
            await updateProject({
                name, description, status, dueDate
            }, projectId)
        }
        router.refresh()
    }

    async function deleteProjectById(id: string | undefined) {
        if(id) {
            deleteProject(id)
        }
        if(pathname == '/projects'){
            router.refresh()
        } else if(pathname == `/projects/${id}`) {
            router.back()
        }
    }

    return (
        <>
        {action === "form" ? (
            <Component.Dialog>
                <Component.DialogTrigger asChild className='hover:cursor-pointer'>
                    {project?.id? (
                        <div className={`flex items-center gap-x-0.5 rounded-sm ${actionName && 'p-2 bg-blue-500 text-white hover:bg-blue-400'}`}>
                            <Lucide.Edit className={`h-5 ${!actionName && 'hover:text-blue-500'}`}/>
                            <span className='text-sm'>{actionName}</span>
                    </div>
                    ) : (
                        <div className={`flex items-center gap-x-0.5 bg-blue-500 text-white rounded-sm hover:bg-blue-400 ${actionName && 'p-2'}`}>
                            <Lucide.Plus className='h-5'/>
                            <span className='text-sm'>{actionName}</span>
                        </div>
                     )}
                </Component.DialogTrigger>
                <Component.DialogContent>
                    <Component.DialogHeader>
                    <Component.DialogTitle>Editar Projeto</Component.DialogTitle>
                    <Component.DialogDescription>
                        Edite os detalhes do seu projeto abaixo.
                    </Component.DialogDescription>
                    </Component.DialogHeader>

                    <form className='w-full flex flex-col' onSubmit={project? (e) => handleUpdateProject(e, project.id) : (e) => handleSaveProject(e)}>
                        <div className='space-y-3'>
                            <Label>Nome do Projeto</Label>
                            <Input placeholder='Nome do Projeto'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name='projectName'
                            />                            
                        </div>

                        <div className='space-y-3 mt-3'>
                            <Label>Data de Vencimento</Label>
                            <Input type='date'
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                name='dueDate'
                            />                            
                        </div>

                        <div className='space-y-3 mt-7'>
                            <Label>Descrição</Label>
                            <Textarea placeholder="Type your message here." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name='description'
                            />
                        </div>
                        <div className='space-y-3 mt-7'>
                            <Label>Status</Label>
                            <Select.Select onValueChange={setStatus} defaultValue={'pending'} name='status' >
                                <Select.SelectTrigger className="w-[180px]" >
                                    <Select.SelectValue placeholder="select project status"/>
                                </Select.SelectTrigger>
                                <Select.SelectContent >
                                    <Select.SelectItem value={"pending"}>Pendente</Select.SelectItem>
                                    <Select.SelectItem value="in_progress">Em Andamento</Select.SelectItem>
                                    <Select.SelectItem value="completed">Concluído</Select.SelectItem>
                                    <Select.SelectItem value="canceled">Cancelado</Select.SelectItem>
                                </Select.SelectContent>
                            </Select.Select> 
                        </div>
                        <Component.DialogTrigger asChild>
                            <Button type='submit' className='max-w-max self-end bg-blue-500 text-white'>{project? 'Salvar Alterações' : 'Criar Projeto'}</Button>
                        </Component.DialogTrigger>
                    </form>
                </Component.DialogContent>

            </Component.Dialog>
        ) : (
            <Component.Dialog>
                <Component.DialogTrigger asChild className='hover:cursor-pointer'>
                    {actionName ? (
                        <div className='flex items-center gap-x-0.5 bg-red-500 text-white rounded-sm p-2 hover:bg-red-400'>
                            <Lucide.Trash className='h-5'/>
                            <span className='text-sm'>{actionName}</span>
                        </div>
                    ) : (
                        <Lucide.Trash className='h-5 hover:text-red-400'/>
                    )}
                </Component.DialogTrigger>
                <Component.DialogContent className='border-red-400'>
                    <Component.DialogHeader>
                        <Component.DialogTitle className='text-center'>Você tem certeza?</Component.DialogTitle>
                        <Component.DialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto e todas as suas informações.
                        </Component.DialogDescription>
                    </Component.DialogHeader>
                    <div className='mx-auto space-x-4 '>

                        <Component.DialogClose asChild>
                            <Button className='hover:cursor-pointer'>Cancelar</Button>
                        </Component.DialogClose>

                        <Component.DialogTrigger asChild >
                            <Button className='bg-red-500 text-white hover:bg-red-400 hover:cursor-pointer' onClick={() => deleteProjectById(projectId)}>Excluir</Button>
                        </Component.DialogTrigger>
                    </div>
                </Component.DialogContent>
            </Component.Dialog>
        )}
        </>
    )
}