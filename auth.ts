//Auth.js has a built-in Google provider, so we don't need the credentials-specific validation and password code.
//Using Google OAuth

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
});