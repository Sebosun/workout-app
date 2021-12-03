import { ReactElement, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { changeCurrentWorkoutTemplate } from "../../../store/slices/settings-slice";
import { displayError, displaySuccess } from "../../../store/slices/ui-slice";
import WorkoutTemplatesList from "../../workout/workoutTemplates/WorkoutTemplatesList";
import { useHistory } from "react-router";

export interface workoutType {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
export interface editType extends workoutType {
  index: number;
}

/** fetches users workout templates from fireabse and displays them as a grid list */
export default function CheckWorkoutTemplates(): ReactElement | null {
  const [templateData, setTemplateData] = useState<
    firebase.firestore.DocumentData[] | null
  >(null);

  const history = useHistory();
  const user = firebase.auth().currentUser;
  const dispatch = useAppDispatch();
  const { currentWorkoutTemplate } = useAppSelector((state) => state.settings);

  // TODO getitng unique id for array later
  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db
        .collection("user-data")
        .doc(user?.uid)
        .collection("workout-templates");

      docRef.onSnapshot((querySnapshot) => {
        try {
          let workoutTemplates: firebase.firestore.DocumentData[] = [];
          querySnapshot.forEach((doc) => {
            workoutTemplates.push(doc.data());
          });
          setTemplateData([...workoutTemplates]);
        } catch (err: any) {
          console.error(err.message);
        }
      });
    };
    if (user) {
      getData();
    }
  }, [dispatch, user]);

  //TODO: Figure out the type for this
  const onShowPreview = (item: any) => {
    history.push(`/user/custom-templates/${item.name}`);
  };

  //TODO confirmation if workout started
  const handleSetAsCurrentTemplate = (name: string) => {
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("settings")
      .doc("workout-settings");

    try {
      docRef.update({
        currentWorkout: name,
      });
      dispatch(changeCurrentWorkoutTemplate(name));
      dispatch(
        displaySuccess(`Workout template succesfully changed to ${name}`)
      );
    } catch (err: any) {
      console.error(err);
      dispatch(displayError(err));
    }
  };

  // TODO This will need additional verifications. Such as:
  // - prevent from deleting current template
  // - confirmation if you *really* want to do this
  const deleteItem = async (name: string) => {
    if (currentWorkoutTemplate === name) {
      dispatch(
        displayError(
          "Template already in use. Choose another template as default to delete this one."
        )
      );
    } else {
      const db = firebase.firestore();
      const docRef = db
        .collection("user-data")
        .doc(user?.uid)
        .collection("workout-templates")
        .doc(name);

      await docRef.delete();
      dispatch(displaySuccess("Template succesfully deleted."));
    }
  };

  if (!templateData) {
    return <div>Loading...</div>;
  } else {
    return (
      <WorkoutTemplatesList
        templateData={templateData}
        onShowPreview={onShowPreview}
        handleChangeTemplate={handleSetAsCurrentTemplate}
        deleteItem={deleteItem}
        currentWorkoutTemplate={currentWorkoutTemplate}
      />
    );
  }
}
