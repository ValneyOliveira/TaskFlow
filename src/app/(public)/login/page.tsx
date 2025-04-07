'use client'

import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login() {

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8080/public', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) {
                console.log(`Erro HTTP! Status: ${response.status}`)
            }
            const data = await response.text();
            console.log('Resposta spring api:', data);
        } catch (error: any) {
            console.log("Error ao buscar dados", error.message)
        }
    }

    // spring api - test endpoint
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await fetch("http://localhost:8080/info", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                console.log(`Erro: ${response.status}`);
            }

            const data = await response.text();
            console.log(' data: '+ data)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">

            <div className="w-full max-w-sm">
                <div>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Entrar</button>
                    <p>{message}</p>
                </div>

                {/* <LoginForm /> */}

            </div>
        </div>
    )
}