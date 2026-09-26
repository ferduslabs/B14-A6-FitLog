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
    <div className="pointer-events-none fixed right-4 top-20 z-50 sm:right-6">
      <div
        className={
          'toast-in flex items-center gap-3 rounded-xl border px-4 py-2.5 shadow-xl backdrop-blur ' +
          (isError
            ? 'border-red-500/30 bg-[#0a0a0a]/95 text-white'
            : 'border-white/10 bg-[#0a0a0a]/95 text-white')
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
