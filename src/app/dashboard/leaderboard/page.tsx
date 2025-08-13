'use client';

import { useState, useEffect } from 'react';
import { getLeaderboardUsers, UserProfile } from '@/lib/firestore';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Medal } from 'lucide-react';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const leaderboardUsers = await getLeaderboardUsers();
      setUsers(leaderboardUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading Leaderboard...</div>;
  }
  
  const getMedal = (rank: number) => {
    if (rank === 1) return <Medal className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-400" />;
    return <span className="text-sm font-semibold w-5 text-center">{rank}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Harvesters</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p>The leaderboard is quiet... Be the first to get on it!</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={user.uid}
                className={`flex items-center p-3 rounded-lg ${currentUser?.uid === user.uid ? 'bg-primary/10' : ''}`}
              >
                <div className="w-8 mr-4 flex justify-center items-center">
                  {getMedal(index + 1)}
                </div>
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">{user.name}</p>
                </div>
                <div className="font-bold text-lg text-primary">{user.points} pts</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
