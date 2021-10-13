import React, { ReactElement, useState } from "react";
import Input from "../forms/templates/Input";
import ExerciseForm, { ExerciseTypes } from "../forms/workout/ExerciseForm";
import DisplayWorkoutTemplatePreview from "../workout/workoutTemplates/DisplayWorkoutTemplatePreview";

export default function AddWorkoutTemplate(): ReactElement | null {
  const [workout, setWorkout] = useState<ExerciseTypes[]>([]);
  const [workoutName, setWorkoutName] = useState("");

  const [formVisible, setFormVisible] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [started, setStarted] = useState(false);

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

  const handleShowExercisePage = () => {
    setPreviewVisible(false)
    setFormVisible(true);
  };

  const handleShowPreviewPage = () => {
    setFormVisible(false)
    setPreviewVisible(true);
  };

  const handleShowMenuPage = () => {
    setFormVisible(false);
    setPreviewVisible(false);
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

        {previewVisible && (
          <>
            <DisplayWorkoutTemplatePreview workout={workout} />
            <button onClick={handleShowExercisePage} className="btn">
              Add an exercise
            </button>
            <button onClick={handleShowMenuPage} className="btn">
              Go back
            </button>
          </>
        )}

        {!previewVisible && formVisible && (
          <div>
            <div className="flex flex-col">
              <div>
                <h1 className="p-2 text-2xl text-center">Add an exercise</h1>
                <ExerciseForm collector={handleExerciseSubmit} />
              </div>
              <button
                onClick={handleShowMenuPage}
                className="max-w-xs mx-auto btn"
              >
                Go back
              </button>
            </div>
          </div>
        )}

        {!previewVisible && !formVisible && (
          <div className="">
            <button className="btn" onClick={handleShowExercisePage}>
              Add another exercise
            </button>
            <button className="btn" onClick={handleShowPreviewPage}>
              Show preview
            </button>
            <button className="btn" onClick={() => {}}>
              Finish
            </button>
          </div>
        )}
      </div>
    );
  }
     
   
  }

