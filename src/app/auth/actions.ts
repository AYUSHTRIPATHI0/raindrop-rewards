'use server';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserProfile } from '@/lib/firestore';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Invalid email address." });
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters." });

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);
  } catch (e: any) {
    return { error: e.errors[0].message };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
        return { error: 'Invalid email or password.' };
    }
    return { error: 'An unexpected error occurred. Please try again.' };
  }
  redirect('/dashboard');
}

export async function signupUser(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name) {
    return { error: 'Name is required.'}
  }

  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);
  } catch (e: any) {
    return { error: e.errors[0].message };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    await createUserProfile(user.uid, { name, email });
  } catch (error: any) {
     if (error.code === 'auth/email-already-in-use') {
      return { error: 'This email is already in use.' };
    }
    return { error: 'An unexpected error occurred. Please try again.' };
  }
  redirect('/dashboard');
}

export async function forgotPassword(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    
    try {
        emailSchema.parse(email);
    } catch (e: any) {
        return { error: e.errors[0].message };
    }

    try {
        await sendPasswordResetEmail(auth, email);
        return { message: 'Password reset link sent successfully.' };
    } catch (error: any) {
        return { error: 'Failed to send password reset email. Please check the email address.' };
    }
}

export async function logoutUser() {
  await signOut(auth);
  redirect('/login');
}
