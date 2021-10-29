import React from "react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import { changeCooldown } from "../../store/slices/settings-slice";
import InputLabel from "../forms/templates/Input";

const Settings = () => {
  const cooldownRedux = useAppSelector((state) => state.settings.cooldown);
  const dispatch = useAppDispatch();

  const [cooldown, setCooldown] = useState(cooldownRedux);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(changeCooldown(cooldown));
    localStorage.setItem("cooldown", `${cooldown}`);
  };

  const cooldownHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    // parsing it as an int
    setCooldown(+event.target.value);

  return (
    <div className="max-w-xl p-4 mx-auto ">
      <h1 className="text-5xl text-center text-gray-300">Settings</h1>
      <div className="max-w-sm mx-auto mt-8">
        <form onSubmit={submitHandler}>
          <InputLabel
            id="cooldown"
            type="number"
            name="cooldown"
            label="Cooldown"
            value={cooldown}
            onValueChange={cooldownHandler}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
