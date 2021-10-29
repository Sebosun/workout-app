import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import {startWorkout} from "../../store/slices/workout-slice"
import classes from "./WorkoutPage.module.css";

import Workout from "../workout/Workout";
import SubmitWorkout from "../workout/submitWorkoutComponents/SubmitWorkout";

const WorkoutPage = () => {
  const dispatch = useAppDispatch()
  const { started, completed } = useAppSelector((state) => state.workout);

  const handleStart = () => {
    dispatch(startWorkout());
  };

  if (completed) {
    return <h1>Congrats - workout completed</h1>;
  } else {
    return (
      <>
        {started && (
          <main className={classes.wrapper}>
            <Workout />
            <SubmitWorkout />
          </main>
        )}
        {!started && (
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
