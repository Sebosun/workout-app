import { useAppSelector } from "../../store/app/hooks";

import classes from "./RestTimer.module.css";

const RestTimer = () => {
  const timerRdx = useAppSelector((state) => state.timer.timer);

  return (
    <div className="text-4xl p-4 my-5 mx-auto border-solid max-w-min rounded-3xl border-purple-700 border-solid border-2">
      <p>{timerRdx}</p>
    </div>
  );
};

export default RestTimer;
