import React, { ReactElement, useState } from "react"
import ExerciseForm, { ExerciseTypes } from "../forms/workout/ExerciseForm"

export default function AddWorkoutTemplate(): ReactElement | null {
  const [workout, setWorkout] = useState<ExerciseTypes[]>([])
  const [visible, setVisible] = useState(true)

  const handleSubmit = (submittedWorkout: ExerciseTypes) => {
    setVisible(false)
    setWorkout(prev => [...prev, submittedWorkout])
  }

  const handleClick = () => {
    setVisible(true)
  }

  return (
    <div>
      {visible &&
        <><h1 className="p-6 text-2xl text-center">Add an exercise</h1>
          <ExerciseForm collector={handleSubmit} /></>}
      {!visible && (<div className="max-w-md p-8 m-4 mx-auto">
        <h1 className="text-center">
          Add another exercise?
        </h1>
        <button className="btn" onClick={handleClick}>Yes</button>
        <button className="btn" onClick={() => { }}>No</button>
      </div>)}

    </div>
  );
}
