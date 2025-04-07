'use client'

import React from 'react'

import * as Lucide from 'lucide-react'
import { Input } from '../ui/input'
import { useProjectContext } from '@/context'

export const SearchProject = () => {
    const { searchItem, setSearchItem } = useProjectContext()
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value)
    }
  return (
    <div>
        <div className='relative'>
            <Lucide.Search className='absolute left-1 top-[11px] h-4' />
            <Input 
                type='text' 
                value={searchItem} 
                onChange={handleSearchChange}
                className='my-5 indent-4'
                placeholder='Buscar Projetos...'
            />
        </div>
    </div>
  )
}
