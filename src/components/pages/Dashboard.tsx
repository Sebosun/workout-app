import { useEffect, useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { workoutType } from "./User/CheckWorkoutTemplates";

interface completedTypes {
  completed: boolean[];
  name: string;
  reps: number;
  sets: number[];
  weight: number;
}

const Dashboard = () => {
  const [data, setData] = useState<firebase.firestore.DocumentData[]>();
  const [volume, setVolume] = useState<number[]>();
  const getUserSettings = async () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("completed-workouts")
      .orderBy("date", "desc")
      .limit(3);

    docRef.onSnapshot((querySnapshot) => {
      try {
        let data: firebase.firestore.DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      } catch (err: any) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    getUserSettings();
  }, []);

  if (data && !volume) {
    const totalWeight = data.map((item, index) => {
      return item.workout.reduce((prev: number, cur: completedTypes) => {
        let total: number = 0;
        for (let i = 0; i < cur.reps; i++) {
          if (cur.completed[i]) {
            total += cur.sets[i] * cur.weight;
          }
        }
        return prev + total;
      }, 0);
    });
    setVolume(totalWeight);
  }

  return (
    <div className="my-12 max-w-md text-2xl mx-auto">
      <h1>Your Last 3 workouts:</h1>
      {volume &&
        volume.map((item) => {
          return <h1 className="text-2xl">Volume: {item} kg</h1>;
        })}
    </div>
  );
};

export default Dashboard;
