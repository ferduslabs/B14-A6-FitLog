import Link from 'next/link';
import { IconClock, IconFlame, IconStar } from './Icons';

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={'/workout/' + workout.id}
      className="group block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/60"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
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
        <h3 className="mt-3 font-display text-lg font-bold uppercase leading-snug text-white">{workout.name}</h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-xs text-muted">
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
    </Link>
  );
}
