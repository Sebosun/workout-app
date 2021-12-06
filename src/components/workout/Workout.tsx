import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import Excercise from "./Excercise";
import RestTimer from "./RestTimer";
import { WorkoutType } from "../../helpers/types/workout";

import {
  decreaseWeight,
  handleSetComplete,
  handleSets,
  increaseWeight,
} from "../../store/slices/workout-slice";
import { setTimer, handleAction } from "../../store/slices/timer-slice";
import { displayError } from "../../store/slices/ui-slice";

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

  const onWeightIncrease = (index: number) => {
    dispatch(increaseWeight(index));
  };

  const onWeightDecrease = (index: number, weight: number) => {
    if (weight - 2.5 < 0) {
      dispatch(displayError("Weight cannot be lower than 0"));
    } else {
      dispatch(decreaseWeight(index));
    }
  };

  return (
    <>
      {active && <RestTimer />}

      {workout.map((item: WorkoutType, index: number) => {
        return (
          <section
            key={index + item.name}
            className="max-w-sm p-4 mx-auto my-6 border-4 border-purple-800 lg:max-w-xl"
          >
            <div className="p-4 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
              <h1 className="self-center text-center text-3xl font-semibold capitalize">
                {item.name}
              </h1>

              <div className="grid grid-cols-4 items-center gap-2 justify-center ">
                <button
                  onClick={() => onWeightIncrease(index)}
                  className="self-center bg-green-800 border-black btn"
                >
                  +
                </button>
                <p className="text-2xl text-center col-start-2 col-end-4">{`${item.weight}kg`}</p>

                <button
                  onClick={() => onWeightDecrease(index, item.weight)}
                  className={`${
                    item.weight === 0
                      ? "bg-gray-800 cursor-not-allowed "
                      : "bg-red-800"
                  }  self-center border-black  btn 
              `}
                >
                  -
                </button>
              </div>
            </div>

            <Excercise
              index={index}
              sets={item.sets}
              completed={item.completed}
              reps={item.reps}
              setsHandler={setsHandler}
            />
          </section>
        );
      })}
    </>
  );
};

export default Workout;
