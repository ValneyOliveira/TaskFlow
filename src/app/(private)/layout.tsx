import AppSidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

 const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <SidebarProvider className='h-screen'>
        <AppSidebar />
        <>
        <div className='w-full md:max-w-[1200px] md:mx-auto p-5'>
          {children}
        </div>
        </>
      </SidebarProvider>
    </>
  )
}
 export default layout