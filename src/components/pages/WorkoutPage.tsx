import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { displayError } from "../../store/slices/ui-slice";
import { startWorkout } from "../../store/slices/workout-slice";

import { WorkoutWrapper } from "../workout/WorkoutWrapper";

const WorkoutPage = () => {
  const dispatch = useAppDispatch();
  const { started, completed } = useAppSelector((state) => state.workout);
  const { currentWorkoutTemplate } = useAppSelector((state) => state.settings);

  const handleStart = () => {
    if (currentWorkoutTemplate === "") {
      dispatch(displayError("Please select a workout template."));
    } else {
      dispatch(startWorkout());
    }
  };

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
          <div className="mx-auto p-4 max-w-xl">
            <button className="p-8 my-32 text-4xl btn" onClick={handleStart}>
              Start Workout
            </button>
          </div>
        )}
      </>
    );
  }
};

export default WorkoutPage;
