import { ReactElement, useEffect, useState } from "react"

import firebase from "firebase/app";
import "firebase/firestore";
import {useAppDispatch} from "../../../store/app/hooks";
import DisplayWorkoutTemplatePreview from "../../workout/workoutTemplates/DisplayWorkoutTemplatePreview";

interface previewItem {
  name: string;
  date: Date,
  workout: [];
}

export default function CheckWorkoutTemplates(): ReactElement | null {
  const [templateData, setTemplateData] = useState<firebase.firestore.DocumentData[]|null>(null) 
  const [preview, setPreview] = useState<previewItem | null>()
  const user = firebase.auth().currentUser;
  const dispatch = useAppDispatch() 

  // TODO getitng unique id for array later
  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db
        .collection("user-data")
        .doc(user?.uid)
        .collection("workout-templates");

      try {
        const getDocRef = await docRef.get();
        if (getDocRef.docs.length > 0) {
          let workoutTemplates: firebase.firestore.DocumentData[] = [];

          getDocRef.forEach((doc) => {
            workoutTemplates.push(doc.data());
          });

          console.log(workoutTemplates)
          setTemplateData([...workoutTemplates]);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };
    if (user) {
      getData();
    }
  }, [dispatch, user]);


  //TODO: Figure out the type for this
  const onShowPreview = (item: any) => {
    setPreview(item)
  }

    const dupa: any = templateData?.map((item) => (
      <div className="max-w-xl p-2 mx-auto my-4 lg:max-w-2xl">
        <div key={item.name}>
          <p>Name: {item.name}</p>
          <p>
            Date added:{" "}
            {item.date.toDate().toDateString() +
              " " +
              item.date.toDate().toLocaleTimeString()}
          </p>
          <button
            onClick={() => onShowPreview(item)}
            value="dupa"
            className="btn"
          >
            Show preview
          </button>
          <button className="btn" onClick={() => console.log('clicked')}>Set as current template</button>
        </div>
      </div>
    ));

  if (!templateData) {
    return <p>Loading...</p>;
  } else if (preview) {
    return (
      <div className="max-w-md p-2 mx-auto lg:max-w-xl">
        <h1 className="my-4 text-4xl text-center">{preview.name}</h1>
        <DisplayWorkoutTemplatePreview workout={preview.workout} />
        <button onClick={() => setPreview(null)} className="btn"> Return </button>
      </div>
    );
  } else {
    return <p>{dupa && dupa}</p>;
  }
  
}
