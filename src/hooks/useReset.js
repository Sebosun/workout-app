import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store/timer-slice";

const useReset = () => {
  const dispatch = useDispatch();
  const cooldown = useSelector((state) => state.settings.cooldown);

  dispatch(timerActions.setTimer(cooldown));
  dispatch(timerActions.handleAction(true));
};

export default useReset;
