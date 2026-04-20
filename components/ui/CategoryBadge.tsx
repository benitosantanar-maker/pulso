import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategoryMeta } from "@/lib/categories";
import type { Category } from "@/types";

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
  linked?: boolean;
}

export default function CategoryBadge({
  category,
  size = "sm",
  linked = true,
}: CategoryBadgeProps) {
  const meta = getCategoryMeta(category);

  const badge = (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        meta.bgColor,
        meta.textColor,
        meta.borderColor,
        size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1"
      )}
    >
      {meta.label}
    </span>
  );

  if (!linked) return badge;

  return (
    <Link href={`/categoria/${category}`} className="hover:opacity-80 transition-opacity">
      {badge}
    </Link>
  );
}
