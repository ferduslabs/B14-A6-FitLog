import Link from 'next/link';
import { asset } from '@/lib/asset';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface2">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <img src={asset('/logo.png')} alt="FitLog logo" className="h-7 w-7" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white">FitLog</span>
        </Link>
        <p className="text-xs text-[#6b7280]">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
