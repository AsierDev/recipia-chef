"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function UIViewerPage() {
  const [isCookMode, setIsCookMode] = useState(false);

  // Apply cook-mode class to html element for CSS variable override
  useEffect(() => {
    if (isCookMode) {
      document.documentElement.classList.add("cook-mode");
    } else {
      document.documentElement.classList.remove("cook-mode");
    }
    return () => {
      document.documentElement.classList.remove("cook-mode");
    };
  }, [isCookMode]);

  const toggleCookMode = () => {
    setIsCookMode(!isCookMode);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto p-8 space-y-12 pb-24">
        {/* Header con Control */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Style Guide & UI Gallery
            </h1>
            <p className="text-muted-foreground mt-1">
              Explora los tokens, componentes y temas de Recipia Chef.
            </p>
          </div>
          <Button
            onClick={toggleCookMode}
            variant={isCookMode ? "primary" : "outline"}
            className="touch-target-lg"
          >
            {isCookMode ? "☀️ Desactivar Cook Mode" : "🍳 Probar Cook Mode"}
          </Button>
        </header>

        {/* Sección de Colores */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Colores (OKLCH Tokens)</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorCard name="Primary" bg="bg-primary" />
            <ColorCard name="Secondary" bg="bg-secondary" />
            <ColorCard name="Surface" bg="bg-surface" border />
            <ColorCard name="Muted" bg="bg-muted" />
            <ColorCard name="Accent" bg="bg-accent" />
            <ColorCard name="Destructive" bg="bg-destructive" />
          </div>
        </section>

        {/* Sección de Botones */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Botones (Variantes)</h2>
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Estilos
              </p>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Tamaños
              </p>
              <div className="flex flex-wrap gap-2 items-end">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large / Cook</Button>
                <Button size="icon">🔍</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Interactivo
              </p>
              <Button
                onClick={() =>
                  toast.success("¡Acción realizada!", {
                    description: "El Design System de Recipia Chef funciona.",
                  })
                }
              >
                Lanzar Toast
              </Button>
            </div>
          </div>
        </section>

        {/* Form Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Formularios e Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="chef@recipia.com" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" defaultValue="123456" />
                <p className="text-xs text-muted-foreground">
                  Mínimo 8 caracteres.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cards & Feedback */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Cards & Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Receta del día</CardTitle>
                <CardDescription>
                  Tortilla de patatas de la abuela
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                  <span className="text-muted-foreground">
                    Imagen placeholder
                  </span>
                </div>
                <p className="text-sm">
                  Una receta clásica que nunca falla. Perfecta para cenar.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Detalle
                </Button>
                <Button size="sm">Cocinar</Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skeleton Loaders</h3>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Touch Area Helper</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Resaltando el área de interacción de 44px (o 60px en Cook Mode).
              </p>
              <div className="flex gap-4">
                <div className="bg-primary/20 p-2 rounded-md">
                  <div className="touch-target bg-primary text-primary-foreground flex items-center justify-center rounded cursor-pointer text-xs">
                    44px
                  </div>
                </div>
                <div className="bg-secondary/20 p-2 rounded-md">
                  <div className="touch-target-lg bg-secondary text-secondary-foreground flex items-center justify-center rounded cursor-pointer text-xs">
                    60px
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorCard({
  name,
  bg,
  border = false,
}: {
  name: string;
  bg: string;
  border?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 p-1 rounded-lg border bg-card shadow-sm">
      <div
        className={cn("h-16 rounded-md shadow-inner", bg, border && "border")}
      />
      <div className="px-2 pb-2">
        <p className="text-xs font-semibold text-card-foreground">{name}</p>
        <p className="text-[10px] font-mono text-muted-foreground">{bg}</p>
      </div>
    </div>
  );
}
