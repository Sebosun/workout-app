import React, { ReactElement } from "react"
import ExerciseForm from "../forms/workout/ExerciseForm"

export default function AddWorkoutTemplate(): ReactElement | null {
  return (
    <div>
      <h1>Add a custom template</h1>
      <ExerciseForm />
    </div>
  );
}
