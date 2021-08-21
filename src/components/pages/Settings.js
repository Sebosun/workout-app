import React from "react";
import CooldownForm from "../forms/CooldownForm";
import { useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settings-slice";
import { timerActions } from "../../store/timer-slice";

const Settings = () => {
  const cooldownRedux = useSelector((state) => state.settings.cooldown);
  const dispatch = useDispatch();

  const [cooldown, setCooldown] = useState(cooldownRedux);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(settingsActions.changeCooldown(cooldown));
    localStorage.setItem("cooldown", cooldown);
  };

  const cooldownHandler = (e) => setCooldown(e.target.value);

  return (
    <form onSubmit={submitHandler}>
      <CooldownForm value={cooldown} cooldownHandler={cooldownHandler} />
      <Button> Submit</Button>
    </form>
  );
};

export default Settings;
