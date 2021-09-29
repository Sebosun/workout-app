import { useState } from "react";
import { useSelector } from "react-redux";

import Button from "../ui/Button";
import Workout from "../workout/Workout";
import SubmitWorkout from "../workout/submitWorkoutComponents/SubmitWorkout";

const WorkoutPage = () => {
  const [workoutStarted, setWorkoutStarted] = useState(true);

  const { completed } = useSelector((state: any) => state.workout);

  const handleStart = () => {
    setWorkoutStarted((prev) => !prev);
  };

  if (completed) {
    return <h1>Congrats - workout completed</h1>;
  } else {
    return (
      <>
        {workoutStarted && (
          <>
            <Workout />
            <SubmitWorkout />
          </>
        )}
        {!workoutStarted && (
          <Button style={{ margin: "100px auto" }} onClick={handleStart}>
            <h1> Start workout</h1>
          </Button>
        )}
      </>
    );
  }
};

export default WorkoutPage;
