import { useState } from "react";
import { workoutActions } from "../../../store/slices/workout-slice";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";

import "firebase/firestore";
import firebase from "firebase/app";

import PortalWrapper from "../../ui/PortalWrapper";
import Button from "../../ui/Button";

const SubmitWorkout = () => {
  const dispatch = useAppDispatch();

  const [confirmation, setConfirmation] = useState(false);

  const workoutRdx = useAppSelector((state) => state.workout.workout);

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
        <PortalWrapper>
          <p> Are you sure you want to end the workout </p>
          <Button onClick={handleSubmitWorkout}>Yes</Button>
          <Button onClick={handleConfirmation}>No</Button>
        </PortalWrapper>
      )}
    </>
  );
};

export default SubmitWorkout;
