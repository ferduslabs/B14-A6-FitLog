export default function LoadingSpinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent"></div>
      <p className="text-sm text-muted">{label || 'Loading workouts…'}</p>
    </div>
  );
}
