import React from "react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import { changeCooldown } from "../../store/slices/settings-slice";
import Input from "../forms/Input";
import CooldownForm from "../forms/CooldownForm";

const Settings = () => {
  const cooldownRedux = useAppSelector((state) => state.settings.cooldown);
  const dispatch = useAppDispatch();

  const [cooldown, setCooldown] = useState(cooldownRedux);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(changeCooldown(cooldown));
    // typescript was mad about this so im dirty 'converting' cooldown to string
    localStorage.setItem("cooldown", `${cooldown}`);
  };

  const cooldownHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    // parsing it as an int
    setCooldown(+event.target.value);

  return (
    <div className=" p-4 mx-auto max-w-xl">
      <h1 className="text-5xl text-center">Settings</h1>
      <div className="max-w-sm mx-auto mt-8">
        <form onSubmit={submitHandler}>
          <Input
            id="cooldown"
            type="number"
            name="cooldown"
            label="Cooldown"
            value={cooldown}
            onValueChange={cooldownHandler}
          />
          <button className="p-2 my-4 hover:bg-purple-900 hover:border-purple-900 uppercase rounded-xl border-2 w-full ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
