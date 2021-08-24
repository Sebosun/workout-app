import { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import { timerActions } from "../../store/timer-slice";
import { settingsActions } from "../../store/settings-slice";
import { workoutActions } from "../../store/workout-slice";

const InitialState = () => {
  const dispatch = useDispatch();
  // const timer = useSelector((state) => state.timer.timer);
  // const active = useSelector((state) => state.timer.active);
  const { active, timer } = useSelector((state) => state.timer);
  const cooldown = useSelector((state) => state.settings.cooldown);
  const { workout } = useSelector((state) => state.workout);

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db.collection("workouts");
      const getDocRef = await docRef.get();
      console.log(getDocRef);
      // TODO error handling
      let workoutArr = [];
      getDocRef.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        workoutArr.push(doc.data());
      });

      dispatch(workoutActions.addWorkout(workoutArr));
    };

    getData();
  }, []);

  const readLocalStorage = () => {
    const cooldown = localStorage.getItem("cooldown");
    return { cooldown: cooldown };
  };

  // runs localstorage on app load and if settings change, saves data in the settings
  useEffect(() => {
    const localStorage = readLocalStorage();
    if (localStorage.cooldown) {
      dispatch(settingsActions.changeCooldown(localStorage.cooldown));
    }
  }, [cooldown, dispatch]);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        dispatch(timerActions.tickTimer());
      }, 1000);

      if (timer <= 0) {
        dispatch(timerActions.handleAction());
      }
      return () => clearTimeout(timer);
    }
  }, [dispatch, timer, active]);
  return null;
};

export default InitialState;
