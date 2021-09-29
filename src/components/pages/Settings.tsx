import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settings-slice";

import Flex from "../ui/Flex";
import CooldownForm from "../forms/CooldownForm";
import Button from "../ui/Button";

const Settings = () => {
  // TODO: Temporary solution for Redux -> will fix when I read more about Typescript with redux
  //  https://stackoverflow.com/questions/60777859/ts2339-property-tsreducer-does-not-exist-on-type-defaultrootstate
  const cooldownRedux = useSelector((state: any) => state.settings.cooldown);
  const dispatch = useDispatch();

  const [cooldown, setCooldown] = useState(cooldownRedux);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(settingsActions.changeCooldown(cooldown));
    localStorage.setItem("cooldown", cooldown);
  };

  const cooldownHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCooldown(event.target.value);

  return (
    <Flex>
      <form onSubmit={(e) => submitHandler}>
        <CooldownForm cooldown={cooldown} cooldownHandler={cooldownHandler} />
        <Button> Submit</Button>
      </form>
    </Flex>
  );
};

export default Settings;
