// Server Side Function so we can use a form with a Server Action
import type { Metadata } from 'next';
import { signIn } from '@/auth';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to StudyHub with your Google account to manage your courses, assignments, and study resources.',
  openGraph: {
    title: 'Sign In | StudyHub',
    description:
      'Sign in to StudyHub to manage your courses, assignments, and study resources.',
    type: 'website',
  },
};

export default function LoginPage() {
  return (
    <main>
      <h1>Welcome to StudyHub!</h1>

      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/' });
        }}
      >
        <button type='submit'>Sign in with Google</button>
      </form>
    </main>
  );
}
