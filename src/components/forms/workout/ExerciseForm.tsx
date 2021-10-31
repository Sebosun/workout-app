import { ReactElement, useState } from "react";
import Input from "../templates/Input";

interface ExerciseProps {
  collector: (exercise: ExerciseTypes) => void;
}

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

export default function ExerciseForm({
  collector,
}: ExerciseProps): ReactElement | null {
  const [exercise, setExercise] = useState(defaultExercise);
  const { name, reps, sets, weight } = exercise;

  const onExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    collector(exercise);
  };

  return (
    <form
      className="p-4 mx-auto rounded-xl border-2 border-blue-900 border-solid shadow-2xl"
      onSubmit={handleSubmit}
    >
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
