import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['12', '14', '14-08', '16', '18', '20', '24', '28', '36', '48', '74'],
      spacing: [
        'space-4',
        'space-8',
        'space-10',
        'space-12',
        'space-13',
        'space-14',
        'space-15',
        'space-16',
        'space-18',
        'space-20',
        'space-22',
        'space-24',
        'space-25',
        'space-28',
        'space-30',
        'space-32',
        'space-36',
        'space-39',
        'space-40',
        'space-44',
        'space-48',
        'space-50',
        'space-55',
        'space-60',
        'space-64',
        'space-80',
        'space-83',
        'space-104',
        'space-112',
        'space-120',
        'space-154',
        'space-190',
        'space-406',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
