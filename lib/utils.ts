import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeUntil(date: string | Date) {
  const now = new Date().getTime();
  const targetDate = new Date(date).getTime();

  // Calculate the difference in milliseconds
  const difference = targetDate - now;

  // If the date is in the past, return 0
  if (difference <= 0) return 'Expired';

  // Convert milliseconds to time components
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
}