'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { createPost, getPosts, likePost, Post } from '@/lib/firestore';
import { Heart, MessageCircle } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      const fetchPosts = async () => {
        setLoading(true);
        const unsubscribe = await getPosts(setPosts);
        setLoading(false);
        return () => unsubscribe();
      };
      fetchPosts();
    }
  }, [authLoading, user]);

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    const postData = {
      content: newPostContent,
      user: {
        uid: user.uid,
        name: user.displayName || 'Anonymous User',
        avatar: user.photoURL || 'https://placehold.co/40x40.png',
      },
      createdAt: Timestamp.now(),
      likes: 0,
    };
    await createPost(postData);
    setNewPostContent('');
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    await likePost(postId, user.uid);
  };
  
  if (loading) {
    return <div>Loading Community Posts...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Community Hub</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Create a new post</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <Textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share your latest rainwater harvesting success!"
              rows={4}
            />
            <Button type="submit" disabled={!newPostContent.trim()}>Post</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.createdAt.toDate().toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => handleLike(post.id!)}>
                <Heart className="h-4 w-4 mr-2" />
                {post.likes} Likes
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
