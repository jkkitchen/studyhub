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
    // The root layout already provides <main>, so this uses a <div>
    // to avoid nesting one <main> inside another.
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <section
        aria-labelledby="login-heading"
        className="w-full max-w-md rounded-2xl border-2 border-stone-200 bg-surface p-8 shadow-sm sm:p-10"
      >

        <h1
          id="login-heading"
          className="text-3xl font-bold tracking-tight text-dark-text"
        >
          Welcome to StudyHub
        </h1>
        <p className="mt-2 text-base text-muted">
          Sign in to keep your courses, assignments, and study resources in one
          place.
        </p>

        <form
          className="mt-8"
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-stone-200 bg-surface px-4 py-3 text-base font-semibold text-dark-text transition-colors hover:border-primary hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.17v2.84A11 11 0 0 0 12 23Z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.17a11 11 0 0 0 0 9.9l3.67-2.84Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.17 7.05l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          We only use your Google account to sign you in.
        </p>
      </section>
    </main>
  );
}