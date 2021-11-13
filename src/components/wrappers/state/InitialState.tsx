import { useEffect } from "react";

import FirebaseTemplateData from "./FirebaseTemplateData";

import { tickTimer, handleAction } from "../../../store/slices/timer-slice";
import { changeCooldown } from "../../../store/slices/settings-slice";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";

// accepts an array within an array with 4 properties: name reps sets weight.

const InitialState = () => {
  const dispatch = useAppDispatch();
  const cooldown = useAppSelector((state) => state.settings.cooldown);
  const { active, timer } = useAppSelector((state) => state.timer);

  // get workout data from template workouts in user's folder
  // TODO: move this logic to a component that loads the workout rather than running it at the very start.
  // TODO: rethink this to reflect new structure
  //doing it in a separate function because settings for sure will expand in the future
  const readLocalStorage = () => {
    const cooldown = localStorage.getItem("cooldown");
    return { cooldown: cooldown };
  };

  // runs localstorage on app load and if settings change, saves data in the settings
  useEffect(() => {
    const localStorage = readLocalStorage();
    if (localStorage.cooldown) {
      dispatch(changeCooldown(parseInt(localStorage.cooldown)));
    }
  }, [cooldown, dispatch]);

  //timeouts for timer
  useEffect(() => {
    if (active) {
      const timerTimeout = setTimeout(() => {
        dispatch(tickTimer());
      }, 1000);

      if (timer === 0) {
        dispatch(handleAction(false));
      }
      return () => clearTimeout(timerTimeout);
    }
  }, [dispatch, timer, active]);

  return (
    <>
      <FirebaseTemplateData />
    </>
  );
};

export default InitialState;
