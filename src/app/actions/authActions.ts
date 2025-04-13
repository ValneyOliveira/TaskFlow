'use server'

import { verifyToken } from "@/lib/firebase/adminConfig"
import { UserProfile } from "@/types";
import { auth } from "firebase-admin";

import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export async function updateCurrentUser(userData: UserProfile) {
    const user = auth()

    user.updateUser(userData.uid, {
        ...userData
    })
    return 'informações atualizadas com sucesso! '
}

export async function deleteUser(uid: string) {

    try {
        auth().deleteUser(uid)
        console.log('Conta deletada com sucesso!')
        return redirect('/')
    } catch(error: any) {
        console.log('erro ao deletar usuário: ' + error)
    }
}

export async function Logout(){
    (await cookies()).delete('user-token')
    return redirect ('/login')
}

export async function Login(token: string) {
    const cookieStore = await cookies()
    const decodedToken = await verifyToken(token)
  
    if (decodedToken) {
      cookieStore.set({
        name: 'user-token',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      })
  
      redirect('/dashboard')
    }
  
    redirect('/login')
}