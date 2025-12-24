import { cn } from "@/lib/utils";
import { type AIBadgeVariants, aiBadgeVariants } from "./ai-badge.variants";

export interface AIBadgeProps extends AIBadgeVariants {
  /** Show sparkle icon */
  showIcon?: boolean;
  /** Custom label */
  label?: string;
  /** Additional class names */
  className?: string;
}

export function AIBadge({
  variant,
  size,
  showIcon = true,
  label = "IA",
  className,
}: AIBadgeProps) {
  return (
    <span className={cn(aiBadgeVariants({ variant, size }), className)}>
      {showIcon && <span>✨</span>}
      <span>{label}</span>
    </span>
  );
}
