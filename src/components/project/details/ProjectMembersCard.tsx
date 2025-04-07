'use client'

import React from 'react'

import * as Lucide from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Project, User } from '@/types'
import { Avatar, AvatarImage } from '../../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { MemberListDialog } from '../../MemberFormDialog';
import { removeProjectMember } from '@/app/actions/projectAction';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation'
import { mockUsers } from '@/data/mockData'
import { useProjectContext } from '@/context'

interface ProjectMembersCard {
    projectId: string
}


//card listas users/membros adicionadas ao projeto
export const ProjectMembersCard = ({ projectId }: ProjectMembersCard) => {
    const {projects} = useProjectContext()

    const filteredProjectTest = projects.find(project => project.id === projectId)

    const router = useRouter()
    const members = mockUsers

    const filteredProject = projects.find(project => project.id === projectId)!

    const filteredMembers = members.filter((members) => filteredProjectTest?.memberIds.includes(members.id));
    
    const handleRemoveMember = (projectId: string, memberId: string) => {
        removeProjectMember(projectId, memberId)
        router.refresh()
    }

    console.log(filteredProjectTest?.tasks)

  return (
    <>
        <Card className='w-full'>
            <CardHeader className='flex justify-between items-center'>
                <CardTitle className='text-2xl'>
                    Membros do Projeto
                </CardTitle>
                <MemberListDialog projectId={filteredProjectTest?.id} />
            </CardHeader>
            <CardContent>
                <>
                {filteredMembers.map((member) => (
                    <div key={member.id} className='flex justify-between items-center mt-4'>
                        
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={member.avatar} alt="@projectMember" />
                                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            
                            <div className='flex flex-col '>
                                <span className='-my-1'>{member.name}</span>
                                <span className='-my-1'>{member.email}</span>
                            </div>
                        </div>

                        <Button className='max-w-max rounded-sm p-2 bg-red-500 text-white hover:bg-red-400 hover:cursor-pointer'
                            onClick={() => handleRemoveMember(filteredProjectTest?.id!, member.id)}
                        >
                            <Lucide.Trash className='h-4'/>
                        </Button>
                    </div>
                ))}
                </>
            </CardContent>
        </Card>
    </>
  )
}
