import React, { useState } from "react";
import Card from "../ui/Card";
import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import classes from "./Workout.module.css";
import { useDispatch, useSelector } from "react-redux";

const Workout = (props) => {
  const dispatch = useDispatch();

  const cooldown = useSelector((state) => state.settings.cooldown);

  const [rest, setRest] = useState(false);
  const [timer, setTimer] = useState(cooldown);
  //TODO for later - generate as many "places" as the highest set exercise - maybe max 5 ?
  // but make those other extra exercises disabled and unintarractible

  const disableRest = () => {
    setRest(false);
  };

  const startRest = () => {
    setRest(true);
    setTimer(cooldown);
  };

  const timerHandler = () => {
    console.log(timer);
    setTimer((prev) => prev - 1);
  };

  const exercisesMapped = props.data.map((item, index) => {
    return (
      <Card className={classes.exercise}>
        <div>{item.name}</div>
        <Excercise
          disableRest={disableRest}
          startRest={startRest}
          sets={item.sets}
          reps={item.reps}
        />
      </Card>
    );
  });

  return (
    <>
      {rest && (
        <RestTimer
          className={classes.timer}
          timer={timer}
          timerHandler={timerHandler}
          disableRest={disableRest}
        />
      )}
      {exercisesMapped}
    </>
  );
};

export default Workout;
