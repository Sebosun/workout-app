import React, { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import firebase from "firebase/app";
import "firebase/firestore";
import { WorkoutType } from "../../../helpers/types/workout";
import WorkoutTemplatePreview from "../../workout/workoutTemplates/WorkoutTemplatePreview";

export default function Preview(): ReactElement | null {
  const location = useLocation();
  const history = useHistory();
  const user = firebase.auth().currentUser;

  const workoutName = location.pathname.split("/")[3];
  const [templateData, setTemplateData] =
    useState<firebase.firestore.DocumentData | null>(null);

  useEffect(() => {
    const db = firebase.firestore();

    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("workout-templates")
      .doc(workoutName);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setTemplateData(doc.data() || null);
      } else {
        history.push("/");
      }
    });
  }, []);

  return (
    <p>
      {!templateData && <p>Loading...</p>}
      {templateData && (
        <>
          <p>Loaded + {workoutName}</p>
          <WorkoutTemplatePreview workout={templateData.workout} />
        </>
      )}
    </p>
  );
}
