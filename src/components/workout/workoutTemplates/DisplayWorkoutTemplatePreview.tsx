import React, { ReactElement } from "react";
import { ExerciseTypes } from "../../forms/workout/ExerciseForm";

interface DisplayProps {
  workout: ExerciseTypes[];
}

export default function DisplayWorkoutTemplatePreview({
  workout,
}: DisplayProps): ReactElement | null {
  return (
    <>
      {workout.map((item) => {
        return (
          <div className="items-center pb-4 my-4 gap-4 border-b-2 border-solid grid grid-cols-2">
            <div className="flex justify-between ">
              <p className="text-lg">Name:</p>
              <div className="text-lg text-blue-500">{item.name}</div>
            </div>

            <div className="flex justify-between">
              <p className="text-lg ">Sets:</p>
              <div className="text-lg text-blue-500 ">{item.sets}</div>
            </div>

            <div className="flex justify-between">
              <p className="text-lg ">Reps:</p>
              <div className="text-lg text-blue-500 ">{item.reps}</div>
            </div>

            <div className="flex justify-between">
              <p className="text-lg ">Weight:</p>
              <div className="text-lg text-blue-500 ">{item.weight}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
