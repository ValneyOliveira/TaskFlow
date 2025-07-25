'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import Link from "next/link"
import { FormEvent, startTransition, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase/firebaseConfig"
import { Login } from "@/app/actions/authActions"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if(!email || !password) {
            return;
        }

        try {
          const user = (await signInWithEmailAndPassword(auth, email, password)).user
          const token = await user.getIdToken()

          startTransition(() => {
            Login(token)
          })
        } catch (error: any) { console.log('erro ao fazer login ' + error.code) } 
        finally { setLoading(false) }
        

    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={`${loading ? 'shadow-md shadow-blue-200' : ''}`}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
              </div>
              <Button type="submit" className="w-full disabled:opacity-90" disabled={loading} >
                {loading ? (
                  <div className="animate-spin border rounded-full h-6 w-6 border-t-blue-700 ">
                    <span className="sr-only">loading...</span>
                  </div>
                ) : (
                  <> Login</>
                )}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
