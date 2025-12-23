import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 text-center p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-primary">
            Recipia Chef
          </h1>
          <p className="text-xl text-muted-foreground">
            Tu sous-chef digital con IA y control por voz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/dev/ui">Ver Galería UI</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="https://github.com/asier" target="_blank">
              Documentación
            </Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-surface border rounded-2xl shadow-sm text-left w-full">
          <h2 className="text-lg font-semibold mb-2">Estado del Proyecto</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Next.js 16 + Tailwind v4
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Design Tokens OKLCH
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> 9 Componentes Base
              Instalados
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">⚡</span> Listo para Integración
              Supabase
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
