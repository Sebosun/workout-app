import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../../store/timer-slice";

import classes from "./RestTimer.module.css";

const RestTimer = ({ disableRest, className }) => {
  const dispatch = useDispatch();
  const timerRdx = useSelector((state) => state.timer.timer);

  return (
    <div className={classes.timer}>
      <p>{timerRdx}</p>
    </div>
  );
};

export default RestTimer;
