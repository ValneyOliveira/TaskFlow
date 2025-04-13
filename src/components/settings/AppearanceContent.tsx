'use client'

import React, { useState } from 'react'

import { Moon, Save, Sun } from 'lucide-react'
import { Label } from '../ui/label'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const AppearanceContent = () => {
  const { setTheme, theme } = useTheme()

  const [settings, setSettings] = useState({
    language: "pt-BR",
  });

  const handleSaveSettings = () => {
    // add more language options
    return
  }

  return (
    <>
    <Card>
            <CardHeader>
              <CardTitle className='md:text-2xl'>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do aplicativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer flex items-center gap-2 ${theme === 'light' ? 'border-primary' : 'border-input'}`}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Claro</p>
                        <p className="text-sm text-muted-foreground">Tema com cores claras</p>
                      </div>
                    </div>
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer flex items-center gap-2 ${theme === 'dark' ? 'border-primary' : 'border-input'}`}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Escuro</p>
                        <p className="text-sm text-muted-foreground">Tema com cores escuras</p>
                      </div>
                    </div>
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer flex items-center gap-2 ${theme === 'system' ? 'border-primary' : 'border-input'}`}
                      onClick={() => setTheme("system")}
                    >
                      <div>
                        <p className="font-medium">Sistema</p>
                        <p className="text-sm text-muted-foreground">Usar configuração do sistema</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select 
                    value={settings.language} 
                    onValueChange={(value: string) => setSettings({...settings, language: value})}
                  >
                    <SelectTrigger className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button disabled className='disabled:opacity-100 bg-blue-500 hover:bg-blue-400 hover:cursor-pointer dark:text-white' onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
    </>
  )
}
