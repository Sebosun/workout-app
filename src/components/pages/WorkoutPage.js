import React from "react";
import Workout from "../workout/Workout";

const DUMMY_DATA = [
  { name: "bench", sets: 5, reps: 5 },
  { name: "squat", sets: 5, reps: 5 },
  { name: "deadlift", sets: 1, reps: 5 },
  { name: "deadlift", sets: 1, reps: 5 },
  { name: "deadlift", sets: 1, reps: 5 },
];

const WorkoutPage = (props) => {
  return <Workout data={DUMMY_DATA} />;
};

export default WorkoutPage;
