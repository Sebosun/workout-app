import React, { ReactElement } from "react";

interface InputProps {
  type: "number" | "string";
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  value: number | string;
  onValueChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
}

// a template input component, used within forms
export default function Input(props: InputProps): ReactElement | null {
  return (
    <>
      <label
        htmlFor={props.id}
        className="block text-xl font-bold text-left text-indigo-400 capitalize"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={(e) => props.onValueChange(e, props.type)}
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder && `${props.placeholder}`}
        className="block p-2 my-6 w-full bg-gray-900 rounded-md border-2 border-purple-800 focus:border-gray-50 focus:ring-gray-50 solid"
        required
      />
    </>
  );
}
