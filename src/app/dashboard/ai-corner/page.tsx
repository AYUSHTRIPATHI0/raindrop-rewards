'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateWaterFacts } from '@/ai/flows/generate-water-facts';
import { Bot, Droplet, Sparkles } from 'lucide-react';

export default function AICornerPage() {
  const [facts, setFacts] = useState<string[]>([]);
  const [factsLoading, setFactsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const handleFetchFacts = async () => {
      setFactsLoading(true);
      try {
        const response = await generateWaterFacts();
        setFacts(response.facts);
      } catch (error) {
        console.error('Error fetching water facts:', error);
        setFacts(['Could not load facts at this time. Please try again.']);
      } finally {
        setFactsLoading(false);
      }
    };
    handleFetchFacts();
  }, []);
  
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    
    const newMessages = [...chatMessages, { role: 'user' as const, text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setChatLoading(true);
    
    // Simple mock chatbot response
    setTimeout(() => {
      setChatMessages([...newMessages, { role: 'bot' as const, text: "Thanks for your question! While I'm still learning, a great way to save water is to install a rain barrel to collect runoff from your roof." }]);
      setChatLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Corner</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Why Harvest Water?</CardTitle>
            <Sparkles className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Discover compelling, AI-powered reasons to start conserving water today.
            </p>
            {factsLoading && <p>Generating facts...</p>}
            {facts.length > 0 && !factsLoading && (
              <ul className="mt-6 space-y-3">
                {facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Droplet className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ask a Water-Saving Bot</CardTitle>
            <Bot className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent className="flex flex-col h-[400px]">
            <div className="flex-grow overflow-y-auto pr-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                  <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                 <div className="flex items-end gap-2 justify-start">
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="h-2 w-12 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                  </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about saving water..."
                disabled={chatLoading}
              />
              <Button type="submit" disabled={chatLoading}>Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
