'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserProfile, updateUserProfile } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';

export default function ProfileSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        setLoading(true);
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setName(profile.name);
          setAvatarUrl(profile.avatar);
        }
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await updateUserProfile(user.uid, { name, avatar: avatarUrl });
    alert('Profile updated successfully!');
  };

  if (loading || authLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your name and profile picture.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
             <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input id="avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                </div>
              </div>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose how RainDrop Rewards looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label className="text-base">Appearance</Label>
            <ThemeToggleButton variant="gif" url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI1ZmNvMGZyemhpN3VsdWp4azYzcWUxcXIzNGF0enp0eW1ybjF0ZyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Fa6uUw8jgJHFVS6x1t/giphy.gif" />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
