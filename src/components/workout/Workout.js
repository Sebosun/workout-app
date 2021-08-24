import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../ui/Card";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";

import classes from "./Workout.module.css";
import SubmitWorkout from "./SubmitWorkout";
import { workoutActions } from "../../store/workout-slice";

const Workout = (props) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.timer.active);
  const workout = useSelector((state) => state.workout.workout);

  //TODO for later - generate as many "places" as the highest set exercise - maybe max 5 ?
  // but make those other extra exercises disabled and unintarractible

  const setsHandler = (index, position) => {
    const currentSets = workout[index].sets[position];
    const currentCompleted = workout[index].completed[position];
    const currentReps = workout[index].reps;

    if (currentSets === currentReps && currentCompleted === false) {
      dispatch(workoutActions.handleComplete({ index, position }));
    } else if (currentSets === 0) {
      dispatch(
        workoutActions.handleSets({ index, position, number: currentReps })
      );
    } else {
      dispatch(workoutActions.handleSets({ index, position }));
    }
  };

  const exercisesMapped = workout.map((item, index) => {
    return (
      <Card key={index + item.name} className={classes.exerciseWrapper}>
        <div>{item.name}</div>
        <Excercise
          index={index}
          sets={item.sets}
          completed={item.completed}
          reps={item.reps}
          setsHandler={setsHandler}
        />
      </Card>
    );
  });

  console.log(workout);
  return (
    <main className={classes.wrapper}>
      {active && <RestTimer />}
      {exercisesMapped}
      <SubmitWorkout />
    </main>
  );
};

export default Workout;
