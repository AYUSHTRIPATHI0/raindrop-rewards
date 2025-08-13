'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPassword } from '@/app/auth/actions';
import { useEffect, useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Password Reset Link'}
    </Button>
  );
}

export function ForgotPasswordForm() {
  const [state, setState] = useState<{ error?: string, message?: string }>({});

  useEffect(() => {
    if(state.message) {
      alert(state.message);
    }
  }, [state.message]);
  
  const onFormAction = async (formData: FormData) => {
    const result = await forgotPassword(state, formData);
    setState(result);
  };

  return (
    <form action={onFormAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          autoComplete="email"
        />
      </div>
      <SubmitButton />
      {state.error && <p className="text-sm text-red-600 text-center">{state.error}</p>}
      {state.message && <p className="text-sm text-green-600 text-center">{state.message}</p>}
    </form>
  );
}
