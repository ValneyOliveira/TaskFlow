'use client'
 
 import React from 'react'
 import * as Lucide from 'lucide-react'

 import { ToggleTheme } from '@/components/buttons/ToggleTheme'
 import { ProjectSummaryCard } from '@/components/dashboard/SummaryCard'
 
 export default function Dashboard(){
    return (
        <div className='h-screen w-full p-5'>
            {/* <ToggleTheme /> */}
            <div className='gap-4 grid grid-flow-row sm:grid-flow-col'>
                <ProjectSummaryCard title='Total Projects' Icon={Lucide.Folder} value={12}/>
                <ProjectSummaryCard title='Completed' Icon={Lucide.FolderCheck} value={2}/>
                <ProjectSummaryCard title='In Progress' Icon={Lucide.Hourglass} value={8}/>
                <ProjectSummaryCard title='Delayed' Icon={Lucide.TriangleAlert} value={12}/>
            </div>
        </div>
    )
 }