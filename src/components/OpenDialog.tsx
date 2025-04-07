'use client'

import React, { FormEvent } from 'react'
import * as Component from "@/components/ui/dialog"
import { Edit, Plus, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Project } from '@/types'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

import { deleteProject, saveProject, updateProject } from '@/app/actions/projectAction'



export const OpenDialog = ({ action, project, projectId } : {action: string, project?: Project, projectId?: string}) => {
    const [name, setName] = React.useState<string>(project? project.name : '');
    const [description, setDescription] = React.useState<string>(project? project.description : '')
    const [status, setStatus] = React.useState<string>(project? project.status.replace('_', ' ') : 'Pendente')
    const [dueDate, setDueDate] = React.useState<any>(project? project?.dueDate?.toLocaleString() : Date.now().toLocaleString())

    async function handleSaveProject(e: FormEvent){
        e.preventDefault();
        await saveProject({name, description, status, dueDate })
    }


    async function handleUpdateProject(e: FormEvent, id: string | undefined){
        e.preventDefault();

        if(id) {
            await updateProject({
                name, description, status
            }, id)
        }
    }

    async function deleteProjectById(id: string | undefined) {
        if(id) {
            deleteProject(id)
        }
        return null;
    }

    return (
        <>
        {action === "form" ? (
            <Component.Dialog>
                <Component.DialogTrigger asChild className='hover:cursor-pointer'>
                    {project?.id? (
                        <Edit className='h-5'/>
                    ) : (
                        <div className='flex items-center gap-x-0.5 bg-blue-500 rounded-sm p-2'>
                            <Plus className='h-4'/>
                            <span className='text-sm'>Novo Projeto</span>
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

                    <form className='w-full flex flex-col' onSubmit={project? (e) => handleUpdateProject(e, projectId) : (e) => handleSaveProject(e)}>
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
                            <Label>Descrição</Label>
                            <Select onValueChange={setStatus} defaultValue={'pending'} name='status' >
                                <SelectTrigger className="w-[180px]" >
                                    <SelectValue placeholder="select project status"/>
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value={"pending"}>Pendente</SelectItem>
                                    <SelectItem value="in_progress">Em Andamento</SelectItem>
                                    <SelectItem value="completed">Concluído</SelectItem>
                                    <SelectItem value="canceled">Cancelado</SelectItem>
                                </SelectContent>
                            </Select> 
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
                    <Trash color='red' className='h-5'/>
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
                            <Button className='bg-red-500 hover:bg-red-400 hover:cursor-pointer' onClick={() => deleteProjectById(projectId)}>Excluir</Button>
                        </Component.DialogTrigger>
                    </div>
                </Component.DialogContent>
            </Component.Dialog>
        )}
        </>
    )
}