import { useSelector } from "react-redux";

import classes from "./RestTimer.module.css";

const RestTimer = () => {
  // TODO fix this at some point
  const timerRdx = useSelector((state: any) => state.timer.timer);

  return (
    <div className={classes.timer}>
      <p>{timerRdx}</p>
    </div>
  );
};

export default RestTimer;
