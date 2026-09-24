//The [...nextauth] folder name means that this route can cover several different authentication URLs, such as:
// /api/auth/signin, /api/auth/signout, /api/auth/session, /api/auth/callback/google
//**Note--Auth uses signIn and signOut so I will be using those rather than logIn and logOut

import { handlers } from '@/auth';

export const { GET, POST } = handlers;
