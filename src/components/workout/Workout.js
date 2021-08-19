import React, { useState } from "react";
import Card from "../ui/Card";
import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import classes from "./Workout.module.css";

const Workout = (props) => {
  const [rest, setRest] = useState(false);
  const [timer, setTimer] = useState(30);
  //TODO for later - generate as many "places" as the highest set exercise
  // but make those other extra exercises disabled and unintarractible

  const disableRest = () => {
    setRest(false);
  };

  const startRest = () => {
    setRest(true);
    setTimer(30);
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
      {/* <Card className={classes.exercise}> */}
      {/*   <div>Squat</div> */}
      {/*   <Excercise */}
      {/*     disableRest={disableRest} */}
      {/*     startRest={startRest} */}
      {/*     sets={10} */}
      {/*     reps={5} */}
      {/*   /> */}
      {/* </Card> */}
      {/* <Card className={classes.exercise}> */}
      {/*   <div>Bench</div> */}
      {/*   <Excercise */}
      {/*     startRest={startRest} */}
      {/*     disableRest={disableRest} */}
      {/*     sets={2} */}
      {/*     reps={5} */}
      {/*   /> */}
      {/* </Card> */}
    </>
  );
};

export default Workout;
