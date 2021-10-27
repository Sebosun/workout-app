import React, { ReactElement, useEffect, useState } from "react"

import firebase from "firebase/app";
import "firebase/firestore";
import {useAppDispatch} from "../../store/app/hooks";

export default function CheckWorkoutTemplates(): ReactElement | null {
  const [templateData, setTemplateData] = useState<firebase.firestore.DocumentData[]|null>(null) 
  const [displayData, setDisplayData] = useState<any>() 
  const user = firebase.auth().currentUser;
  const dispatch = useAppDispatch() 

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore();
      const docRef = db
        .collection("userData")
        .doc(user?.uid)
        .collection("workoutTemplates");

      try {
        const getDocRef = await docRef.get();
        if (getDocRef.docs.length > 0) {
          let workoutTemplates: firebase.firestore.DocumentData[] = [];

          getDocRef.forEach((doc) => {
            workoutTemplates.push(doc.data());
          });

          console.log([...workoutTemplates])
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

    const dupa: any = templateData?.map((item) => (
      <div>
        <p>Name: {item.name}</p>
        <p>
          Date added:{" "}
          {item.date.toDate().toDateString() +
            " " +
            item.date.toDate().toLocaleTimeString()}
        </p>
        <button className="btn">Show preview</button>
        <button className="btn">Set as current template</button>
      </div>
    ));

  if (!templateData){
    return <p>Loading...</p>
  }
  else{
    return <p>{dupa && dupa}</p>
  }
  
}
