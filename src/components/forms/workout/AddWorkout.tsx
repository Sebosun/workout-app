import { ReactElement, useState, useRef } from "react";
import Input from "../templates/Input";

export default function AddWorkout(): ReactElement | null {
  const useRef()

  return (
    <form className="mx-auto max-w-lg">
      <Input
        type="number"
        label="Sets"
        name="sets"
        id="sets"
        value={sets}
        onValueChange={() => {}}
      />
      <Input
        type="string"
        label="Name"
        name="name"
        id="name"
        value={sets}
        onValueChange={() => {}}
      />
    </form>
  );
}
