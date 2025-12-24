import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AIBadge } from "../ai-badge";
import { type Level, LevelBadge } from "../level-badge";
import {
  type RecipeCardVariants,
  recipeCardContentVariants,
  recipeCardImageVariants,
  recipeCardVariants,
} from "./recipe-card.variants";

export interface RecipeCardProps extends RecipeCardVariants {
  /** Recipe data */
  recipe: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    cookTime?: number;
    servings?: number;
    author?: {
      name: string;
      avatarUrl?: string;
      level?: Level;
    };
    isAIGenerated?: boolean;
  };
  /** Show author info */
  showAuthor?: boolean;
  /** Show AI badge if applicable */
  showAIBadge?: boolean;
  /** Show time and servings */
  showMeta?: boolean;
  /** Link to recipe detail */
  href?: string;
  /** Additional class names */
  className?: string;
}

export function RecipeCard({
  recipe,
  variant = "vertical",
  size = "md",
  interactive = true,
  showAuthor = true,
  showAIBadge = true,
  showMeta = true,
  href,
  className,
}: RecipeCardProps) {
  const cardClasses = cn(
    recipeCardVariants({ variant, size, interactive }),
    className,
  );

  const cardContent = (
    <>
      {/* Image */}
      <div className={cn(recipeCardImageVariants({ variant }), "relative")}>
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes={
              variant === "horizontal"
                ? "128px"
                : "(max-width: 768px) 50vw, 25vw"
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
            🍽️
          </div>
        )}

        {/* AI Badge overlay */}
        {showAIBadge && recipe.isAIGenerated && (
          <div className="absolute top-2 right-2">
            <AIBadge size="sm" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn(recipeCardContentVariants({ variant }))}>
        {/* Title */}
        <h3
          className={cn(
            "font-semibold leading-tight line-clamp-2",
            variant === "compact" ? "text-sm" : "text-base",
          )}
        >
          {recipe.title}
        </h3>

        {/* Description (only for vertical/horizontal md+) */}
        {recipe.description && variant !== "compact" && size !== "sm" && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Meta info */}
        {showMeta && (recipe.cookTime || recipe.servings) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {recipe.cookTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {recipe.cookTime} min
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {recipe.servings}
              </span>
            )}
          </div>
        )}

        {/* Author */}
        {showAuthor && recipe.author && variant !== "compact" && (
          <div className="flex items-center gap-2 mt-auto pt-1">
            {recipe.author.avatarUrl ? (
              <Image
                src={recipe.author.avatarUrl}
                alt={recipe.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">
                {recipe.author?.name?.trim().charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <span className="text-xs text-muted-foreground truncate flex-1">
              {recipe.author.name}
            </span>
            {recipe.author.level && (
              <LevelBadge
                level={recipe.author.level}
                size="sm"
                showIcon={false}
              />
            )}
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClasses}>{cardContent}</div>;
}
