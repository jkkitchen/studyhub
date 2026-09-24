//This takes the place of middleware.ts--in the newest version of Next.js it requires it to be named proxy.ts instead

import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function proxy(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    //Add additional routes here once the pages are built (/course, /assignments, /resources)
    //Using a pattern will protect everything underneath a route, for example "/course/:path*" will protect the course page and anything nested underneath it
  ],
};
