import React from "react";
import Card from "../ui/Card";
import Excercise from "./Excercise";
import classes from "./Workout.module.css";

const Workout = (props) => {
  return (
    <>
      <Card className={classes.exercise}>
        <div>Squat</div>
        <Excercise sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>Bench</div>
        <Excercise sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>OHP</div>
        <Excercise sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>OHP</div>
        <Excercise sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>OHP</div>
        <Excercise sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>OHP</div>
        <Excercise sets={5} reps={5} />
      </Card>
      <Card className={classes.exercise}>
        <div>OHP</div>
        <Excercise sets={5} reps={5} />
      </Card>
    </>
  );
};

export default Workout;
