'use client';

import { usePoints } from '@/context/PointsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Trophy, Cloud, Sparkles, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { points } = usePoints();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drop Points</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{points}</div>
            <p className="text-xs text-muted-foreground">Your reward for saving water</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">out of 20 available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sunny</div>
            <p className="text-xs text-muted-foreground">New York, NY</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">Top 10% of users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Harvesting Estimate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Get an AI-powered estimate for how much water you could collect based on your roof size and local rainfall.</p>
            <Link href="/dashboard/ai-corner">
              <Button>Go to AI Corner</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-yellow-500" />First Barrel Collected</li>
              <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-yellow-500" />DIY Guide Completed</li>
              <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-gray-400" />Community Helper</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
