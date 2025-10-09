// lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names intelligently.
 * Merges Tailwind classes so you don't get duplicates or conflicts.
 * Example:
 * cn("p-2", isActive && "bg-gray-100")
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
