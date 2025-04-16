import AppSidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import AppWrapper from '@/context/AppWrapper'

 const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AppWrapper>
      <SidebarProvider className='h-screen'>
        <AppSidebar />
        <>
        <div className='w-full md:max-w-[1200px] md:mx-auto p-5 xl:max-w-full'>
          {children}
        </div>
        </>
      </SidebarProvider>
    </AppWrapper>
  )
}
 export default layout