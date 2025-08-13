'use client';

import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  return (
    <AuthCard
      title="Create an Account"
      description="Join the movement. Start harvesting rainwater today."
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Log In"
    >
      <SignupForm />
    </AuthCard>
  );
}
