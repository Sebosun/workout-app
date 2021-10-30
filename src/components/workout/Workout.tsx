import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import Card from "../ui/Card";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import { WorkoutType } from "../../helpers/types/workout";

import { handleSetComplete, handleSets } from "../../store/slices/workout-slice";
import { setTimer, handleAction } from "../../store/slices/timer-slice";

// TODO: consider saving current workout to localStorage
const Workout = () => {
  const dispatch = useAppDispatch();

  const active = useAppSelector((state) => state.timer.active);
  const workout = useAppSelector((state) => state.workout.workout);
  const cooldown = useAppSelector((state) => state.settings.cooldown);

  const handleTimer = () => {
    dispatch(setTimer(cooldown));
    dispatch(handleAction(true));
  };

  const setsHandler = (index: number, position: number) => {
    const currentSets = workout[index].sets[position];
    const currentCompleted = workout[index].completed[position];
    const currentReps = workout[index].reps;

    if (currentSets === currentReps && currentCompleted === false) {
      dispatch(handleSetComplete({ index, position }));
      handleTimer();
    } else if (currentSets === 0) {
      dispatch(handleSets({ index, position, number: currentReps }));
      dispatch(
        handleSetComplete({
          index,
          position,
          number: currentReps,
        })
      );
    } else {
      dispatch(handleSets({ index, position }));
    }
  };

  return (
    <>
      {active && <RestTimer />}

      {workout.map((item: WorkoutType, index: number) => {
        return (
          <Card
            key={index + item.name}
            className="max-w-md p-4 mx-auto my-6 border-4 border-purple-800"
          >
            <h1 className="mb-4 text-xl font-semibold capitalize">
              {item.name}
            </h1>
            <Excercise
              index={index}
              sets={item.sets}
              completed={item.completed}
              reps={item.reps}
              setsHandler={setsHandler}
            />
          </Card>
        );
      })}
    </>
  );
};

export default Workout;
