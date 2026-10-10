//To use this button, uncomment and copy these two lines of code to the page or component where it will be used:
// import SignOutButton from '@/components/SignOutButton';
{
  /* <SignOutButton />; */
}

import { signOut } from '@/auth';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button
        type='submit'
        className='block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-danger transition-colors hover:bg-danger-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
      >
        Sign Out
      </button>
    </form>
  );
}