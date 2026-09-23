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
      <button type="submit">Sign Out</button>
    </form>
  );
}