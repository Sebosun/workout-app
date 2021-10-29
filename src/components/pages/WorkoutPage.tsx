import { useState } from "react";
import { useAppSelector } from "../../store/app/hooks";
import classes from "./WorkoutPage.module.css";

import Workout from "../workout/Workout";
import SubmitWorkout from "../workout/submitWorkoutComponents/SubmitWorkout";

const WorkoutPage = () => {
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const { completed } = useAppSelector((state) => state.workout);

  const handleStart = () => {
    setWorkoutStarted((prev) => !prev);
  };

  if (completed) {
    return <h1>Congrats - workout completed</h1>;
  } else {
    return (
      <>
        {workoutStarted && (
          <main className={classes.wrapper}>
            <Workout />
            <SubmitWorkout />
          </main>
        )}
        {!workoutStarted && (
          <div className="max-w-xl mx-auto">
            <button className="p-8 my-4 my-32 text-4xl btn" onClick={handleStart}>
              Start Workout
            </button>
          </div>
        )}
      </>
    );
  }
};

export default WorkoutPage;
