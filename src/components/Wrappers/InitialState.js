import { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import { timerActions } from "../../store/timer-slice";
import { settingsActions } from "../../store/settings-slice";
import { workoutActions } from "../../store/workout-slice";

function initWorkout(data) {
  const workoutData = data.map((item) => {
    let workObj = { reps: [], completed: [] };
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
  console.log(workoutData);
  return workoutData;
}

const InitialState = () => {
  const dispatch = useDispatch();
  const { active, timer } = useSelector((state) => state.timer);
  const cooldown = useSelector((state) => state.settings.cooldown);

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db.collection("workouts");
      // const docRef = db.collection("workout");
      const getDocRef = await docRef.get();
      if (getDocRef.docs.length > 0) {
        console.log(getDocRef);
        // TODO error handling
        let workoutData = [];
        getDocRef.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
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
      dispatch(settingsActions.changeCooldown(localStorage.cooldown));
    }
  }, [cooldown, dispatch]);

  //timeouts for timer
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
