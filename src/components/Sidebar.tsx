'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import * as Sidebar from "@/components/ui/sidebar"
import * as Lucide from 'lucide-react'
import { Button } from './ui/button'
import { Logout } from '@/app/actions/authActions'

const AppSidebar = () => {
  const { open, setOpen } = Sidebar.useSidebar();
  const path = usePathname();  

  const items = [
    { title: 'Dashboard', url: "/dashboard", icon: Lucide.LineChart },
    { title: 'Projetos', url: "/projects", icon: Lucide.FolderKanban },
    { title: 'Tarefas', url: "/tasks", icon: Lucide.FolderKanban },
    { title: 'Configurações', url: "/settings", icon: Lucide.Settings },
  ]

  return (
    <Sidebar.Sidebar collapsible='icon'>
      <Sidebar.SidebarContent className='items-center justify-between outline outline-neutral-400'>
        
        <div className='w-full'>
          <Sidebar.SidebarHeader className={`w-full ${open ?'items-end' : 'items-center'} p-0 mt-2 `}>
            {open ? (
              <button onClick={() => setOpen(false)} className='p-1.5 w-11 bg-blue-100 rounded-tl-2xl rounded-bl-2xl hover:outline-1 hover:outline-cyan-200 animate-pulse repeat-1 duration-[40ms]'>
                  <Lucide.ArrowLeft size={18} />
              </button>
            ) : (
              <button onClick={() => setOpen(true)} className='p-1.5 bg-blue-100 rounded-tr-2xl rounded-br-2xl hover:outline-1 hover:outline-cyan-200 animate-pulse repeat-1 duration-[40ms]'>
                <Lucide.ArrowRight size={18} />
              </button>
            )}
          </Sidebar.SidebarHeader>
          
          <Sidebar.SidebarMenu className={` ${open? '' : 'items-center'} relative`}>
            {items.map((item) => (
              <Sidebar.SidebarMenuItem key={item.title}>
                <Sidebar.SidebarMenuButton asChild>
                  <Link href={item.url} className='hover:bg-blue-50'>
                    <item.icon className={`${path === item.url? 'text-blue-500' : 'text-neutral-500 dark:text-neutral-300'}`}/>
                    <span className={`${path === item.url? 'text-blue-500' : 'text-neutral-500 dark:text-neutral-300'}`}>{item.title}</span>
                  </Link>
                </Sidebar.SidebarMenuButton>
              </Sidebar.SidebarMenuItem>
            ))}
          </Sidebar.SidebarMenu>
        </div>
        
        <Sidebar.SidebarFooter className='w-full'>
          <form action={Logout}>
            <Button type='submit' className='w-full flex items-center justify-start text-white bg-blue-500'>
              <Lucide.LogOut />
              <p className='text-md'>Sair</p>
            </Button>
          </form>
        </Sidebar.SidebarFooter>
      </Sidebar.SidebarContent>

    </Sidebar.Sidebar>
  )
}

export default AppSidebar