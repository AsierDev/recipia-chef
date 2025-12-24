# 🍳 Recipia Chef

Tu sous-chef digital con IA y control por voz.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)

---

## 📖 Descripción

Recipia Chef es una aplicación web de recetas moderna que combina:

- 🎤 **Modo Cocina** guiado por voz (manos libres mientras cocinas)
- 🤖 **Generación de recetas con IA** desde ingredientes o fotos
- 👥 **Red social culinaria** con forks de recetas al estilo GitHub
- 🎮 **Gamificación** con niveles de chef y logros

## ✨ Features

| Feature | Estado | Descripción |
|---------|--------|-------------|
| Design System | ✅ | Tokens OKLCH, Dark Mode, Cook Mode |
| Componentes UI | ✅ | shadcn/ui + componentes custom |
| Galería UI | ✅ | `/dev/ui` para preview de componentes |
| Supabase | ⏳ | Auth, Database, Storage |
| CRUD Recetas | ⏳ | Crear, editar, eliminar recetas |
| Modo Cocina | ⏳ | Control por voz |
| IA Generativa | ⏳ | Snap & Cook |

## 🚀 Inicio Rápido

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd recipia-chef

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Ejecutar linter (Biome) |
| `npm run lint:fix` | Corregir errores de lint |
| `npm run format` | Formatear código |
| `npm run typecheck` | Verificar tipos |

## 🏗️ Estructura del Proyecto

```
src/
├── app/                # App Router (páginas)
│   ├── globals.css     # Estilos globales + Tailwind
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página de inicio
│   └── dev/ui/         # Galería de componentes
├── components/
│   ├── ui/             # Componentes base (shadcn/ui)
│   └── features/       # Componentes de negocio
├── lib/                # Utilidades
└── styles/             # Design tokens
```

## 🎨 Design System

El proyecto usa **design tokens** con colores OKLCH y tres temas:

- **Light Mode** - Fondo crema cálido
- **Dark Mode** - Modo oscuro azulado
- **Cook Mode** - Alto contraste para cocina

Ver galería de componentes: [localhost:3000/dev/ui](http://localhost:3000/dev/ui)

## 🛠️ Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 |
| Componentes | shadcn/ui + Radix UI |
| Linting | Biome |
| Icons | Lucide React |
| Toasts | Sonner |

## � Documentación

- **[GUIA_DEVELOPMENT.md](./GUIA_DEVELOPMENT.md)** - Guía completa para desarrolladores
- **[PLAN_DE_PROYECTO.md](../PLAN_DE_PROYECTO.md)** - Plan de ejecución por fases

## 🤝 Contribuir

1. Lee la [Guía de Desarrollo](../GUIA_DEVELOPMENT.md)
2. Revisa el [Plan de Proyecto](../PLAN_DE_PROYECTO.md)
3. Sigue las convenciones de código (Biome se encarga)
4. Crea una rama para tu feature
5. Abre un PR con descripción clara

## 📄 Licencia

Proyecto privado - Todos los derechos reservados.

---

Hecho con 💚 para amantes de la cocina
