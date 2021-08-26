import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";

import firebase from "firebase/app";
import "firebase/firestore";
import { workoutActions } from "../../store/workout-slice";

const SubmitWorkout = (props) => {
  const dispatch = useDispatch();
  const workoutRdx = useSelector((state) => state.workout.workout);

  const handleSubmitWorkout = async () => {
    const db = firebase.firestore();
    const docRef = db.collection("completedWorkouts");
    docRef.add({
      workout: [...workoutRdx],
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dispatch(workoutActions.completeWorkout());
  };
  return <Button onClick={handleSubmitWorkout}>Finish Workout</Button>;
};

export default SubmitWorkout;
