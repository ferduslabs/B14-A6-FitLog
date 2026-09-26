'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import { usePlan, PLAN_LIMIT } from '@/context/PlanContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { IconArrowLeft, IconBookmark, IconPlus } from '@/components/Icons';

export default function WorkoutDetailsClient({ workoutId }) {
  const planContext = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkout() {
      try {
        const response = await fetch(API_BASE);
        const data = await response.json();
        if (Array.isArray(data)) {
          const found = data.find(function (w) {
            return String(w.id) === String(workoutId);
          });
          setWorkout(found || null);
        } else {
          setWorkout(null);
        }
      } catch (error) {
        setWorkout(null);
      }
      setLoading(false);
    }
    getWorkout();
  }, [workoutId]);

  let specs = [];
  if (workout) {
    specs = [
      { label: 'Equipment', value: workout.equipment },
      { label: 'Difficulty', value: workout.difficulty },
      { label: 'Sets', value: String(workout.sets) },
      { label: 'Reps', value: workout.reps },
      { label: 'Duration', value: workout.duration + ' min' },
      { label: 'Calories', value: workout.caloriesBurned + ' kcal' },
      { label: 'Rating', value: String(workout.rating) },
    ];
  }

  const alreadyInPlan = workout ? planContext.isInPlan(workout.id) : false;
  const alreadySaved = workout ? planContext.isInSaved(workout.id) : false;
  const planIsFull = planContext.plan.length >= PLAN_LIMIT;

  function handleAddToPlan() {
    planContext.addToPlan(workout);
  }

  function handleSaveForLater() {
    planContext.addToSaved(workout);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <LoadingSpinner label="Loading workout…" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold uppercase text-white">Workout not found</h1>
        <p className="text-sm text-muted">This lift is not in the library. Head back and pick another one.</p>
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent2"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-accent2"
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <img src={workout.image} alt={workout.name} className="h-full max-h-[560px] w-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map(function (tag) {
              return (
                <span
                  key={tag}
                  className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink"
                >
                  {tag}
                </span>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
            {specs.map(function (spec, index) {
              return (
                <div
                  key={spec.label}
                  className={
                    'flex items-center justify-between px-4 py-2.5 ' +
                    (index > 0 ? 'border-t border-line' : '')
                  }
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-muted">{spec.label}</span>
                  <span className="text-sm font-medium text-bright">{spec.value}</span>
                </div>
              );
            })}
          </div>

          <h2 className="mt-8 text-base font-extrabold uppercase tracking-wide text-white">Instructions</h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions.map(function (step, index) {
              return (
                <li key={index} className="flex gap-3">
                  <span className="shrink-0 text-sm text-muted">{index + 1}.</span>
                  <span className="text-sm leading-relaxed text-soft">{step}</span>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAddToPlan}
              disabled={alreadyInPlan || planIsFull}
              className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors enabled:hover:bg-accent2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconPlus className="h-4 w-4" />
              {alreadyInPlan ? "In today's plan" : planIsFull ? 'Plan is full (5 lifts)' : "Add to today's plan"}
            </button>
            <button
              type="button"
              onClick={handleSaveForLater}
              disabled={alreadySaved}
              className="flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-medium text-bright transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconBookmark className="h-4 w-4" />
              {alreadySaved ? 'Saved' : 'Save for later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
