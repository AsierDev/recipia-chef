import { cva, type VariantProps } from "class-variance-authority";

export const aiBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-ai-badge/15 text-ai-badge border border-ai-badge/25",
        solid: "bg-ai-badge text-ai-badge-foreground",
        outline: "border border-ai-badge text-ai-badge bg-transparent",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        default: "text-xs px-2 py-0.5",
        lg: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type AIBadgeVariants = VariantProps<typeof aiBadgeVariants>;
