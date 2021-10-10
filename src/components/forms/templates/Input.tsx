import React, { ReactElement } from "react";

interface InputProps {
  type: string;
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  value: number | string;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
        onChange={props.onValueChange}
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder && `${props.placeholder}`}
        className="block w-full p-2 my-6 text-white bg-gray-900 border-2 border-purple-800 rounded-md focus:border-gray-50 focus:ring-gray-50 solid"
       required
      />
    </>
  );
}
