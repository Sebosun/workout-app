import { useEffect } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { addWorkout } from "../../../store/slices/workout-slice";
import { displayError } from "../../../store/slices/ui-slice";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { changeCurrentWorkoutTemplate } from "../../../store/slices/settings-slice";

interface WorkObj {
  reps: number[];
  completed: boolean[];
}

/** Transforms document integrer data into a 'workout' object */
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

/** Handles fetching template data from firestore and adding it to redux */
const FirebaseTemplateData = () => {
  const dispatch = useAppDispatch();
  const user = firebase.auth().currentUser;

  const { started } = useAppSelector((state) => state.workout);
  const { currentWorkoutTemplate } = useAppSelector((state) => state.settings);

  /** Gets realtime updates on user settings stored on firestore */
  const getUserSettings = async () => {
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("settings")
      .doc("workout-settings");

    docRef.onSnapshot((snapShot) => {
      try {
        const data = snapShot.data();
        console.log(data);
        dispatch(changeCurrentWorkoutTemplate(data!.currentWorkout));
      } catch (err: any) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    getUserSettings();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db
        .collection("user-data")
        .doc(user?.uid)
        .collection("workout-templates")
        .doc(currentWorkoutTemplate);

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
    if (user && currentWorkoutTemplate !== "") {
      getData();
    }
  }, [dispatch, user, started, currentWorkoutTemplate]);

  return null;
};

export default FirebaseTemplateData;
