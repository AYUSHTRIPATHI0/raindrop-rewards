import { ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet } from 'lucide-react';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthCard({ children, title, description, footerText, footerLink, footerLinkText }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Link href="/" className="flex items-center mb-6 text-2xl font-semibold">
        <Droplet className="w-8 h-8 mr-2 text-primary" />
        RainDrop Rewards
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full">
            {footerText}{' '}
            <Link href={footerLink} className="underline">
              {footerLinkText}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
