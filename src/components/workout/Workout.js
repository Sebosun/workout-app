import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../ui/Card";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";

import classes from "./Workout.module.css";
import SubmitWorkout from "./SubmitWorkout";
import { workoutActions } from "../../store/workout-slice";
import { timerActions } from "../../store/timer-slice";

const Workout = (props) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.timer.active);
  const workout = useSelector((state) => state.workout.workout);
  const cooldown = useSelector((state) => state.settings.cooldown);

  const handleTimer = () => {
    dispatch(timerActions.setTimer(cooldown));
    dispatch(timerActions.handleAction(true));
  };

  const setsHandler = (index, position) => {
    const currentSets = workout[index].sets[position];
    const currentCompleted = workout[index].completed[position];
    const currentReps = workout[index].reps;

    if (currentSets === currentReps && currentCompleted === false) {
      dispatch(workoutActions.handleComplete({ index, position }));
      handleTimer();
    } else if (currentSets === 0) {
      dispatch(
        workoutActions.handleSets({ index, position, number: currentReps })
      );
      dispatch(
        workoutActions.handleComplete({ index, position, number: currentReps })
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
