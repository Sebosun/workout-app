import { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import { tickTimer, handleAction } from "../../store/slices/timer-slice";
import { changeCooldown } from "../../store/slices/settings-slice";
import { workoutActions } from "../../store/slices/workout-slice";
import { WorkoutType } from "../../helpers/types/workout";

interface WorkObj {
  reps: number[];
  completed: boolean[];
}

function initWorkout(data: firebase.firestore.DocumentData): WorkoutType {
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
  const dispatch = useDispatch();
  // TODO: Fix when you get around redux
  const { active, timer } = useSelector((state: any) => state.timer);
  const cooldown = useSelector((state: any) => state.settings.cooldown);

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db.collection("workouts");
      // const docRef = db.collection("workout");
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
