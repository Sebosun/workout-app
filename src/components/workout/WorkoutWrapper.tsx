import { ReactElement } from "react"
import Workout from "./Workout"
import SubmitWorkout from "./submitWorkoutComponents/SubmitWorkout"

export function WorkoutWrapper(): ReactElement | null {
  return (
    <main>
      <Workout />
      <SubmitWorkout />
    </main>
  );
}
