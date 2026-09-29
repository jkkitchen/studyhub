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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Welcome to StudyHub!
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to organize your courses, assignments, and study resources.
        </p>

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
          className="mt-6"
        >
          <button
            type="submit"
            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}