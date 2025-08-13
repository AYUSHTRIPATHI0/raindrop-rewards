'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleButtonProps {
  variant?: 'icon' | 'gif';
  url?: string;
}

export function ThemeToggleButton({ variant = 'icon', url }: ThemeToggleButtonProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (variant === 'gif' && url) {
    return (
      <button onClick={toggleTheme} className="rounded-full overflow-hidden w-20 h-20 border-2 border-border" aria-label="Toggle theme">
        <Image src={url} alt="Theme toggle GIF" width={80} height={80} unoptimized />
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="theme-toggle-icon theme-toggle-icon-light" />
      <Moon className="theme-toggle-icon theme-toggle-icon-dark absolute" />
    </Button>
  );
}
