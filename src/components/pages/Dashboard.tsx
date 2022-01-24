import { useEffect, useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import VolumeChart from "../ui/VolumeChart";
interface completedTypes {
  date: Date;
  completed: boolean[];
  name: string;
  reps: number;
  sets: number[];
  weight: number;
}

const Dashboard = () => {
  const [data, setData] = useState<firebase.firestore.DocumentData[]>();
  const [volume, setVolume] = useState<number[]>();
  const [labels, setLabels] = useState<any>();

  const getUserData = async () => {
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
    getUserData();
  }, []);

  if (data && !volume && !labels) {
    setVolume(data.map(getTotalVolume));
    console.log(data);
    setLabels(
      data.map((item) => new Date(item.date.seconds * 1000).toLocaleString())
    );
  }

  return (
    <div className="my-12 max-w-md text-2xl mx-auto">
      <h1 className="text-center">Your Last 3 Workouts</h1>
      {volume && labels && <VolumeChart volume={volume} labels={labels} />}
    </div>
  );
};

export default Dashboard;

function getTotalVolume(item: firebase.firestore.DocumentData) {
  return item.workout.reduce((prev: number, cur: completedTypes) => {
    let total: number = 0;
    for (let i = 0; i < cur.reps; i++) {
      if (cur.completed[i]) {
        total += cur.sets[i] * cur.weight;
      }
    }
    return prev + total;
  }, 0);
}
