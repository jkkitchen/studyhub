'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/courses', label: 'Courses' },
  { href: '/assignments', label: 'Assignments' },
  { href: '/resources', label: 'Resources' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // While the sidebar is open: lock page scroll, move focus into it,
  // and let Escape close it.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      // Keep Tab focus inside the sidebar while it is open.
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header className='sticky top-0 z-40 border-b-2 border-stone-200 bg-[var(--primary)]'>
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
          <Link
            href='/'
            className='rounded-md text-2xl font-bold tracking-tight text-[var(--surface)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]'
          >
            StudyHub
          </Link>

          <button
            ref={menuButtonRef}
            type='button'
            onClick={() => setIsOpen(true)}
            aria-label='Open menu'
            aria-expanded={isOpen}
            aria-controls='site-menu'
            className='inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--surface)] transition-colors hover:bg-[var(--primary-light)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
          >
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <path d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </header>

      {/* Dimmed, blurred backdrop. Clicking it closes the menu. */}
      <div
        aria-hidden='true'
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sidebar that slides in from the right, above the page content. */}
      <aside
        id='site-menu'
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-label='Main menu'
        className={`fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col border-l-2 border-stone-200 bg-[var(--surface)] shadow-xl transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className='flex h-16 items-center justify-between border-b-2 border-stone-200 px-4'>
          <span className='text-lg font-semibold text-[var(--dark-text)]'>
            Menu
          </span>
          <button
            ref={closeButtonRef}
            type='button'
            onClick={closeMenu}
            aria-label='Close menu'
            className='inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--primary-light)] hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
          >
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
            </svg>
          </button>
        </div>

        <nav
          aria-label='Main navigation'
          className='flex-1 overflow-y-auto p-3'
        >
          <ul className='flex flex-col gap-1'>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      active
                        ? 'bg-[var(--primary-light)] text-[var(--primary-hover)]'
                        : 'text-[var(--dark-text)] hover:bg-[var(--accent-light)] hover:text-[var(--primary)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
