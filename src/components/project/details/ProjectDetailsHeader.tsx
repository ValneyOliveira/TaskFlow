'use client'

import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import * as Lucide from 'lucide-react'

import { StatusBadge } from '@/components/shared/StatusBadge'
import { useProjectContext } from '@/context'

export const ProjectDetailsHeader = ({ projectId }: {projectId: string}) => {
    const { projects } = useProjectContext()

    const project = projects.find(project => project.id === projectId)

  return (
    <div className='flex items-center gap-x-2  space-y-1 '>
        <Button asChild className='h-8 w-8'>
            <Link href={'/projects'}>
                <Lucide.ArrowLeft />
            </Link>
        </Button>
        <div>
            <div className='lg:flex lg:items-center gap-2'>
                <h1 className='text-2xl font-bold tracking-tight'>{project?.name}</h1>
                <span>
                    <StatusBadge status={project?.status? project.status : 'pending'} />
                </span>
            </div>
            <p className='text-muted-foreground text-sm'>Gerencie seus projetos e acompanhe o progresso.</p>
        </div>
    </div>
    
  )
}