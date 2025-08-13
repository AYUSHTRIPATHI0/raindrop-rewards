import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Droplet, Trophy, Users, Sparkles } from 'lucide-react';

const AnimatedDroplet = () => (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute w-full h-full bg-primary/20 rounded-full animate-ping"></div>
      <div className="absolute w-48 h-48 bg-primary/30 rounded-full animate-ping delay-100"></div>
      <Droplet className="w-32 h-32 text-primary" strokeWidth={1.5} />
    </div>
  );
  

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center container mx-auto">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Droplet className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-lg">RainDrop Rewards</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Log In
          </Link>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 items-center">
              <div className="flex flex-col justify-center items-center space-y-4">
                <AnimatedDroplet />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mt-8">
                  Turn Rain into Rewards
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join a community of eco-warriors. Harvest rainwater, track your impact with AI, and earn points for your sustainable efforts.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                   <Button asChild size="lg">
                    <Link href="/signup">Create Your Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Get Started</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From AI-powered estimates to a thriving community, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <Sparkles className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Estimates</h3>
                <p className="text-muted-foreground">
                  Use our AI to estimate how much water you can collect based on your location and roof size.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <Trophy className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Gamified Progress</h3>
                <p className="text-muted-foreground">
                  Complete DIY tutorials, harvest water, and earn Drop Points to climb the leaderboard.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Community Hub</h3>
                <p className="text-muted-foreground">
                  Share your successes, ask questions, and connect with other sustainability champions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} RainDrop Rewards. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
