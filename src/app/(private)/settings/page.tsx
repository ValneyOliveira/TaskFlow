import { SettingsTabs } from '@/components/settings/SettingsTabs'
import { Tabs, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'


export default function Settings(){
    return (
        <>
            <div className=''>
                <div className='mb-2'>
                    <div className='flex justify-between items-center'>
                        <div className='space-y-1'>
                            <h1 className='text-3xl font-bold tracking-tight'>Configurações</h1>
                            <p className='text-muted-foreground text-sm'>Gerencie suas preferências e informações de conta.</p>
                        </div>
                    </div>
                </div>

                <SettingsTabs />

    
            </div>
        </>
    )
}