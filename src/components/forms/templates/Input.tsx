import React, { ReactElement } from "react";

interface InputProps {
  type: string;
  id: string;
  label: string;
  name: string;
  value: number;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps): ReactElement | null {
  return (
    <>
      <label
        htmlFor={props.id}
        className="block text-left text-white text-xl font-bold"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={props.onValueChange}
        type={props.type}
        name={props.name}
        id={props.id}
        className="rounded-md w-full  block bg-gray-900 text-white focus:border-gray-50 focus:ring-gray-50 border-2 solid border-purple-800 my-2"
      />
    </>
  );
}
