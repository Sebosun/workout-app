import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";

import firebase from "firebase/app";
import "firebase/firestore";
import { workoutActions } from "../../../store/workout-slice";
import SubmitPortalWrapper from "./SubmitPortalWrapper";

const SubmitWorkout = () => {
  const dispatch = useDispatch();

  const [confirmation, setConfirmation] = useState(false);

  // TODO: Temporary solution for Redux -> will fix when I read more about Typescript with redux
  //  https://stackoverflow.com/questions/60777859/ts2339-property-tsreducer-does-not-exist-on-type-defaultrootstate
  const workoutRdx = useSelector((state: any) => state.workout.workout);

  // TODO: get date from the user, save it on server  instead of firestore
  // if date is the same day, say dude u already done it

  const handleConfirmation = () => {
    setConfirmation((prev) => !prev);
  };

  const handleSubmitWorkout = async () => {
    const db = firebase.firestore();
    const docRef = db.collection("completedWorkouts");
    docRef.add({
      workout: [...workoutRdx],
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    handleConfirmation();
    dispatch(workoutActions.completeWorkout());
  };

  return (
    <>
      {!confirmation && (
        <Button onClick={handleConfirmation}>Finish Workout</Button>
      )}
      {confirmation && (
        <SubmitPortalWrapper>
          <p> Are you sure you want to end the workout </p>
          <Button onClick={handleSubmitWorkout}>Yes</Button>
          <Button onClick={handleConfirmation}>No</Button>
        </SubmitPortalWrapper>
      )}
    </>
  );
};

export default SubmitWorkout;
