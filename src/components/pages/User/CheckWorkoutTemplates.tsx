import { ReactElement, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import WorkoutTemplatePreview from "../../workout/workoutTemplates/WorkoutTemplatePreview";
import { changeCurrentWorkoutTemplate } from "../../../store/slices/settings-slice";
import { displayError, displaySuccess } from "../../../store/slices/ui-slice";
import WorkoutTemplatesList from "../../workout/workoutTemplates/WorkoutTemplatesList";
import Edit from "../../forms/workout/Edit";

interface previewItem {
  name: string;
  date: Date;
  workout: [];
}
interface workoutType {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

/** fetches users workout templates from fireabse and displays them as a grid list */
export default function CheckWorkoutTemplates(): ReactElement | null {
  const [templateData, setTemplateData] = useState<
    firebase.firestore.DocumentData[] | null
  >(null);

  // holds an array of exercises + name +  date to be displayed
  const [preview, setPreview] = useState<previewItem | null>();
  // holds an exercise to-be-edited
  const [edit, setEdit] = useState<workoutType | null>();
  // will turn to true once at least one item was edited
  const [edited, setEdited] = useState(false);

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
    setPreview(item);
  };

  //TODO confirmation if workout started
  const handleChangeTemplate = (name: string) => {
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

  const onEdit = (index: number) => {
    console.log(index);
    console.log(preview?.workout[index]);
    setEdit(preview?.workout[index]);
    console.log(edit);
  };

  // preview is displayed based on data in preview state, which is forwarded to it by button OnShowPreview
  if (!templateData) {
    return <div>Loading...</div>;
  } else if (preview && !edit) {
    return (
      <div className="p-2 mx-auto max-w-md lg:max-w-xl">
        <h1 className="my-4 text-4xl text-center">{preview.name}</h1>
        <WorkoutTemplatePreview workout={preview.workout} onEdit={onEdit} />
        <button
          className="btn"
          onClick={() => handleChangeTemplate(preview.name)}
        >
          Set as current template
        </button>
        <button onClick={() => setPreview(null)} className="btn">
          Return
        </button>
      </div>
    );
  } else if (preview && edit) {
    return (
      <Edit
        name={edit.name}
        sets={edit.sets}
        reps={edit.reps}
        weight={edit.weight}
      />
    );
  } else {
    return (
      <WorkoutTemplatesList
        templateData={templateData}
        onShowPreview={onShowPreview}
        handleChangeTemplate={handleChangeTemplate}
        deleteItem={deleteItem}
        currentWorkoutTemplate={currentWorkoutTemplate}
      />
    );
  }
}
