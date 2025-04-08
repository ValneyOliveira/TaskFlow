'use client'
import React from 'react'
import { Label } from '../ui/label'
import * as Select from '../ui/select'
import { useProjectContext } from '@/context'
import { mockUsers } from '@/data/mockData'

interface TaskSelectFormProps {
    states: string
    setStates: React.Dispatch<React.SetStateAction<string>>
    label: string
    defaultValue: string | undefined
    selectedType: string
}

export const SelectForm = ({ states, setStates, label, defaultValue, selectedType }: TaskSelectFormProps) => {
    
    const { projects } = useProjectContext()
    const members = projects.map(item => item.memberIds).flatMap(item => item)
    const mockMembers = mockUsers

    const selectStatus = [
        {value: "pending", text: "Pendente"},
        {value: "in_progress", text: "Em Andamento"},
        {value: "completed", text: "Concluído"},
        {value: "canceled", text: "Cancelado"}
    ]
    const selectPriority = [
        {value: "low", text: "Baixa"},
        {value: "medium", text: "Média"},
        {value: "high", text: "Alta"}
    ]

    function textPlaceholder(type: string) {
        if(type == 'projects') {
            return 'Selecione o projeto'
        } else if(type == 'member') {
            return 'Sem responsavel'
        } else {
            return ''
        }
    }

  return (
    <>
    <div className={`space-y-2`}>
        <Label>{label}</Label>
        <Select.Select onValueChange={setStates} defaultValue={defaultValue}>
            <Select.SelectTrigger className='min-w-full'>
                <Select.SelectValue placeholder={` ${textPlaceholder(selectedType)}`}/>
            </Select.SelectTrigger>

            <Select.SelectContent>
            
                {selectedType === 'priority' && (
                    selectPriority.map((item, index) => (
                        <Select.SelectItem key={index} value={item.value}>{item.text}</Select.SelectItem>
                    ))
                ) }

                {selectedType === 'status' && (
                    selectStatus.map((item, index) => (
                        <Select.SelectItem key={index} value={item.value}>{item.text}</Select.SelectItem>
                    ))
                ) }
                
                {selectedType === 'projects' && (
                    projects.map((item, index) => (
                        <Select.SelectItem key={index} value={item.id}>{item.name}</Select.SelectItem>
                    ))
                )}

                {selectedType === 'member' && (
                    mockMembers.map((item, index) => (
                        <Select.SelectItem key={index} value={item.id}>{item.name}</Select.SelectItem>
                    ))
                )}                
            </Select.SelectContent>
        </Select.Select> 
    </div>
    </>
  )
}