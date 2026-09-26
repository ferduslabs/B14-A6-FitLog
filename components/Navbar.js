'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { usePlan } from '@/context/PlanContext';
import { asset } from '@/lib/asset';
import { IconMenu, IconX } from './Icons';

export default function Navbar() {
  const pathname = usePathname();
  const planContext = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  function getNavLinkClass(isActive) {
    let baseClass = 'text-xs transition-colors';
    if (isActive) {
      return baseClass + ' font-semibold text-accent2';
    }
    return baseClass + ' font-medium text-muted hover:text-soft';
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={asset('/logo.png')} alt="FitLog logo" className="h-8 w-8" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white">FitLog</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={getNavLinkClass(pathname === '/')}>
            Workout
          </Link>
          <Link href="/my-plan" className={getNavLinkClass(pathname.indexOf('/my-plan') === 0)}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-surface2"
          >
            Plan
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-ink">
              {planContext.plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-surface2"
          >
            Saved
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full border border-white/40 px-1 text-[10px] font-bold text-white">
              {planContext.saved.length}
            </span>
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-md border border-line p-2 text-soft md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-line px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className={getNavLinkClass(pathname === '/')} onClick={closeMenu}>
              Workout
            </Link>
            <Link href="/my-plan" className={getNavLinkClass(pathname.indexOf('/my-plan') === 0)} onClick={closeMenu}>
              My Plan
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
