import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="font-display text-7xl font-bold text-accent sm:text-8xl">404</p>
      <h1 className="font-display text-3xl font-bold uppercase text-white">Page not found</h1>
      <p className="max-w-md text-sm text-muted">
        The page you are looking for does not exist or has been moved. Head back to the library and keep training.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent2"
      >
        Go back home
      </Link>
    </div>
  );
}
