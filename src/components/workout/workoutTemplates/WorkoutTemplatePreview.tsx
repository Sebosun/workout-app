import React, { ReactElement } from "react";
import { ExerciseTypes } from "../../forms/workout/ExerciseForm";

interface DisplayProps {
  workout: ExerciseTypes[];
}

export default function WorkoutTemplatePreview({
  workout,
}: DisplayProps): ReactElement | null {
  return (
    <>
      {workout.map((item) => {
        return (
          <div className="grid grid-cols-2 gap-4 pb-4 my-4 border-b-2 border-purple-800 border-solid">
            <div className="flex flex-col">
              <p className="text-lg">Name:</p>
              <div className="text-lg text-blue-500">{item.name}</div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg">Sets:</p>
              <div className="text-lg text-blue-500">{item.sets}</div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg">Reps:</p>
              <div className="text-lg text-blue-500">{item.reps}</div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg">Weight:</p>
              <div className="text-lg text-blue-500">{item.weight}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
