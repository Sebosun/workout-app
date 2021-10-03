import { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { useAppDispatch, useAppSelector } from "../../store/app/hooks";

import { tickTimer, handleAction } from "../../store/slices/timer-slice";
import { changeCooldown } from "../../store/slices/settings-slice";
import { workoutActions } from "../../store/slices/workout-slice";

interface WorkObj {
  reps: number[];
  completed: boolean[];
}

function initWorkout(data: firebase.firestore.DocumentData) {
  const workoutData = data.map((item: firebase.firestore.DocumentData) => {
    let workObj: WorkObj = { reps: [], completed: [] };
    for (let i = 0; i < item.sets; i++) {
      workObj.reps.push(parseInt(item.reps));
      workObj.completed.push(false);
    }

    return {
      name: item.name,
      sets: [...workObj.reps],
      completed: [...workObj.completed],
      reps: item.reps,
      weight: item.weight,
    };
  });
  return workoutData;
}

const InitialState = () => {
  const dispatch = useAppDispatch();

  const { active, timer } = useAppSelector((state) => state.timer);
  const cooldown = useAppSelector((state) => state.settings.cooldown);

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db.collection("workouts");
      const getDocRef = await docRef.get();

      if (getDocRef.docs.length > 0) {
        // TODO error handling
        let workoutData: firebase.firestore.DocumentData[] = [];

        getDocRef.forEach((doc) => {
          workoutData.push(doc.data());
        });

        const transformWorkout = initWorkout(workoutData);
        dispatch(workoutActions.addWorkout(transformWorkout));
      } else {
        console.error("Whoops!");
      }
    };
    getData();
  }, []);

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

  return null;
};

export default InitialState;