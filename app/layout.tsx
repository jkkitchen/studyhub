import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { auth } from '@/auth';
import SignOutButton from '@/components/SignOutButton';


const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: {
    default: 'StudyHub',
    template: '%s | StudyHub',
  },
  description:
    'StudyHub helps college students organize their courses, assignments, and study resources in one place.',
  openGraph: {
    title: 'StudyHub',
    description:
      'Organize your courses, assignments, and study resources in one place with StudyHub.',
    type: 'website',
  },
};


export default async function RootLayout({ children }: LayoutProps<'/'>) {
  // inside RootLayout, before the return:
  const session = await auth();

  return (
    <html lang='en' className={`${nunitoSans.variable} h-full antialiased`}>
      <body className='flex flex-col min-h-dvh'>
        <Header signOutButton={session?.user ? <SignOutButton /> : null} />

        {children}

        <Footer />
      </body>
    </html>
  );
}