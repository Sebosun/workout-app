import { ReactElement } from "react";
import Workout from "./Workout";
import SubmitWorkout from "./submitWorkoutComponents/SubmitWorkout";

// transforms json we get from firebase into an object with reps and completed arrays like in the return statement
export function WorkoutWrapper(): ReactElement | null {
  return (
    <main className="p-2 lg:p-0">
      <Workout />
      <SubmitWorkout />
    </main>
  );
}
