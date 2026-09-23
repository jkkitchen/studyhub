//Server Side Function so we can use a form with a Server Action
import { signIn } from '@/auth';

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
        <button type="submit">Sign in with Google</button>
      </form>
    </main>
  );
}
