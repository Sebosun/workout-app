import React, { useState } from "react";
import classes from "./Excercise.module.css";

// for clarity
//   sets - how many series (loops) are there
//   reps - how many repetitions of loops are there
//   ex: 3 sets 8 reps => 3 * 8 => 3 times lift heavy thing 8 times in a row

const Exercise = (props) => {
  const [currentWorkout, setCurrentWorkout] = useState(() => {
    let workObj = { reps: [], activated: [] };

    for (let i = 0; i < props.sets; i++) {
      workObj.reps.push(parseInt(props.reps));
      workObj.activated.push(false);
    }

    return workObj;
  });

  const setsHandler = (position) => {
    setCurrentWorkout((prev) => {
      let newReps = [...prev.reps];
      let newActi = [...prev.activated];
      //if gets to 0 reset back to 18
      // TODO: make it go to 0 and change display to an "error" -> if clicked again back to 18

      // start rest if we're activating the button for the first time
      if (
        prev.reps[position] === props.reps &&
        prev.activated[position] === false
      ) {
        newActi[position] = true;
        props.startRest();
        // start rest again if we 'complete'  the exercise agasin
      } else if (prev.reps[position] === 0) {
        newReps[position] = props.reps;
        newActi[position] = true;
        props.startRest();
        //disable rest if we're disabling the exercise (for example user misclicked)
      } else if (prev.reps[position] === 1) {
        newReps[position] = newReps[position] - 1;
        newActi[position] = false;
        props.disableRest();
      } else {
        newReps[position] = newReps[position] - 1;
      }
      return { activated: newActi, reps: newReps };
    });
  };

  const setsRender = (amount) => {
    let setsArr = [];
    for (let i = 0; i < amount; i++) {
      setsArr.push(
        <button
          key={i}
          onClick={() => {
            setsHandler(i);
          }}
          className={`${classes.rep} ${
            currentWorkout.activated[i] ? null : classes.disabled
          }`}
        >
          {currentWorkout.reps[i]}
        </button>
      );
    }
    return setsArr;
  };
  const sets = setsRender(props.sets);

  return <div className={classes.sets}>{sets}</div>;
};

export default Exercise;
