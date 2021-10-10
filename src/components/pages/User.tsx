import React, { ReactElement } from "react"
import {Link} from "react-router-dom";
import ExerciseForm from '../forms/workout/ExerciseForm'

export default function User(): ReactElement | null {
  const linkClasses = "flex items-center self-center justify-center h-48 text-4xl border-2 border-solid text-center max-w-sm lg:max-w-lg rounded-xl border-crimson"
  return (
    <div className="object-center max-w-4xl mx-auto my-32 xl lg:my-52 place-content-stretch gap-4 grid grid-cols-2">
      <Link to="/add-workout" className={`${linkClasses}`}>
        Add workout template
      </Link >
      <Link to="/custom-templates" className={`${linkClasses}`}>
        Check your templates
      </Link >
    </div>
  );
}
