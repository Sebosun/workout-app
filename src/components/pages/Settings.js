import React from "react";
import CooldownForm from "../forms/CooldownForm";
import { useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settings-slice";

const Settings = () => {
  const cooldownRedux = useSelector((state) => state.settings.cooldown);
  const dispatch = useDispatch();

  const [cooldown, setCooldown] = useState(cooldownRedux);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(settingsActions.changeCooldown(cooldown));
  };

  const cooldownHandler = (e) => {
    setCooldown(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <CooldownForm value={cooldown} cooldownHandler={cooldownHandler} />
        <Button> Submit</Button>
      </form>
    </div>
  );
};

export default Settings;
