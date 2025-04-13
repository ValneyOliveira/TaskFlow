'use client'

import React from 'react'

import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { KeyRound, Save, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

export const SecurityContent = () => {

  const [deleteConfirmationText, setDeleteConfirmationText] = React.useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const handlePasswordChange = () => {
    return
  }

  const handleAccountDeletion = () => {
    if (deleteConfirmationText === "DELETAR") {
      alert("Sua conta foi excluída com sucesso.")
      // console.log("Conta excluída")
      setIsDeleteDialogOpen(false);
    } else {
      alert("Por favor, digite DELETAR para confirmar a exclusão.")
      // console.log('error: Erro ao excluir conta' )
    }
  };

  return (
    <div>
      <div className='my-5'>
        <h1 className="text-3xl font-bold tracking-tight">Segurança</h1>
        <p className="text-muted-foreground">Gerencie a segurança da sua conta.</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Alteração de Senha
              </CardTitle>
              <CardDescription>
                Atualize sua senha para manter sua conta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" disabled>Alterar Senha</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Alterar Senha</DialogTitle>
                    <DialogDescription>
                      Preencha os campos abaixo para alterar sua senha.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handlePasswordChange}>Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
        </Card>

        <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Exclusão de Conta
              </CardTitle>
              <CardDescription>
                Esta ação é permanente e não pode ser desfeita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    Excluir minha conta
                  </Button>
                </DialogTrigger>
                <DialogContent className='border border-neutral-200'>
                  <DialogHeader>
                    <DialogTitle>Você tem certeza?</DialogTitle>
                    <DialogDescription>
                      Esta ação é permanente. Todos os seus dados, projetos e tarefas serão removidos permanentemente.
                      Digite <span className="font-bold">DELETAR</span> para confirmar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Input 
                      placeholder="Digite DELETAR" 
                      value={deleteConfirmationText}
                      onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    />
                  </div>
                  <DialogFooter className='flex gap-4'>
                    <DialogClose className='p-2 border border-gray-200 rounded w-20 hover:bg-blue-400 hover:text-white hover:cursor-pointer'>Cancelar</DialogClose>
                    <DialogTrigger disabled={deleteConfirmationText.length < 1} onClick={handleAccountDeletion} className={`p-2 border-gray-200 rounded w-20 text-white' ${deleteConfirmationText? 'bg-red-500 hover:bg-red-400 hover:cursor-pointer' : 'bg-gray-400 opacity-80 hover:cursor-default'}`}>
                      Excluir
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
