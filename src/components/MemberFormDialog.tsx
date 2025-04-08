'use client'
import React from 'react'

import * as Lucide from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Project, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { addMemberToProject, getProjects, removeProjectMember } from '@/app/actions/projectAction';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/data/mockData';
import { useProjectContext } from '@/context';

export const MemberFormDialog = ({ project }:{project: Project}) => {

  return (
    <>
        <Dialog>
            <DialogTrigger className='max-w-max flex items-center gap-x-0.5 bg-blue-500 rounded-sm p-2 hover:bg-blue-400'>
                <Lucide.Trash className='h-5'/>
                <span className='text-sm'>Adicionar</span>  
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Membros ao Projeto</DialogTitle>
                    <DialogDescription>
                        Selecione os membros que deseja adicionar ao projeto.
                    </DialogDescription>
                </DialogHeader>

                <div></div>
            </DialogContent>
        </Dialog>
    </>
  )
}

interface MemberListProps {
    projectId: string | undefined,
}
export const MemberListDialog = ({ projectId }: MemberListProps) => {
    const router = useRouter();
    const {projects} = useProjectContext()

    const filteredProject = projects.find(project => project.id == projectId)

    const [membersId, setMembersId] = React.useState<string[] | undefined>(filteredProject?.memberIds)
    const users = mockUsers // trocar pra users
    
    const filteredMembers = mockUsers.filter((members) => !filteredProject?.memberIds.includes(members.id));

    const handleAddMemberToProject = (id: string) => {
        if (membersId?.includes(id)){
            const newArr = membersId.filter(item => item !== id)
            setMembersId(newArr)
        } else { 
            setMembersId((prevs) => [...prevs!, id])
        }
        router.refresh()
    }
    
    const handleSaveMembers = () => {
        if(projectId) {
            addMemberToProject(projectId!, membersId!)
            router.refresh()
        }
        return
    }

    return (
      <>
          <Dialog>  
                <DialogTrigger className='max-w-max flex items-center gap-x-0.5 bg-blue-500 text-white rounded-sm p-2 hover:bg-blue-400 hover:cursor-pointer'>
                    <Lucide.Trash className='h-5'/>
                    <span className='text-sm'>Adicionar</span>  
                </DialogTrigger>

              <DialogContent className='flex flex-col'>
                  <DialogHeader>
                      <DialogTitle>Adicionar Membros ao Projeto</DialogTitle>
                      <DialogDescription>
                          Selecione os membros que deseja adicionar ao projeto.
                      </DialogDescription>
                  </DialogHeader>
  
                  <div className='flex flex-col gap-4 my-4'>
                    {filteredMembers.map((member) => (
                        <div className='flex items-center gap-2' key={member.id}>
                           <Checkbox checked={membersId?.includes(member.id)}  onCheckedChange={() => handleAddMemberToProject(member.id)}/>
                            <Avatar>
                                <AvatarImage src={member.avatar} alt="@projectMember" />
                                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col '>
                                <span className='-my-1'>{member.name}</span>
                                <span className='-my-1'>{member.email}</span>
                            </div>
                        </div>
                    ))}
                  </div>

                    <DialogTrigger onClick={handleSaveMembers} className='max-w-max flex self-end bg-blue-500 text-white rounded-sm p-2 -mb-2 hover:bg-blue-400'>
                        <span className='text-sm'>Adicionar Selecionados</span>
                    </DialogTrigger>
              </DialogContent>
          </Dialog>
      </>
    )
  }

