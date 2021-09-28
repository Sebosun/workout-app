import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../ui/Card";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import { WorkoutType } from "../../helpers/types/workout";

import classes from "./Workout.module.css";
import { workoutActions } from "../../store/workout-slice";
import { timerActions } from "../../store/timer-slice";

const Workout = () => {
  const dispatch = useDispatch();

  // TODO: do after redux
  const active = useSelector((state: any) => state.timer.active);
  const workout = useSelector((state: any) => state.workout.workout);
  const cooldown = useSelector((state: any) => state.settings.cooldown);

  const handleTimer = () => {
    dispatch(timerActions.setTimer(cooldown));
    dispatch(timerActions.handleAction(true));
  };

  const setsHandler = (index: number, position: number) => {
    const currentSets = workout[index].sets[position];
    const currentCompleted = workout[index].completed[position];
    const currentReps = workout[index].reps;

    if (currentSets === currentReps && currentCompleted === false) {
      dispatch(workoutActions.handleSetComplete({ index, position }));
      handleTimer();
    } else if (currentSets === 0) {
      dispatch(
        workoutActions.handleSets({ index, position, number: currentReps })
      );
      dispatch(
        workoutActions.handleSetComplete({
          index,
          position,
          number: currentReps,
        })
      );
    } else {
      dispatch(workoutActions.handleSets({ index, position }));
    }
  };

  return (
    <main className={classes.wrapper}>
      {active && <RestTimer />}

      {workout.map((item: WorkoutType, index: number) => {
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
      })}
    </main>
  );
};

export default Workout;
