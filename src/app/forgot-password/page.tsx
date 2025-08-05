'use client';

import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email to receive a password reset link."
      footerText="Remembered your password?"
      footerLink="/login"
      footerLinkText="Log In"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
