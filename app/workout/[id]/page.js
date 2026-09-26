import { fetchWorkouts, fallbackWorkouts } from '@/lib/fetchWorkouts';
import WorkoutDetailsClient from '@/components/WorkoutDetailsClient';

export async function generateStaticParams() {
  let workouts = fallbackWorkouts;
  try {
    const data = await fetchWorkouts();
    if (Array.isArray(data) && data.length > 0) {
      workouts = data;
    }
  } catch (error) {
    // API unreachable during build, use fallback
  }
  return workouts.map(function (workout) {
    return { id: String(workout.id) };
  });
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  return <WorkoutDetailsClient workoutId={id} />;
}
