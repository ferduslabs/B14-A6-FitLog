'use client';

import { useEffect, useState } from 'react';
import { fetchWorkouts } from '@/lib/fetchWorkouts';
import { asset } from '@/lib/asset';
import WorkoutCard from '@/components/WorkoutCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { IconArrowRight } from '@/components/Icons';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch (error) {
        setWorkouts([]);
      }
      setLoading(false);
    }
    getWorkouts();
  }, []);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.55em] text-accent2">Workout Library</p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Train with intent. Log every set.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&rsquo;s plan, and watch
              the week&rsquo;s work add up.
            </p>
            <a
              href="#library"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent2"
            >
              Browse Workouts
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <img src={asset('/banner.png')} alt="Train with FitLog" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section id="library" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 pt-6">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold uppercase text-white">The Library</h2>
          <p className="mt-2 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading workouts…" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map(function (workout) {
              return <WorkoutCard key={workout.id} workout={workout} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
}
