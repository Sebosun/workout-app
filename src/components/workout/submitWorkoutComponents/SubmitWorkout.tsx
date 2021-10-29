import { useState } from "react";
import { completeWorkout } from "../../../store/slices/workout-slice";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";

import "firebase/firestore";
import firebase from "firebase/app";

import PortalWrapper from "../../ui/PortalWrapper";
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
      .collection("user-data")
      .doc(currentUser.uid)
      .collection("completed-workouts");

    docRef.add({
      workout: [...workoutRdx],
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    handleConfirmation();
    dispatch(completeWorkout());
  };
  // TODO: there's a bug here that requires you to double click button after workout has been cancelled
  return (
    <div className="max-w-md mx-auto">
      <button className="btn" onClick={handleConfirmation}>
        Finish Workout
      </button>
      {confirmation && (
        <PortalWrapper location={`${location.pathname}`}>
          <p>Are you sure you want to end the workout</p>
          <button className="btn" onClick={handleSubmitWorkout}>Yes</button>
          <button className="btn" onClick={handleConfirmation}>No</button>
        </PortalWrapper>
      )}
    </div>
  );
};

export default SubmitWorkout;
