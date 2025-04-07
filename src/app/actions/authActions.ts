'use server'

import { verifyToken } from "@/lib/firebase/adminConfig"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export async function verifyUser (token: Promise<string>) {
    const cookieStore = await cookies();

    const tokenId = await token;
    const decodedToken = await verifyToken(tokenId)

    if(decodedToken) {
        cookieStore.set({
            name: 'user-idToken',
            value: tokenId,
            httpOnly: true,
            path: '/',
            sameSite: 'strict'

        });
        return redirect('/dashboard')
    } else {
        return redirect('/login')
    }
}