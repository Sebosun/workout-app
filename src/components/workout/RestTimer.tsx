import { useAppSelector } from "../../store/app/hooks";

const RestTimer = () => {
  const timerRdx = useAppSelector((state) => state.timer.timer);

  return (
    <div className="p-4 mx-auto my-5 text-4xl border-2 border-purple-700 border-solid max-w-min rounded-3xl">
      <p>{timerRdx}</p>
    </div>
  );
};

export default RestTimer;
