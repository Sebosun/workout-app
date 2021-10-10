import { ReactElement, useState, useRef } from "react";
import Input from "../templates/Input";

export interface ExerciseTypes {
  name: string;
  reps: number;
  sets: number;
  weight: number;
}

const defaultExercise: ExerciseTypes = {
  name: "",
  reps: 5,
  sets: 5,
  weight: 0,
};

export default function ExerciseForm(): ReactElement | null {
  const [exercise, setExercise] = useState(defaultExercise);
  const { name, reps, sets, weight } = exercise;

  const onExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('dupa')
  }

  return (
    <form className="max-w-lg p-4 mx-auto border-2 border-white border-blue-900 border-solid shadow-2xl rounded-xl" onSubmit={e => handleSubmit}>
      <Input
        type="string"
        label="name"
        name="name"
        id="name"
        placeholder="Exercise name"
        value={name}
        onValueChange={onExerciseChange}
      />
      <Input
        type="number"
        label="Sets"
        name="sets"
        id="sets"
        value={sets}
        onValueChange={onExerciseChange}
      />
      <Input
        type="number"
        label="reps"
        name="reps"
        id="reps"
        value={reps}
        onValueChange={onExerciseChange}
      />
      <Input
        type="number"
        label="weight"
        name="weight"
        id="weight"
        value={weight}
        onValueChange={onExerciseChange}
      />
      <button className="btn">Submit</button>
    </form>
  );
}
