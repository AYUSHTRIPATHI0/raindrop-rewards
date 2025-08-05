'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Trophy,
  Droplet,
  Settings,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const navLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/community', icon: Users, label: 'Community' },
  { href: '/dashboard/tutorials', icon: BookOpen, label: 'Tutorial Hub' },
  { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/dashboard/ai-corner', icon: Bot, label: 'AI Corner' },
  { href: '/dashboard/profile-settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r">
      <div className="flex items-center h-16 border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Droplet className="h-6 w-6 text-primary" />
          <span>RainDrop Rewards</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
              pathname === link.href && 'bg-primary/10 text-primary'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
