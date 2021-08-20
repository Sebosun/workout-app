import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../../store/timer-slice";

const RestTimer = ({ disableRest, className }) => {
  const dispatch = useDispatch();
  const timerRdx = useSelector((state) => state.timer.timer);

  return (
    <div className={className}>
      <p>{timerRdx}</p>
      <button onClick={() => dispatch(timerActions.handleAction(false))}>
        Disable
      </button>
    </div>
  );
};

export default RestTimer;
