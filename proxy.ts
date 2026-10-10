//This takes the place of middleware.ts--in the newest version of Next.js it requires it to be named proxy.ts instead

import { auth } from '@/auth';
import { NextResponse, type NextRequest } from 'next/server';

const ONBOARDING_COOKIE = 'sh_onboarded';

export async function proxy(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isOnboarded = request.cookies.get(ONBOARDING_COOKIE)?.value === '1';
  const isOnboardingPage = request.nextUrl.pathname === '/onboarding';

  // First time through after signing in with Google: send them to the
  // onboarding/registration step before they can reach protected pages.
  if (!isOnboarded && !isOnboardingPage) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/onboarding',
    '/courses/:path*',
    '/assignments/:path*',
    '/resources/:path*',
    //Add additional routes here once the pages are built (/course, /assignments, /resources)
    //Using a pattern will protect everything underneath a route, for example "/course/:path*" will protect the course page and anything nested underneath it
  ],
};