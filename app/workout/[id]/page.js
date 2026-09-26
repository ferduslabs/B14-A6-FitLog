import API_BASE from '@/lib/api';
import WorkoutDetailsClient from '@/components/WorkoutDetailsClient';

const FALLBACK_IDS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export async function generateStaticParams() {
  let ids = FALLBACK_IDS;
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      ids = data.map(function (workout) {
        return String(workout.id);
      });
    }
  } catch (error) {
    // API unreachable during build, fall back to the known library ids
  }
  return ids.map(function (id) {
    return { id: id };
  });
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  return <WorkoutDetailsClient workoutId={id} />;
}
