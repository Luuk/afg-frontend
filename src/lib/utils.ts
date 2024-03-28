import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function listToStrings(s: string[]): string {
  const space: string = '\n';
  return s.join(space);
}
