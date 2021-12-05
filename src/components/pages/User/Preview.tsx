import { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";

import { displayError, displaySuccess } from "../../../store/slices/ui-slice";
import { changeCurrentWorkoutTemplate } from "../../../store/slices/settings-slice";
import { setAsCurrentTemplate } from "./CheckWorkoutTemplates";

import WorkoutTemplatePreview from "../../workout/workoutTemplates/WorkoutTemplatePreview";

import firebase from "firebase/app";
import "firebase/firestore";
import {
  changeEdit,
  setModified,
  turnOffModified,
} from "../../../store/slices/edit-slice";
import PreviewEdited from "../../user/PreviewEdited";

export default function Preview(): ReactElement | null {
  const user = firebase.auth().currentUser;
  const [templateData, setTemplateData] =
    useState<firebase.firestore.DocumentData | null>(null);

  const location = useLocation();
  const workoutName = location.pathname.split("/")[3];

  const history = useHistory();
  const dispatch = useAppDispatch();
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
    //this runs on unmount and will clear the condition for refetching
  }, [isModified]);

  const handleReturn = () => {
    history.push("/user/custom-templates");
  };

  const handleEdit = (index: number) => {
    history.push(`./${workoutName}/edit?index=${index}`);
  };

  const handleDelete = (index: number) => {
    const newArr = [...template];
    newArr.splice(index, 1);
    dispatch(setModified());
    dispatch(changeEdit(newArr));
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
      <PreviewEdited handleEdit={handleEdit} updateWorkout={updateWorkout} />
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
                onDelete={handleDelete}
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
