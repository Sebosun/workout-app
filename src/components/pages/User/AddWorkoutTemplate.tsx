import React, { ReactElement, useState } from "react";
import Input from "../../forms/templates/Input";
import ExerciseForm, { ExerciseTypes } from "../../forms/workout/ExerciseForm";
import WorkoutTemplatePreview from "../../workout/workoutTemplates/WorkoutTemplatePreview";
import { useAppDispatch } from "../../../store/app/hooks";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";

import "firebase/firestore";
import firebase from "firebase/app";
import { displaySuccess } from "../../../store/slices/ui-slice";

/** handles the logic for adding new workout to the user profile*/
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
    handleShowPreviewPage();
    setWorkout((prev) => [...prev, submittedWorkout]);
  };

  // shows the 'exercise' page
  const handleShowExercisePage = () => {
    setPreviewVisible(false);
    setFormVisible(true);
  };

  // shows the 'preview' page
  const handleShowPreviewPage = () => {
    setFormVisible(false);
    setPreviewVisible(true);
  };

  //submits the workout to firebase, then dispatches 'success' message and redirects to the main page
  // if the name of the workout is the same, overwrites the previous entry
  const submitWorkout = async () => {
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(currentUser.uid)
      .collection("workout-templates");

    await docRef.add({
      name: workoutName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      workout,
    });
    dispatch(displaySuccess("Workout template added succesfully"));
    history.push("/");
  };

  //this might need to be thrown into another component
  if (!started) {
    return (
      <div className="p-2 mx-auto max-w-md lg:max-w-xl">
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
          <button className="btn-pos">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="p-4 md:my-4 mx-auto max-w-full lg:max-w-2xl">
        {/*the added exercises preview*/}
        {previewVisible && (
          <>
            <div className="text-3xl text-center">
              New workout: {workoutName}
            </div>
            <WorkoutTemplatePreview workout={workout} />
            <button onClick={handleShowExercisePage} className="btn">
              Add an exercise
            </button>
            <button className="btn" onClick={submitWorkout}>
              Finish
            </button>
          </>
        )}

        {/*add an exercise screen*/}
        {!previewVisible && formVisible && (
          <div>
            <div className="flex flex-col">
              <div>
                <h1 className="p-2 text-2xl text-center text-gray-300">
                  Add an exercise
                </h1>
                <ExerciseForm handleSubmit={handleExerciseSubmit}>
                  {workout.length !== 0 && (
                    <button onClick={handleShowPreviewPage} className="btn">
                      Go back
                    </button>
                  )}
                </ExerciseForm>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
