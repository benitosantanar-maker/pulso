"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const STORAGE_KEY = "cafe-comercial-favorites";

function getFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function toggleFav(id: string): boolean {
  const favs = getFavorites();
  if (favs.has(id)) {
    favs.delete(id);
  } else {
    favs.add(id);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favs)));
  return favs.has(id);
}

interface Props {
  id: string; // slug para Noticia, link para FeedItem
  className?: string;
}

export default function FavoriteButton({ id, className = "" }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getFavorites().has(id));
  }, [id]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleFav(id));
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
      title={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
      className={`group/fav p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
    >
      <Heart
        className={`w-3.5 h-3.5 transition-colors ${
          saved
            ? "fill-red-400 text-red-400"
            : "text-gray-300 dark:text-gray-600 group-hover/fav:text-red-300"
        }`}
      />
    </button>
  );
}
