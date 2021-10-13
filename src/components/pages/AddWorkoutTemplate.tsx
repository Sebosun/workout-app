import React, { ReactElement, useState } from "react";
import ExerciseForm, { ExerciseTypes } from "../forms/workout/ExerciseForm";
import DisplayWorkoutTemplatePreview from "../workout/workoutTemplates/DisplayWorkoutTemplatePreview";

export default function AddWorkoutTemplate(): ReactElement | null {
  const [workout, setWorkout] = useState<ExerciseTypes[]>([
    {
      name: "Squat",
      sets: 0,
      reps: 0,
      weight: 0,
    },
  ]);
  const [visible, setVisible] = useState(true);
  const [preview, setPreview] = useState(true);

  const handleSubmit = (submittedWorkout: ExerciseTypes) => {
    setVisible(false);
    setWorkout((prev) => [...prev, submittedWorkout]);
  };

  const handleVisibleClick = () => {
    setVisible(true);
  };

  const handlePreviewClick = () => {
    setPreview((prev) => !prev);
  };

  return (
    <div className="max-w-full p-8 m-4 mx-auto lg:max-w-2xl">
      {preview && (
        <div className="">
          <DisplayWorkoutTemplatePreview workout={workout} />
          <button onClick={handlePreviewClick} className="btn">
            Add an exercise
          </button>
        </div>
      )}
      {!preview && (
        <div>
          {visible && (
            <>
              <h1 className="p-6 text-2xl text-center">Add an exercise</h1>
              <ExerciseForm collector={handleSubmit} />
            </>
          )}
          {!visible && (
            <div className="">
              <button className="btn" onClick={handleVisibleClick}>
                Add another exercise
              </button>
              <button className="btn" onClick={handlePreviewClick}>
                Show preview
              </button>
              <button className="btn" onClick={() => {}}>
                Submit workout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
