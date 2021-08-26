import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import Workout from "../workout/Workout";

const WorkoutPage = (props) => {
  const [workoutStarted, setWorkoutStarted] = useState(true);
  const { workout, completed } = useSelector((state) => state.workout);

  const handleStart = () => {
    setWorkoutStarted((prev) => !prev);
  };

  console.log(completed);

  if (completed) {
    return <h1>Completed</h1>;
  } else {
    return (
      <>
        {workoutStarted && <Workout data={workout} />}
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
