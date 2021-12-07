import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { startWorkout } from "../../store/slices/workout-slice";

import { WorkoutWrapper } from "../workout/WorkoutWrapper";

const WorkoutPage = () => {
  const dispatch = useAppDispatch();
  const { started, completed } = useAppSelector((state) => state.workout);

  const handleStart = () => {
    dispatch(startWorkout());
  };
  console.log("workout 2");

  if (completed) {
    return (
      <>
        <h1 className="text-center text-6xl  break-normal p-12">Congrats</h1>
        <p className="text-center text-4xl break-normal ">workout completed</p>
      </>
    );
  } else {
    return (
      <>
        {started && <WorkoutWrapper />}
        {!started && (
          <div className="mx-auto max-w-xl">
            <button
              className="p-8 my-4 my-32 text-4xl btn"
              onClick={handleStart}
            >
              Start Workout
            </button>
          </div>
        )}
      </>
    );
  }
};

export default WorkoutPage;
