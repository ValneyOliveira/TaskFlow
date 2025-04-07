'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

import * as Lucide from 'lucide-react'

import { Project, User } from '@/types'
import { OpenDialog } from './OpenDialog'
import Link from 'next/link'
import { Button } from './ui/button'
import { ProgressBar } from './shared/ProgressBar'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { mockUsers } from '@/data/mockData'


export const ProjectCard = ({project, users}: {project: Project, users: User[]}) => {
  // export type Status = "pending" | "in_progress" | "completed" | "canceled";
  const translateStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
        break;
      case "in_progress":
        return "Em Andamento"
        break;
      case "completed":
        return "Concluído"
        break;
      case "canceled":
        return "Cancelado"
        break;
    }
  }
    
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="truncate">{project.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
          </div>
          <Badge>{translateStatusText(project.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressBar value={project.progress} />
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm ">
          <div className="flex items-center text-muted-foreground">
            <Lucide.Calendar className="mr-2 h-4 w-4" />
            <span>Data: {project.dueDate?.toString()}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Lucide.CheckCircle className="mr-2 h-4 w-4" />
            <span>{project.tasks.filter(t => t.status === "completed").length}/{project.tasks.length} tarefas</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-y-1">
      <div className='flex justify-between items-center border-t pt-4 w-full'>
        <div className="flex -space-x-2">
            {project.memberIds.slice(0, 3).map((memberId, index) => (
                <Avatar key={memberId}>
                  <AvatarImage src={mockUsers[index].avatar} alt="@avatar" />
                  <AvatarFallback>{mockUsers[index].name.slice(0, 2)}</AvatarFallback>
                </Avatar>
            ))}
            {project.memberIds.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{project.memberIds.length - 3}jjj
                </div>
            )}
            </div>
            
            <div className="flex gap-3 items-center">
                <OpenDialog action='form' project={project}/>
                <OpenDialog action='trash' projectId={project.id}/>

                <Button asChild className='h-7 w-7'>
                    <Link href={`/projects/${project.id}`}>
                        <Lucide.ExternalLink />
                    </Link>
                </Button>
            </div>
      </div>
      </CardFooter>
    </Card>
  )
}

