// Since we only use Google OAuth, there's no traditional "sign up with a
// password" step. Instead, this page acts as the registration/welcome step:
// it runs once, right after a user's first successful Google sign-in
// (proxy.ts sends them here), lets them confirm their name, and marks them
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

  async function completeOnboarding(formData: FormData) {
    'use server';

    const name = formData.get('name')?.toString().trim();

    // TODO: once lib/db.ts / a User model exists, this is where we should
    // create or update the User record (confirmed name, any extra profile
    // fields we add later) instead of only relying on the cookie below.
    console.log('Onboarding submitted for', session?.user?.email, { name });

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
          . Confirm your details to finish setting up your account.
        </p>

        <form action={completeOnboarding} className='mt-8 flex flex-col gap-5'>
          <div>
            <label
              htmlFor='name'
              className='mb-1.5 block text-sm font-semibold text-dark-text'
            >
              Display name <span className='text-danger'>*</span>
            </label>
            <input
              id='name'
              name='name'
              type='text'
              defaultValue={session.user.name ?? ''}
              required
              placeholder='Your name'
              className='w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none'
            />
          </div>

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