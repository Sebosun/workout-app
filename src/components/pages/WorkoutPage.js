import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import Workout from "../workout/Workout";

const WorkoutPage = (props) => {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const workoutRdx = useSelector((state) => state.workout.workout);

  const handleStart = () => {
    setWorkoutStarted((prev) => !prev);
  };

  return (
    <>
      {workoutStarted && <Workout data={workoutRdx} />}
      {!workoutStarted && (
        <Button style={{ margin: "100px auto" }} onClick={handleStart}>
          <h1> Start workout</h1>
        </Button>
      )}
    </>
  );
};

export default WorkoutPage;
