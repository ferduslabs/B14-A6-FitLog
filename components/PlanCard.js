'use client';

import Link from 'next/link';
import { IconCheck, IconClock, IconFlame, IconStar, IconX } from './Icons';

export default function PlanCard({ workout, isDone, showDoneButton, onMarkDone, onRemove }) {
  return (
    <div
      className={
        'flex flex-col gap-4 rounded-xl border bg-surface p-4 sm:flex-row sm:items-center ' +
        (isDone ? 'border-accent/40' : 'border-line')
      }
    >
      <img
        src={workout.image}
        alt={workout.name}
        loading="lazy"
        className="h-24 w-full shrink-0 rounded-lg object-cover sm:h-20 sm:w-28"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={
              'font-display text-base font-bold uppercase text-white ' +
              (isDone ? 'line-through decoration-accent/60' : '')
            }
          >
            {workout.name}
          </h3>
          {isDone ? (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-ink">Done</span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5 text-accent2" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <IconFlame className="h-3.5 w-3.5 text-accent2" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <IconStar className="h-3.5 w-3.5 text-accent2" />
            {workout.rating}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={'/workout/' + workout.id}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-bright transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {showDoneButton ? (
          <button
            type="button"
            onClick={onMarkDone}
            disabled={isDone}
            className={
              'flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ' +
              (isDone ? 'bg-line text-soft' : 'bg-accent text-ink hover:bg-accent2')
            }
          >
            <IconCheck className="h-3.5 w-3.5" />
            {isDone ? 'Done' : 'Mark as Done'}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg border border-line p-1.5 text-muted transition-colors hover:border-red-500/60 hover:text-red-400"
          aria-label={'Remove ' + workout.name}
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
