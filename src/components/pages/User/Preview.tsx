import { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";

import { displayError, displaySuccess } from "../../../store/slices/ui-slice";
import { changeCurrentWorkoutTemplate } from "../../../store/slices/settings-slice";
import { setAsCurrentTemplate } from "./CheckWorkoutTemplates";

import WorkoutTemplatePreview from "../../workout/workoutTemplates/WorkoutTemplatePreview";

import firebase from "firebase/app";
import "firebase/firestore";
import { changeEdit, turnOffModified } from "../../../store/slices/edit-slice";

export default function Preview(): ReactElement | null {
  const location = useLocation();
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const dispatch = useAppDispatch();

  const workoutName = location.pathname.split("/")[3];
  const [templateData, setTemplateData] =
    useState<firebase.firestore.DocumentData | null>(null);
  const { template, isModified } = useAppSelector((state) => state.edit);

  useEffect(() => {
    if (!isModified) {
      const db = firebase.firestore();
      const docRef = db
        .collection("user-data")
        .doc(user?.uid)
        .collection("workout-templates")
        .doc(workoutName);

      docRef.get().then((doc) => {
        if (doc.exists) {
          setTemplateData(doc.data() || null);
          dispatch(changeEdit(doc.data()?.workout));
        }
      });
    }
  }, [isModified, workoutName]);

  const handleReturn = () => {
    history.push("/user/custom-templates");
  };

  const handleSetAsCurrentTemplate = () => {
    if (user) {
      const set = setAsCurrentTemplate(firebase.firestore(), user, workoutName);
      if (set === true) {
        dispatch(changeCurrentWorkoutTemplate(workoutName));
        dispatch(
          displaySuccess(
            `Workout template succesfully changed to ${workoutName}`
          )
        );
      } else {
        dispatch(displayError(set));
      }
    }
  };

  const handleEdit = (index: number) => {
    history.push(`./${workoutName}/edit?index=${index}`);
  };

  const updateWorkout = () => {
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("workout-templates")
      .doc(workoutName);

    try {
      docRef.update({
        workout: template,
      });
      dispatch(turnOffModified());
    } catch (err) {
      console.error(err);
    }
  };

  if (isModified) {
    return (
      <div className="p-2 mx-auto max-w-md lg:max-w-xl">
        <p className="text-center text-2xl">New Workout</p>
        <WorkoutTemplatePreview onEdit={handleEdit} workout={template} />
        <button onClick={updateWorkout} className="btn-pos">
          Confirm
        </button>
        <button className="btn-del">Cancel</button>
      </div>
    );
  } else {
    return (
      <p>
        {!templateData && <p className="text-center">Loading...</p>}
        {templateData && (
          <>
            <div className="p-2 mx-auto max-w-md lg:max-w-xl">
              <h1 className="my-4 text-4xl text-center">{templateData.name}</h1>
              <WorkoutTemplatePreview
                onEdit={handleEdit}
                workout={templateData.workout}
              />
              <button className="btn" onClick={handleSetAsCurrentTemplate}>
                Set as current template
              </button>
              <button className="btn" onClick={handleReturn}>
                Return
              </button>
            </div>
          </>
        )}
      </p>
    );
  }
}
