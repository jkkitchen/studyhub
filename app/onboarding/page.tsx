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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Welcome to StudyHub{firstName ? `, ${firstName}` : ''}!
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You&apos;re signed in as {session.user.email}. Confirm your details
          to finish setting up your account.
        </p>

        <form action={completeOnboarding} className="mt-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Display name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={session.user.name ?? ''}
              required
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get started
          </button>
        </form>
      </div>
    </main>
  );
}