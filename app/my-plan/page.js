'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWorkouts } from '@/lib/fetchWorkouts';
import { usePlan } from '@/context/PlanContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import PlanCard from '@/components/PlanCard';
import { IconChevronDown, IconSearch } from '@/components/Icons';

export default function MyPlanPage() {
  const planContext = usePlan();
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('plan');
  const [sortBy, setSortBy] = useState('duration');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function getWorkouts() {
      try {
        const data = await fetchWorkouts();
        if (Array.isArray(data)) {
          setAllWorkouts(data);
        } else {
          setAllWorkouts([]);
        }
      } catch (error) {
        setAllWorkouts([]);
      }
      setLoading(false);
    }
    getWorkouts();
  }, []);

  const planList = allWorkouts.filter(function (workout) {
    return planContext.plan.indexOf(workout.id) !== -1;
  });

  const savedList = allWorkouts.filter(function (workout) {
    return planContext.saved.indexOf(workout.id) !== -1;
  });

  function getTotalMinutes() {
    let total = 0;
    for (let i = 0; i < planList.length; i++) {
      total += planList[i].duration;
    }
    return total;
  }

  function getTotalCalories() {
    let total = 0;
    for (let i = 0; i < planList.length; i++) {
      total += planList[i].caloriesBurned;
    }
    return total;
  }

  function getSortedList(list) {
    const sortedList = [...list];
    if (sortBy === 'calories') {
      sortedList.sort(function (a, b) {
        return a.caloriesBurned - b.caloriesBurned;
      });
    } else if (sortBy === 'rating') {
      sortedList.sort(function (a, b) {
        return b.rating - a.rating;
      });
    } else {
      sortedList.sort(function (a, b) {
        return a.duration - b.duration;
      });
    }
    return sortedList;
  }

  function getVisibleList() {
    let list = activeTab === 'plan' ? planList : savedList;
    list = getSortedList(list);
    if (searchText.trim() !== '') {
      const query = searchText.toLowerCase();
      list = list.filter(function (item) {
        const nameMatch = item.name.toLowerCase().indexOf(query) !== -1;
        let tagMatch = false;
        for (let i = 0; i < item.muscleGroups.length; i++) {
          if (item.muscleGroups[i].toLowerCase().indexOf(query) !== -1) {
            tagMatch = true;
          }
        }
        return nameMatch || tagMatch;
      });
    }
    return list;
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  function handleMarkDone(workout) {
    planContext.markAsDone(workout.id);
  }

  function handleRemove(workout) {
    if (activeTab === 'plan') {
      planContext.removeFromPlan(workout.id);
    } else {
      planContext.removeFromSaved(workout.id);
    }
  }

  function getTabClass(isActive) {
    let baseClass = 'border-b-2 pb-2 text-xs transition-colors';
    if (isActive) {
      return baseClass + ' border-accent font-bold text-white';
    }
    return baseClass + ' border-transparent font-normal text-muted2 hover:text-soft';
  }

  const visibleList = getVisibleList();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold uppercase text-white">MY PLAN</h1>
      <p className="mt-2 text-sm text-muted2">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-line bg-surface px-4 py-5">
          <p className="font-display text-4xl font-bold text-accent">{planList.length}</p>
          <p className="mt-1 text-xs text-muted2">Exercises</p>
        </div>
        <div className="rounded-xl border border-line bg-surface px-4 py-5">
          <p className="font-display text-4xl font-bold text-accent">{getTotalMinutes()}</p>
          <p className="mt-1 text-xs text-muted2">Minutes</p>
        </div>
        <div className="rounded-xl border border-line bg-surface px-4 py-5">
          <p className="font-display text-4xl font-bold text-accent">{getTotalCalories()}</p>
          <p className="mt-1 text-xs text-muted2">Calories</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button type="button" className={getTabClass(activeTab === 'plan')} onClick={setActiveTab.bind(null, 'plan')}>
            Today&rsquo;s Plan
          </button>
          <button
            type="button"
            className={getTabClass(activeTab === 'saved')}
            onClick={setActiveTab.bind(null, 'saved')}
          >
            Saved
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <IconSearch className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search by name or tag"
              className="w-52 rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-xs text-soft placeholder:text-muted2 focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted2">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-9 text-xs font-medium text-soft focus:border-accent focus:outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading workouts…" />
      ) : (
        <div className="mt-6 space-y-4">
          {visibleList.length === 0 ? (
            searchText.trim() !== '' ? (
              <p className="py-12 text-center text-sm text-muted">No workouts match your search.</p>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface py-16 text-center">
                <h2 className="font-display text-xl font-bold uppercase text-white">Nothing here yet</h2>
                <p className="text-xs text-[#a1a1aa]">Browse the library and add a lift to get today moving.</p>
                <Link
                  href="/"
                  className="mt-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-accent2"
                >
                  Go to workouts
                </Link>
              </div>
            )
          ) : (
            visibleList.map(function (workout) {
              return (
                <PlanCard
                  key={workout.id}
                  workout={workout}
                  isDone={planContext.done.indexOf(workout.id) !== -1}
                  showDoneButton={activeTab === 'plan'}
                  onMarkDone={handleMarkDone.bind(null, workout)}
                  onRemove={handleRemove.bind(null, workout)}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
