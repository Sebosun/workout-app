import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import Card from "../ui/Card";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import { WorkoutType } from "../../helpers/types/workout";

import classes from "./Workout.module.css";
import { workoutActions } from "../../store/slices/workout-slice";
import { setTimer, handleAction } from "../../store/slices/timer-slice";

const Workout = () => {
  const dispatch = useAppDispatch();

  const active = useAppSelector((state) => state.timer.active);
  const workout = useAppSelector((state) => state.workout.workout);
  const cooldown = useAppSelector((state) => state.settings.cooldown);

  const handleTimer = () => {
    dispatch(setTimer(cooldown));
    dispatch(handleAction(true));
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
    <>
      {active && <RestTimer />}

      {workout.map((item: WorkoutType, index: number) => {
        return (
          <Card
            key={index + item.name}
            className="max-w-md my-6 p-4 border-4 border-purple-700 mx-auto"
          >
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
    </>
  );
};

export default Workout;
