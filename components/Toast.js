'use client';

import { usePlan } from '@/context/PlanContext';
import { IconCheck, IconX } from './Icons';

export default function Toast() {
  const planContext = usePlan();

  if (planContext.toast === null) {
    return null;
  }

  const isError = planContext.toast.type === 'error';

  return (
    <div className="pointer-events-none fixed right-4 top-16 z-50 sm:right-6">
      <div
        className={
          'toast-in flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-lg backdrop-blur ' +
          (isError
            ? 'border-red-500/40 bg-black/85 text-white'
            : 'border-white/10 bg-black/85 text-white')
        }
      >
        <span
          className={
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full ' +
            (isError ? 'bg-red-500' : 'bg-green-500')
          }
        >
          {isError ? (
            <IconX className="h-3 w-3 text-white" />
          ) : (
            <IconCheck className="h-3 w-3 text-white" />
          )}
        </span>
        <p className="whitespace-nowrap text-sm font-medium">{planContext.toast.message}</p>
      </div>
    </div>
  );
}
