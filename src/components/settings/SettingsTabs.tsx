import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Shield, SunMedium, Users } from 'lucide-react'
import { ProfileContent } from './ProfileContent'
import { AppearanceContent } from './AppearanceContent'
import { SecurityContent } from './SecurityContent'

export const SettingsTabs = () => {
  return (
    <div>
        <Tabs defaultValue="profile">
            <TabsList>
                <TabsTrigger value="profile"><Users />Perfil</TabsTrigger>
                <TabsTrigger value="appearance"><SunMedium /> Aparência</TabsTrigger>
                <TabsTrigger value="security"><Shield />Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
                <ProfileContent />
            </TabsContent>

            <TabsContent value='appearance'>
              <AppearanceContent />
            </TabsContent>
            
            <TabsContent value="security">
              <SecurityContent />
            </TabsContent>
        </Tabs>
    </div>
  )
}
