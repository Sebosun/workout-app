import React from "react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import { changeCooldown } from "../../store/slices/settings-slice";

import Flex from "../ui/Flex";
import CooldownForm from "../forms/CooldownForm";
import Button from "../ui/Button";

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
    <Flex>
      <form onSubmit={submitHandler}>
        <CooldownForm cooldown={cooldown} cooldownHandler={cooldownHandler} />
        <Button>Submit</Button>
      </form>
    </Flex>
  );
};

export default Settings;
