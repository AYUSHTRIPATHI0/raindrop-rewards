'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile, updateUserPoints } from '@/lib/firestore';

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  loading: boolean;
}

const PointsContext = createContext<PointsContextType>({
  points: 0,
  addPoints: () => {},
  loading: true,
});

export function PointsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPoints() {
      if (user) {
        setLoading(true);
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setPoints(profile.points);
        }
        setLoading(false);
      } else {
        setPoints(0);
        setLoading(false);
      }
    }
    fetchPoints();
  }, [user]);

  const addPoints = async (amount: number) => {
    if (user) {
      const newPoints = points + amount;
      setPoints(newPoints);
      await updateUserPoints(user.uid, newPoints);
    }
  };

  const value = { points, addPoints, loading };

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
}

export const usePoints = () => {
  return useContext(PointsContext);
};
