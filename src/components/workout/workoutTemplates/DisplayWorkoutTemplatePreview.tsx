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
          <div className="pb-4 my-4 border-b-2 border-purple-800 border-solid gap-4 grid grid-cols-2">
            <div className="flex flex-col">
              <p className="text-lg">Name:</p>
              <div className="text-lg text-blue-500 ">{item.name}</div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg">Sets:</p>
              <div className="text-lg text-blue-500 ">{item.sets}</div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg ">Reps:</p>
              <div className="text-lg text-blue-500 ">{item.reps}</div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg ">Weight:</p>
              <div className="text-lg text-blue-500 ">{item.weight}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
