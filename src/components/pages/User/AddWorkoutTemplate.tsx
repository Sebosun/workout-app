import React, { ReactElement, useState } from "react";
import Input from "../../forms/templates/Input";
import ExerciseForm, { ExerciseTypes } from "../../forms/workout/ExerciseForm";
import DisplayWorkoutTemplatePreview from "../../workout/workoutTemplates/DisplayWorkoutTemplatePreview";
import { useAppDispatch } from "../../../store/app/hooks";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";

import "firebase/firestore";
import firebase from "firebase/app";
import {displaySuccess} from "../../../store/slices/ui-slice";

export default function AddWorkoutTemplate(): ReactElement | null {
  const [workout, setWorkout] = useState<ExerciseTypes[]>([]);
  const [workoutName, setWorkoutName] = useState("");

  const [formVisible, setFormVisible] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [started, setStarted] = useState(false);


  const { currentUser }: any = useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();


  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.target.value);
  };

  const handleStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleShowExercisePage();
    setStarted(true);
  };

  const handleExerciseSubmit = (submittedWorkout: ExerciseTypes) => {
    handleShowPreviewPage()
    setWorkout((prev) => [...prev, submittedWorkout]);
  };

  // shows the 'exercise' page
  const handleShowExercisePage = () => {
    setPreviewVisible(false)
    setFormVisible(true);
  };

  // shows the 'preview' page
  const handleShowPreviewPage = () => {
    setFormVisible(false)
    setPreviewVisible(true);
  };

  // shows the 'menu' page
  const handleShowMenuPage = () => {
    setFormVisible(false);
    setPreviewVisible(false);
  };

  //submits the workout to firebase, then dispatches 'success' message and redirects to the main page
  // if the name of the workout is the same, overwrites the previous entry
  const submitWorkout = async () => {
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(currentUser.uid)
      .collection("workout-templates")
      .doc(workoutName);

      await docRef.set({
        name: workoutName,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        workout,
      });
      dispatch(displaySuccess("Workout template added succesfully"));
      history.push("/")

  };

  //this might need to be thrown into another component
  if (!started) {
    return (
      <div className="max-w-md p-2 mx-auto lg:max-w-xl">
        <h1 className="text-center">Enter workout name</h1>
        <form onSubmit={handleStart}>
          <Input
            type="string"
            label=""
            name="name"
            id="name"
            placeholder="Workout name"
            value={workoutName}
            onValueChange={onNameChange}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="max-w-full p-2 mx-auto lg:max-w-2xl">
        {/*the added exercises preview*/}
        {previewVisible && (
          <>
            <DisplayWorkoutTemplatePreview workout={workout} />
            <button onClick={handleShowExercisePage} className="btn">
              Add an exercise
            </button>
            <button onClick={handleShowMenuPage} className="btn">
              Show menu
            </button>
          </>
        )}

        {/*add an exercise screen*/}
        {!previewVisible && formVisible && (
          <div>
            <div className="flex flex-col">
              <div>
                <h1 className="p-2 text-2xl text-center text-gray-300">Add an exercise</h1>
                <ExerciseForm collector={handleExerciseSubmit} />
              </div>
              {workout.length !== 0 && (
                <button
                  onClick={handleShowMenuPage}
                  className="max-w-xs mx-auto btn"
                >
                  Show menu
                </button>
              )}
            </div>
          </div>
        )}

        {/*show preview of added exercises screen*/}
        {!previewVisible && !formVisible && (
          <div className="">
            <button className="btn" onClick={handleShowExercisePage}>
              Add another exercise
            </button>
            <button className="btn" onClick={handleShowPreviewPage}>
              Show preview
            </button>
            <button className="btn" onClick={submitWorkout}>
              Finish
            </button>
          </div>
        )}
      </div>
    );
  }
     
   
  }

