import {useEffect, useState} from "react"
import "firebase/firestore";
import firebase from "firebase/app";
import {addWorkout} from "../../../store/slices/workout-slice";
import {displayError} from "../../../store/slices/ui-slice";
import {useAppDispatch, useAppSelector} from "../../../store/app/hooks";

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

const FirebaseTemplateData = () => {
  const dispatch = useAppDispatch();
  const user = firebase.auth().currentUser;
  const { started } = useAppSelector(state => state.workout)

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db
        .collection("user-data")
        .doc(user?.uid)
        .collection("workout-templates")
        .doc("Template");

      try {
        const getDocRef = await docRef.get();
        if (getDocRef.exists) {
          let workoutData = getDocRef.data();
          const transformedWorkout = initWorkout(workoutData?.workout);
          dispatch(addWorkout(transformedWorkout));
        }
      } catch (err: any) {
        //TODO: (maybe) may kick the user back to the "workout not started" menu
        dispatch(displayError(err.message));
        console.error(err.message);
      }
    };
    if (user) {
      getData()
    }
  }, [dispatch, user, started]);

  return null
}

export default FirebaseTemplateData
