import { ReactElement, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { changeCurrentWorkoutTemplate } from "../../../store/slices/settings-slice";
import { displayError, displaySuccess } from "../../../store/slices/ui-slice";
import WorkoutTemplatesList from "../../workout/workoutTemplates/WorkoutTemplatesList";
import { useHistory } from "react-router";
import PortalWrapper from "../../ui/PortalWrapper";

export interface workoutType {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
export interface editType extends workoutType {
  index: number;
}

export const setAsCurrentTemplate = (
  db: firebase.firestore.Firestore,
  user: firebase.User,
  name: string
) => {
  const docRef = db
    .collection("user-data")
    .doc(user?.uid)
    .collection("settings")
    .doc("workout-settings");

  try {
    docRef.update({
      currentWorkout: name,
    });
    return true;
  } catch (err: any) {
    return err;
  }
};

/** fetches users workout templates from fireabse and displays them as a grid list */
export default function CheckWorkoutTemplates(): ReactElement | null {
  const [templateData, setTemplateData] = useState<
    firebase.firestore.DocumentData[] | null
  >(null);

  const history = useHistory();
  const user = firebase.auth().currentUser;
  const dispatch = useAppDispatch();

  const { currentWorkoutTemplate } = useAppSelector((state) => state.settings);

  const [confirmation, setConfirmation] = useState({ status: false, name: "" });

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
    if (user) {
      const currentTemplate = setAsCurrentTemplate(db, user, name);
      if (currentTemplate === true) {
        dispatch(changeCurrentWorkoutTemplate(name));
        dispatch(
          displaySuccess(`Workout template succesfully changed to ${name}`)
        );
      } else {
        dispatch(displayError(currentTemplate));
      }
    }
  };

  const deleteItem = async () => {
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("workout-templates")
      .doc(confirmation.name);

    await docRef.delete();
    setConfirmation({ status: false, name: "" });
    dispatch(displaySuccess("Template succesfully deleted."));
  };

  const handleConfirmation = (name: string) => {
    if (currentWorkoutTemplate === name) {
      dispatch(
        displayError(
          "Template already in use. Choose another template as default to delete this one."
        )
      );
    } else {
      setConfirmation({ status: true, name: name });
    }
  };
  const handleCancelConfirmation = () => {
    setConfirmation({ status: false, name: "" });
  };

  if (!templateData) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <WorkoutTemplatesList
          templateData={templateData}
          onShowPreview={onShowPreview}
          handleChangeTemplate={handleSetAsCurrentTemplate}
          deleteItem={handleConfirmation}
          currentWorkoutTemplate={currentWorkoutTemplate}
        />
        {confirmation.status && (
          <PortalWrapper>
            <p> Are you sure you want to delete the workout?</p>
            <button onClick={deleteItem} className="btn-del">
              Yes
            </button>
            <button onClick={handleCancelConfirmation} className="btn">
              No
            </button>
          </PortalWrapper>
        )}
      </>
    );
  }
}
