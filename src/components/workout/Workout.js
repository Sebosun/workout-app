import React from "react";
import { useSelector } from "react-redux";

import Card from "../ui/Card";
import Button from "../ui/Button";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";

import classes from "./Workout.module.css";

const Workout = (props) => {
  const active = useSelector((state) => state.timer.active);

  //TODO for later - generate as many "places" as the highest set exercise - maybe max 5 ?
  // but make those other extra exercises disabled and unintarractible

  const exercisesMapped = props.data.map((item) => {
    return (
      <Card className={classes.exerciseWrapper}>
        <div>{item.name}</div>
        <Excercise sets={item.sets} reps={item.reps} />
      </Card>
    );
  });

  return (
    <main className={classes.wrapper}>
      {active && <RestTimer className={classes.timer} />}
      {exercisesMapped}
      <Button>Finish Exercise</Button>
    </main>
  );
};

export default Workout;
