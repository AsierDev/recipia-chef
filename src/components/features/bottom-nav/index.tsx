"use client";

import {
  Home,
  type LucideIcon,
  PlusCircle,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  isCreate?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/explorar", label: "Explorar", icon: Search },
  { href: "/nueva-receta", label: "Crear", icon: PlusCircle, isCreate: true },
  { href: "/ia", label: "IA", icon: Sparkles },
  { href: "/perfil", label: "Perfil", icon: User },
];

export interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-card/95 backdrop-blur-md border-t border-border",
        "safe-area-pb",
        className,
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;

          if (item.isCreate) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center",
                  "w-14 h-14 -mt-4 rounded-full",
                  "bg-primary text-primary-foreground",
                  "shadow-lg shadow-primary/25",
                  "touch-target-lg",
                  "transition-transform hover:scale-105 active:scale-95",
                )}
                aria-label={item.label}
              >
                <Icon className="w-6 h-6" />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5",
                "touch-target",
                "transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
