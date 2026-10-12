// Since we only use Google OAuth, there's no traditional "sign up with a
// password" step. Instead, this page acts as the welcome step:
// it runs once, right after a user's first successful Google sign-in
// (proxy.ts sends them here) and marks them
// as onboarded so they aren't sent back here on future visits.

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const ONBOARDING_COOKIE = 'sh_onboarded';

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  async function completeOnboarding() {
    'use server';

    const cookieStore = await cookies();
    cookieStore.set(ONBOARDING_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });

    redirect('/');
  }

  const firstName = session.user.name?.split(' ')[0];

  return (
    <main className='flex min-h-[70vh] items-center justify-center px-4 py-12'>
      <section
        aria-labelledby='onboarding-heading'
        className='w-full max-w-md rounded-2xl border-2 border-stone-200 bg-surface p-8 shadow-sm sm:p-10'
      >
        <div
          aria-hidden='true'
          className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary'
        >
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
            <path d='M22 4 12 14.01l-3-3' />
          </svg>
        </div>

        <h1
          id='onboarding-heading'
          className='text-3xl font-bold tracking-tight text-dark-text'
        >
          Welcome to StudyHub
          {firstName && (
            <>
              , <span className='text-primary'>{firstName}</span>
            </>
          )}
          !
        </h1>
        <p className='mt-2 text-base text-muted'>
          You&apos;re signed in as{' '}
          <span className='font-semibold text-dark-text'>
            {session.user.email}
          </span>
          . You&apos;re ready to start organizing your courses, assignments, and
          resources!
        </p>

        <form action={completeOnboarding} className='mt-8'>
          <button
            type='submit'
            className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
          >
            Get started
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 12h14M13 6l6 6-6 6' />
            </svg>
          </button>
        </form>
      </section>
    </main>
  );
}