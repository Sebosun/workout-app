import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import Workout from "../workout/Workout";
import SubmitWorkout from "../workout/submitWorkoutComponents/SubmitWorkout";

const WorkoutPage = (props) => {
  const [workoutStarted, setWorkoutStarted] = useState(true);

  const { workout, completed } = useSelector((state) => state.workout);

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
            <Workout data={workout} />
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
