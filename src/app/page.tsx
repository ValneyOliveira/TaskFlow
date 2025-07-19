import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
 
  return (
    <>
      <main className="w-full h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span>
                  Gerencie seus projetos com 
                </span>
                <span className="text-primary my-2 block"> facilidade</span>
              </h1>

              <div className="mt-10 flex gap-4">
               <Button size="lg" asChild>
                  <Link href="/register">Criar conta</Link>
                </Button>
                <Button size="lg" asChild className="bg-blue-500 hover:bg-blue-400 text-white">
                  <Link href="/login">Entrar</Link>
                </Button>
            </div>
          </div>
      </main>
    </>
  );
}