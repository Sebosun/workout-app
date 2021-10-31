import { useAppSelector } from "../../store/app/hooks";

const RestTimer = () => {
  const timerRdx = useAppSelector((state) => state.timer.timer);

  return (
    <div className="p-4 my-5 mx-auto max-w-min text-4xl rounded-3xl border-2 border-purple-700 border-solid">
      <p>{timerRdx}</p>
    </div>
  );
};

export default RestTimer;
