// src/lib/shadcn/utils.d.ts
import { ClassValue } from 'clsx';

declare module '@/lib/shadcn/utils' {
  export function cn(...classes: ClassValue[]): string;
}
