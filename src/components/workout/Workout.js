import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "../ui/Card";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";

import classes from "./Workout.module.css";
import SubmitWorkout from "./SubmitWorkout";

const Workout = (props) => {
  const active = useSelector((state) => state.timer.active);
  const [workout, setWorkout] = useState([]);

  //TODO for later - generate as many "places" as the highest set exercise - maybe max 5 ?
  // but make those other extra exercises disabled and unintarractible

  useEffect(() => {
    function initWorkout() {
      const dupas = props.data.map((item) => {
        let workObj = { reps: [], activated: [] };
        for (let i = 0; i < item.sets; i++) {
          workObj.reps.push(parseInt(item.reps));
          workObj.activated.push(false);
        }

        return {
          name: item.name,
          sets: [...workObj.reps],
          setsCompleted: [...workObj.activated],
          reps: item.reps,
          weight: 0,
        };
      });
      return dupas;
    }

    setWorkout(initWorkout());
  }, []);

  console.log(workout);

  const exercisesMapped = workout.map((item, index) => {
    return (
      <Card key={index + item.name} className={classes.exerciseWrapper}>
        <div>{item.name}</div>
        <Excercise
          index={index}
          sets={item.sets}
          completed={item.setsCompleted}
          reps={item.reps}
        />
      </Card>
    );
  });

  return (
    <main className={classes.wrapper}>
      {active && <RestTimer />}
      {exercisesMapped}
      <SubmitWorkout />
    </main>
  );
};

export default Workout;
