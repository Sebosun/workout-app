import { useAppSelector } from "../../store/app/hooks";

import classes from "./RestTimer.module.css";

const RestTimer = () => {
  const timerRdx = useAppSelector((state) => state.timer.timer);

  return (
    <div className={classes.timer}>
      <p>{timerRdx}</p>
    </div>
  );
};

export default RestTimer;
