import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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



export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='flex flex-col min-h-dvh'>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}