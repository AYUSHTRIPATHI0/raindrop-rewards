'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signupUser } from '@/app/auth/actions';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserProfile, getUserProfile } from '@/lib/firestore';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Creating account...' : 'Create Account'}
    </Button>
  );
}

export function SignupForm() {
  const [state, setState] = useState<{ error: string }>({ error: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const { displayName, email, uid } = user;
        
        // Check if a user profile already exists.
        const userProfile = await getUserProfile(uid);

        if (!userProfile && displayName && email) {
            // If no profile, create one.
            await createUserProfile(uid, { name: displayName, email });
        }
        router.push('/dashboard');
    } catch (error: any) {
        console.error("Google sign-in error", error);
        setState({ error: 'Failed to sign in with Google. Please try again.' });
    }
  };

  const onFormAction = async (formData: FormData) => {
    const result = await signupUser(state, formData);
    if (result && result.error) {
      setState(result);
    }
  };

  return (
    <div className="space-y-4">
      <form action={onFormAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            minLength={6}
          />
           <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-7 text-muted-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <SubmitButton />
        {state?.error && <p className="text-sm text-red-600 text-center">{state.error}</p>}
      </form>
       <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
        <Image src="https://placehold.co/16x16.png" data-ai-hint="google logo" width={16} height={16} alt="Google logo" className="mr-2" />
        Google
      </Button>
    </div>
  );
}
