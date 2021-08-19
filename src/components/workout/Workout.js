import React, { useState } from "react";
import Card from "../ui/Card";
import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import classes from "./Workout.module.css";

const Workout = (props) => {
  const [rest, setRest] = useState(false);
  const [timer, setTimer] = useState(5);
  //TODO for later - generate as many "places" as the highest set exercise
  // but make those other extra exercises disabled and unintarractible

  const disableRest = () => {
    setRest(false);
  };

  const startRest = () => {
    setRest(true);
    setTimer(100);
  };

  const timerHandler = () => {
    console.log(timer);
    setTimer((prev) => prev - 1);
  };

  return (
    <>
      {rest && (
        <RestTimer
          timer={timer}
          timerHandler={timerHandler}
          disableRest={disableRest}
        />
      )}
      <Card className={classes.exercise}>
        <div>Squat</div>
        <Excercise startRest={startRest} sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>Bench</div>
        <Excercise startRest={startRest} sets={2} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>OHP</div>
        <Excercise startRest={startRest} sets={3} reps={5} />
      </Card>
    </>
  );
};

export default Workout;
