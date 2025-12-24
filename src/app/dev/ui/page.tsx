"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AIBadge } from "@/components/features/ai-badge";
import { BottomNav } from "@/components/features/bottom-nav";
// Feature components
import {
  getNextLevelProgress,
  LevelBadge,
} from "@/components/features/level-badge";
import { RecipeCard } from "@/components/features/recipe-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function UIViewerPage() {
  const [isCookMode, setIsCookMode] = useState(false);
  const [progress, setProgress] = useState(65);

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

  const mockRecipe = {
    id: "1",
    title: "Tortilla de Patatas de la Abuela",
    description:
      "Una receta clásica española que nunca falla. Perfecta para cualquier momento del día.",
    imageUrl: undefined,
    cookTime: 30,
    servings: 4,
    author: {
      name: "María García",
      level: "souschef" as const,
    },
    isAIGenerated: false,
  };

  const mockAIRecipe = {
    ...mockRecipe,
    id: "2",
    title: "Pasta Cremosa con Setas",
    isAIGenerated: true,
    author: { name: "Chef IA", level: "chef" as const },
  };

  const levelProgress = getNextLevelProgress(350);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-24">
      <div className="container mx-auto p-6 space-y-12 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              🍳 Recipia Chef - Design System
            </h1>
            <p className="text-muted-foreground mt-1">
              Tokens, componentes y composiciones
            </p>
          </div>
          <Button
            onClick={() => setIsCookMode(!isCookMode)}
            variant={isCookMode ? "default" : "outline"}
            size="lg"
          >
            {isCookMode ? "☀️ Modo Normal" : "🌙 Probar Cook Mode"}
          </Button>
        </header>

        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Paleta de Colores</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <ColorSwatch name="Primary" className="bg-primary" />
            <ColorSwatch name="Secondary" className="bg-secondary" />
            <ColorSwatch name="Destructive" className="bg-destructive" />
            <ColorSwatch name="Success" className="bg-success" />
            <ColorSwatch name="Warning" className="bg-warning" />
            <ColorSwatch name="Info" className="bg-info" />
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            <ColorSwatch
              name="Background"
              className="bg-background border"
              small
            />
            <ColorSwatch name="Card" className="bg-card border" small />
            <ColorSwatch name="Muted" className="bg-muted" small />
            <ColorSwatch name="Accent" className="bg-accent" small />
            <ColorSwatch name="Pinche" className="bg-level-pinche" small />
            <ColorSwatch name="Cocinero" className="bg-level-cocinero" small />
            <ColorSwatch name="Sous Chef" className="bg-level-souschef" small />
            <ColorSwatch name="Chef" className="bg-level-chef" small />
          </div>
        </section>

        <Separator />

        {/* Gamification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Gamificación</h2>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Level Badges</h3>
            <div className="flex flex-wrap gap-3">
              <LevelBadge level="pinche" />
              <LevelBadge level="cocinero" />
              <LevelBadge level="souschef" />
              <LevelBadge level="chef" />
            </div>
            <div className="flex flex-wrap gap-3">
              <LevelBadge points={50} size="sm" />
              <LevelBadge points={250} size="default" />
              <LevelBadge points={750} size="lg" />
              <LevelBadge points={1500} size="lg" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">AI Badge</h3>
            <div className="flex flex-wrap gap-3">
              <AIBadge />
              <AIBadge variant="solid" />
              <AIBadge variant="outline" />
              <AIBadge size="sm" label="Generado" />
              <AIBadge size="lg" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Progress to Next Level</h3>
            <Card className="max-w-sm">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <LevelBadge points={350} />
                  <span className="text-sm text-muted-foreground">350 pts</span>
                </div>
                <Progress
                  value={
                    levelProgress.max > 0
                      ? (levelProgress.current / levelProgress.max) * 100
                      : 100
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {levelProgress.current}/{levelProgress.max} para{" "}
                  {levelProgress.nextLevel && (
                    <LevelBadge level={levelProgress.nextLevel} size="sm" />
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Recipe Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recipe Cards</h2>

          <Tabs defaultValue="vertical" className="w-full">
            <TabsList>
              <TabsTrigger value="vertical">Vertical</TabsTrigger>
              <TabsTrigger value="horizontal">Horizontal</TabsTrigger>
              <TabsTrigger value="compact">Compact</TabsTrigger>
            </TabsList>

            <TabsContent value="vertical" className="mt-4">
              <div className="flex flex-wrap gap-4">
                <RecipeCard recipe={mockRecipe} size="sm" />
                <RecipeCard recipe={mockRecipe} size="md" />
                <RecipeCard recipe={mockAIRecipe} size="lg" />
              </div>
            </TabsContent>

            <TabsContent value="horizontal" className="mt-4">
              <div className="space-y-4 max-w-md">
                <RecipeCard
                  recipe={mockRecipe}
                  variant="horizontal"
                  size="sm"
                />
                <RecipeCard
                  recipe={mockAIRecipe}
                  variant="horizontal"
                  size="md"
                />
              </div>
            </TabsContent>

            <TabsContent value="compact" className="mt-4">
              <div className="flex flex-wrap gap-3">
                <RecipeCard recipe={mockRecipe} variant="compact" size="sm" />
                <RecipeCard recipe={mockRecipe} variant="compact" size="md" />
                <RecipeCard recipe={mockAIRecipe} variant="compact" size="lg" />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Base Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Componentes Base (shadcn/ui)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Error</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Avatar */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg">👨‍🍳</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Progress & Switch */}
            <Card>
              <CardHeader>
                <CardTitle>Progress & Switch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Progress value={progress} />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      -10
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Notificaciones</Label>
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="chef@recipia.com" />
                </div>
              </CardContent>
            </Card>

            {/* Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>Skeleton</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Toast Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Toast Notifications</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast.success("¡Receta guardada!")}>
              Success
            </Button>
            <Button
              variant="destructive"
              onClick={() => toast.error("Error al guardar")}
            >
              Error
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.info("Procesando...")}
            >
              Info
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning("Límite de IA alcanzado")}
            >
              Warning
            </Button>
          </div>
        </section>
      </div>

      {/* Bottom Navigation Preview */}
      <BottomNav />
    </div>
  );
}

function ColorSwatch({
  name,
  className,
  small = false,
}: {
  name: string;
  className: string;
  small?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "rounded-lg shadow-sm",
          className,
          small ? "h-10" : "h-14",
        )}
      />
      <span className={cn("font-medium", small ? "text-[10px]" : "text-xs")}>
        {name}
      </span>
    </div>
  );
}
