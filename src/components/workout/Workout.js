import React from "react";
import Excercise from "./Excercise";

const Workout = (props) => {
  return (
    <>
      <div>
        <span>Squat</span>
        <Excercise sets={10} reps={5} />
      </div>
      <div>
        <span>Bench</span>
        <Excercise sets={10} reps={2} />
      </div>
      <div>
        <span>OHP</span>
        <Excercise sets={10} reps={2} />
      </div>
    </>
  );
};

export default Workout;
