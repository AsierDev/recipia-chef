import { cva, type VariantProps } from "class-variance-authority";

export const levelBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      level: {
        pinche:
          "bg-level-pinche/20 text-level-pinche border border-level-pinche/30",
        cocinero:
          "bg-level-cocinero/20 text-level-cocinero border border-level-cocinero/30",
        souschef:
          "bg-level-souschef/20 text-level-souschef border border-level-souschef/30",
        chef: "bg-level-chef/20 text-level-chef border border-level-chef/30",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      level: "pinche",
      size: "default",
    },
  },
);

export type LevelBadgeVariants = VariantProps<typeof levelBadgeVariants>;

export type Level = "pinche" | "cocinero" | "souschef" | "chef";

export const LEVEL_CONFIG: Record<
  Level,
  { label: string; icon: string; minPoints: number }
> = {
  pinche: { label: "Pinche", icon: "🥄", minPoints: 0 },
  cocinero: { label: "Cocinero", icon: "👨‍🍳", minPoints: 100 },
  souschef: { label: "Sous Chef", icon: "🍳", minPoints: 500 },
  chef: { label: "Chef Ejecutivo", icon: "⭐", minPoints: 1000 },
};

export function getLevelFromPoints(points: number): Level {
  if (points >= 1000) return "chef";
  if (points >= 500) return "souschef";
  if (points >= 100) return "cocinero";
  return "pinche";
}

export function getNextLevelProgress(points: number): {
  current: number;
  max: number;
  nextLevel: Level | null;
} {
  const currentLevel = getLevelFromPoints(points);

  if (currentLevel === "chef") {
    return { current: points, max: points, nextLevel: null };
  }

  const levels: Level[] = ["pinche", "cocinero", "souschef", "chef"];
  const currentIndex = levels.indexOf(currentLevel);
  const nextLevel = levels[currentIndex + 1];
  const currentMin = LEVEL_CONFIG[currentLevel].minPoints;
  const nextMin = LEVEL_CONFIG[nextLevel].minPoints;

  return {
    current: points - currentMin,
    max: nextMin - currentMin,
    nextLevel,
  };
}
