'use client'

import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Save, User } from 'lucide-react'
import { Button } from '../ui/button'
import { updateEmail, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase/firebaseConfig'

export const ProfileContent = () => {
    const user = auth.currentUser
    const [name, setName] = React.useState<string | null | undefined>('')
    const [email, setEmail] = React.useState<string | null | undefined>('')
    const [photoURL, setPhotoURL] = React.useState<string | null | undefined>('')
    const [bio, setBio] = React.useState('')

    const updateUserProfile = () => {
        if(user) {
            updateProfile(user, {
                displayName: name,
                photoURL: photoURL
            })

            if(email !== user.email && email !== undefined && email !== null && email.length > 0) {
                updateEmail(user, email? email : '').then(() => {
                    console.log('email atualizado')
                })
            } else { return }
        } else {
            return
        }       
        
    }

    React.useEffect(() => {
        const hasUser = () => {
            if(user !== null){
                setName(user.displayName as string)
                setEmail(user.email as string)
                setPhotoURL(user.photoURL as string)
            } 
        }
        hasUser()

    }, [user])

  return (
    <>
        <Card className='my-5'>
            <CardHeader>
                <CardTitle className='md:text-2xl'>Informações de Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais.</CardDescription>
            </CardHeader>
            <CardContent className=''>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex flex-col justify-center items-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={photoURL? photoURL : ''} alt="Avatar" />
                        <AvatarFallback className="text-xl relative">
                        <User className="h-16 w-16 absolute top-4 bottom-0 right-0 left-4" />
                        </AvatarFallback>
                    </Avatar>

                    <div className='w-full'>
                        <Label id='image' htmlFor="picture" className={'p-2.5 border-2 rounded hover:cursor-pointer hover:bg-blue-400 hover:text-white'}>
                            Alterar Foto 
                        </Label>
                        <Input type='file' id='picture' className='hidden' value={photoURL? photoURL : ''} onChange={(e) => setPhotoURL(e.target.value)}/>
                    </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" placeholder="Seu nome" value={name? name : ''} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Seu email" value={email? email : ''} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Função</Label>
                            <Input id="role" disabled defaultValue="Administrador"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input id="company" placeholder="Nome da empresa" defaultValue="Pro_Task" disabled/>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="space-y-5 mt-7">
                    <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Input id="bio" placeholder="Fale um pouco sobre você" disabled value={bio} onChange={(e) => setBio(e.target.value)}/>
                    </div>
                    
                    <div className="flex justify-end">
                    <Button onClick={updateUserProfile} className='p-5 bg-blue-500 hover:cursor-pointer hover:bg-blue-400 dark:text-white'>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                    </Button>
                    </div>
                </div>
            </CardContent>

        </Card>
    </>
  )
}
