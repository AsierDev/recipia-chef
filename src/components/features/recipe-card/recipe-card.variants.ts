import { cva, type VariantProps } from "class-variance-authority";

export const recipeCardVariants = cva(
  "group overflow-hidden rounded-xl border bg-card transition-all",
  {
    variants: {
      variant: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
        compact: "flex flex-col",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        full: "w-full",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md hover:border-primary/20 active:scale-[0.98]",
        false: "",
      },
    },
    compoundVariants: [
      // Vertical sizes
      { variant: "vertical", size: "sm", className: "w-40" },
      { variant: "vertical", size: "md", className: "w-56" },
      { variant: "vertical", size: "lg", className: "w-72" },
      // Horizontal sizes
      { variant: "horizontal", size: "sm", className: "h-24" },
      { variant: "horizontal", size: "md", className: "h-32" },
      { variant: "horizontal", size: "lg", className: "h-40" },
      // Compact sizes
      { variant: "compact", size: "sm", className: "w-32" },
      { variant: "compact", size: "md", className: "w-40" },
      { variant: "compact", size: "lg", className: "w-48" },
    ],
    defaultVariants: {
      variant: "vertical",
      size: "md",
      interactive: true,
    },
  },
);

export const recipeCardImageVariants = cva("overflow-hidden bg-muted", {
  variants: {
    variant: {
      vertical: "aspect-[4/3] w-full",
      horizontal: "aspect-square h-full w-auto shrink-0",
      compact: "aspect-square w-full",
    },
  },
  defaultVariants: {
    variant: "vertical",
  },
});

export const recipeCardContentVariants = cva("flex flex-col", {
  variants: {
    variant: {
      vertical: "p-3 gap-1.5",
      horizontal: "p-3 gap-1 flex-1 min-w-0",
      compact: "p-2 gap-1",
    },
  },
  defaultVariants: {
    variant: "vertical",
  },
});

export type RecipeCardVariants = VariantProps<typeof recipeCardVariants>;
