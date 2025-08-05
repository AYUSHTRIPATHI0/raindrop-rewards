'use client';

import { useState, useEffect } from 'react';
import { getTutorialVideos, getDiyGuides, TutorialVideo, DiyGuide } from '@/lib/firestore';
import { usePoints } from '@/context/PointsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function TutorialsPage() {
  const [videos, setVideos] = useState<TutorialVideo[]>([]);
  const [guides, setGuides] = useState<DiyGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const { addPoints } = usePoints();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [fetchedVideos, fetchedGuides] = await Promise.all([
        getTutorialVideos(),
        getDiyGuides(),
      ]);
      setVideos(fetchedVideos);
      setGuides(fetchedGuides);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleCompleteGuide = (points: number) => {
    addPoints(points);
    alert(`You've earned ${points} points!`);
  };

  if (loading) {
    return <div>Loading tutorials...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tutorial Hub</h1>
        <p className="text-muted-foreground">Learn how to set up your own rainwater harvesting system and earn points.</p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Video Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-0">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-auto aspect-video rounded-t-lg"
                ></iframe>
              </CardContent>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">DIY Read-to-Do Guides</h2>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {guides.map((guide) => (
                <AccordionItem key={guide.id} value={guide.id}>
                  <AccordionTrigger className="text-lg">{guide.title}</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>{guide.description}</p>
                    <ol className="list-decimal list-inside space-y-2">
                      {guide.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                    <Button onClick={() => handleCompleteGuide(guide.points)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete & Earn {guide.points} Points
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
