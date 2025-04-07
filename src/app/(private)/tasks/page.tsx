'use client'

import React  from 'react'

import * as Lucide from 'lucide-react'

import * as Select from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ToggleTheme } from '@/components/buttons/ToggleTheme'
import { TasksTabs } from '@/components/tasks/TaskTabs'
import { TaskFormDialog } from '@/components/tasks/TaskFormDialog'
import { useTaskContext } from '@/context/TaskContext'
import { useProjectContext } from '@/context'



export default function Tasks(){
    const { projects } = useProjectContext()

    const {
        tasks,
        searchItem, setSearchItem, 
        filterByName, setFilterByName
    } = useTaskContext();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value)
    }

    return (
        <div className=''>
            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold tracking-tight'>Tarefas</h1>
                        <p className='text-muted-foreground text-sm'>Gerencie seus projetos e acompanhe o progresso.</p>
                    </div>
                    <ToggleTheme/>
                </div>
                <>
                    <TaskFormDialog text='Nova Tarefa'/>
                </>

                <div className='flex items-center gap-4 my-5'>
                    <div className='w-full relative'>
                        <Lucide.Search className='absolute top-2.5 left-1 h-4' />
                        <Input 
                            type='text' 
                            value={searchItem} 
                            onChange={handleSearchChange}
                            className=' indent-4'
                            placeholder='Buscar Projetos...'
                        />
                    </div>

                    <div className='space-y-3'>
                        <Select.Select onValueChange={setFilterByName} defaultValue={filterByName}>
                            <Select.SelectTrigger className="w-[180px]" >
                                <Select.SelectValue placeholder="Todos os projetos"/>
                            </Select.SelectTrigger>
                            <Select.SelectContent >
                                <Select.SelectItem value={"all"}>Todos os projetos</Select.SelectItem>
                                {projects.map((item, index) => (
                                    <Select.SelectItem key={index} value={item.id}>{item.name}</Select.SelectItem>
                                ))}
                            </Select.SelectContent>
                        </Select.Select> 
                    </div>
                </div>
            </div>
            <TasksTabs />
        </div>
    )
}