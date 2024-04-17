import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSectionIdsFromHTML(
  htmlText: string
): { value: string; label: string }[] {
  const sectionsData: { value: string; label: string }[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  const sections = doc.querySelectorAll('section[id]');
  sections.forEach((section) => {
    const id = section.id;
    const capitalizedLabel = id
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    sectionsData.push({ value: id, label: capitalizedLabel });
  });
  return sectionsData;
}
