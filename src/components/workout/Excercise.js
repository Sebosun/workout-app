import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../../store/timer-slice";
import classes from "./Excercise.module.css";

// for clarity
//   sets - how many series (loops) are there
//   reps - how many repetitions of loops are there
//   ex: 3 sets 8 reps => 3 * 8 => 3 times lift heavy thing 8 times in a row

// TODO: rewrite this wiht settings-slice in redux.
// I'm thinking take out this, map it in the level higher

const state = (sets, reps) => {
  let workObj = { reps: [], activated: [] };
  for (let i = 0; i < sets; i++) {
    workObj.reps.push(parseInt(reps));
    workObj.activated.push(false);
  }
  return workObj;
};

const Exercise = (props) => {
  const cooldown = useSelector((state) => state.settings.cooldown);
  const dispatch = useDispatch();
  const [currentWorkout, setCurrentWorkout] = useState({
    sets: props.sets,
    completed: props.completed,
  });

  const handleReset = () => {
    dispatch(timerActions.setTimer(cooldown));
    dispatch(timerActions.handleAction(true));
  };

  const setsHandler = (position) => {
    setCurrentWorkout((prev) => {
      let newReps = [...prev.reps];
      let newActi = [...prev.completed];
      //if gets to 0 reset back to 18
      // TODO: make it go to 0 and change display to an "error" -> if clicked again back to 18

      // start rest if we're activating the button for the first time
      if (
        prev.reps[position] === props.reps &&
        prev.completed[position] === false
      ) {
        newActi[position] = true;
        handleReset();
        // start rest again if we 'complete'  the exercise agasin
      } else if (prev.reps[position] === 0) {
        newReps[position] = props.reps;
        newActi[position] = true;
        handleReset();
        //disable rest if we're disabling the exercise (for example user misclicked)
      } else if (prev.reps[position] === 1) {
        newReps[position] = newReps[position] - 1;
        newActi[position] = false;
        dispatch(timerActions.handleAction(false));
      } else {
        newReps[position] = newReps[position] - 1;
      }
      return { completed: newActi, reps: newReps };
    });
  };

  const setsRender = (amount) => {
    let setsArr = [];
    for (let i = 0; i < amount; i++) {
      setsArr.push(
        <button
          key={i}
          onClick={() => {}}
          className={`${classes.rep} ${
            currentWorkout.completed[i] ? null : classes.disabled
          }`}
        >
          {currentWorkout.sets[i]}
        </button>
      );
    }
    return setsArr;
  };
  const sets = setsRender(props.sets.length);

  console.log(currentWorkout, sets);
  return <div className={classes.sets}>{sets}</div>;
};

export default Exercise;
