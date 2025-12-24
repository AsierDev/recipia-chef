import { cn } from "@/lib/utils";
import {
  getLevelFromPoints,
  LEVEL_CONFIG,
  type Level,
  type LevelBadgeVariants,
  levelBadgeVariants,
} from "./level-badge.variants";

export interface LevelBadgeProps extends LevelBadgeVariants {
  /** Direct level override */
  level?: Level;
  /** Calculate level from points */
  points?: number;
  /** Show icon */
  showIcon?: boolean;
  /** Additional class names */
  className?: string;
}

export function LevelBadge({
  level: levelProp,
  points,
  size,
  showIcon = true,
  className,
}: LevelBadgeProps) {
  const level =
    levelProp ?? (points !== undefined ? getLevelFromPoints(points) : "pinche");
  const config = LEVEL_CONFIG[level];

  return (
    <span className={cn(levelBadgeVariants({ level, size }), className)}>
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
}

export {
  getLevelFromPoints,
  getNextLevelProgress,
  LEVEL_CONFIG,
  type Level,
} from "./level-badge.variants";
