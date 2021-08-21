import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settings-slice";

import Flex from "../ui/Flex";
import CooldownForm from "../forms/CooldownForm";
import Button from "../ui/Button";

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
    <Flex>
      <form onSubmit={submitHandler}>
        <CooldownForm value={cooldown} cooldownHandler={cooldownHandler} />
        <Button> Submit</Button>
      </form>
    </Flex>
  );
};

export default Settings;
