import { useState } from "react";
import { workoutActions } from "../../../store/slices/workout-slice";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";

import "firebase/firestore";
import firebase from "firebase/app";

import Button from "../../ui/Button";
import PortalWrapper from "../../ui/PortalWrapper";
import classes from "./SubmitWorkout.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const SubmitWorkout = () => {
  const dispatch = useAppDispatch();
  const [confirmation, setConfirmation] = useState(false);
  const { currentUser }: any = useAuth();

  const location = useLocation();

  const workoutRdx = useAppSelector((state) => state.workout.workout);

  // TODO: get date from the user, save it on server  instead of firestore
  // if date is the same day, say dude u already done it

  const handleConfirmation = () => {
    setConfirmation((prev) => !prev);
  };

  // uploads the workout from redux to firestore
  const handleSubmitWorkout = async () => {
    const db = firebase.firestore();
    const docRef = db
      .collection("userData")
      .doc(currentUser.uid)
      .collection("completeWorkout");

    docRef.add({
      workout: [...workoutRdx],
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    handleConfirmation();
    dispatch(workoutActions.completeWorkout());
  };
  // TODO: there's a bug here that requires you to double click button after workout has been cancelled
  return (
    <>
      <Button className={classes.button} onClick={handleConfirmation}>
        Finish Workout
      </Button>
      {confirmation && (
        <PortalWrapper location={`${location.pathname}`}>
          <p>Are you sure you want to end the workout</p>
          <Button onClick={handleSubmitWorkout}>Yes</Button>
          <Button onClick={handleConfirmation}>No</Button>
        </PortalWrapper>
      )}
    </>
  );
};

export default SubmitWorkout;
