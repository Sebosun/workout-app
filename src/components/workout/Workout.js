import React, { useState } from "react";
import Card from "../ui/Card";
import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import classes from "./Workout.module.css";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

const Workout = (props) => {
  const cooldown = useSelector((state) => state.settings.cooldown);
  const active = useSelector((state) => state.timer.active);

  const [rest, setRest] = useState(false);
  const [timer, setTimer] = useState(cooldown);
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
    <>
      {active && <RestTimer className={classes.timer} />}
      {exercisesMapped}
      <Button>Finish Exercise</Button>
    </>
  );
};

export default Workout;
