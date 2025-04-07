import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  let user = false
 
  return (
    <>
    <div className="">
      <main>
        <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center">
              <h1 className="animate-fade-in text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Gerencie seus projetos com <span className="text-primary">facilidade</span>
              </h1>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Ir para o Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link href="/register">Criar conta</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/login">Entrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
      </main>
      
        <footer className="border-t py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </>
  );
}