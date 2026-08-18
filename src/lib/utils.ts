import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix an absolute-looking asset path (e.g. "/img/foo.png") with Vite's BASE_URL.
 *  This makes root-relative asset URLs work under subpath deploys (e.g. GitHub Pages /pdm-site/).
 *  Pass any src through this so we never have to hard-code the base. */
export function asset(path: string): string;
export function asset(path: null | undefined): null;
export function asset(path: string | null | undefined): string | null;
export function asset(path: string | null | undefined): string | null {
  if (!path) return null;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
